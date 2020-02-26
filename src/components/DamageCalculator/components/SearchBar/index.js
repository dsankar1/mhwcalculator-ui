import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import { Error } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles, LinearProgress, Snackbar, Box, TextField, Typography } from '@material-ui/core';
import { Sharpness } from '../../calculator/sharpness';

const instance = axios.create({
    baseURL: 'https://mhw-db.com',
    timeout: 5000
});

let SearchCancelToken = axios.CancelToken;
let searchSource = SearchCancelToken.source();

const searchWeapons = async name => {
    _.attempt(searchSource.cancel, 'Cancelled');
    if (name) {
        SearchCancelToken = axios.CancelToken;
        searchSource = SearchCancelToken.source();
        const config = {
            url: '/weapons',
            params: {
                p: {
                    id: true,
                    name: true
                },
                q: {
                    name: {
                        '$like': `%${name}%`
                    }
                }
            },
            cancelToken: searchSource.token
        };
        return instance(config);
    }
}

const getWeaponInfo = id => {
    if (id) {
        return instance({
            url: `/weapons/${id}`,
            params: {
                p: {
                    id: true,
                    name: true,
                    type: true,
                    attack: true,
                    elements: true,
                    durability: true,
                    attributes: true
                }
            }
        });
    }
}

const getOptionLabel = option => _.get(option, 'name', option);

const getSharpness = durability => {
    const maxDurability = _.last(durability);
    let sharpness;
    if (_.isPlainObject(maxDurability)) {
        if (Boolean(maxDurability.purple)) {
            sharpness = Sharpness.PURPLE;
        } else if (Boolean(maxDurability.white)) {
            sharpness = Sharpness.WHITE;
        } else if (Boolean(maxDurability.blue)) {
            sharpness = Sharpness.BLUE;
        } else if (Boolean(maxDurability.green)) {
            sharpness = Sharpness.GREEN;
        } else if (Boolean(maxDurability.yellow)) {
            sharpness = Sharpness.YELLOW;
        } else if (Boolean(maxDurability.orange)) {
            sharpness = Sharpness.ORANGE;
        } else if (Boolean(maxDurability.red)) {
            sharpness = Sharpness.RED;
        }
    }
    return sharpness;
}

const useStyles = makeStyles(theme => ({
    progress: {
        height: '2px',
        marginTop: '-2px',
        borderRadius: '4px'
    },
    autocomplete: {
        width: '100%',
        maxWidth: '300px'
    },
    snackbar: {
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center'
    },
    snackbarIcon: {
        color: theme.palette.error.main,
        marginRight: theme.spacing(1)
    }
}));

export const SearchBar = React.memo(props => {
    const classes = useStyles();
    const [searching, setSearching] = React.useState(false);
    const [importing, setImporting] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const previousImportId = React.useRef(0);
    const handleImport = React.useCallback(async (__, searchResult) => {
        const importId = +_.get(searchResult, 'id', 0);
        const name = _.get(searchResult, 'name', '?');
        if (!_.isEqual(importId, previousImportId.current)) {
            previousImportId.current = importId;
            try {
                setImporting(true);
                const response = await getWeaponInfo(importId);
                if (_.has(response, 'data')) {
                    const weaponType = _.camelCase(_.get(response, ['data', 'type']));
                    const attack = +_.get(response, ['data', 'attack', 'display'], 0);
                    const element = +_.get(response, ['data', 'elements', 0, 'damage'], 0);
                    const hiddenElement = _.get(response, ['data', 'elements', 0, 'hidden'], false);
                    const affinityPct = +_.get(response, ['data', 'attributes', 'affinity'], 0);
                    const sharpness = getSharpness(_.get(response, ['data', 'durability']));

                    const build = {
                        weaponType,
                        attack,
                        element,
                        hiddenElement,
                        affinityPct
                    };

                    if (!_.isNil(sharpness)) {
                        _.set(build, 'sharpness', sharpness);
                    }

                    if (_.isFunction(props.onChange)) {
                        _.attempt(props.onChange, build);
                    }
                }
            } catch (err) {
                setSnackbarOpen(true);
                setSnackbarMessage(`Failed to get weapon info for ${name}`);
            } finally {
                setImporting(false);
            }
        }
    }, [props.onChange, setImporting, setSnackbarOpen, setSnackbarMessage]);

    const previousSearch = React.useRef('');
    const handleSearch = React.useCallback(async (__, search) => {
        if (!_.isEqual(_.lowerCase(search), previousSearch.current)) {
            previousSearch.current = _.lowerCase(search);
            try {
                setSearching(true);
                const response = await searchWeapons(search);
                setSearching(false);
                setSearchResults(_.get(response, 'data', []));
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setSnackbarOpen(true);
                    setSnackbarMessage('Failed to get weapon suggestions');
                }
            }
        }
    }, [setSearching, setSearchResults, setSnackbarOpen, setSnackbarMessage]);

    return (
        <Box flex={1} display='flex' justifyContent='flex-end'>
            <Autocomplete
                disableOpenOnFocus
                loading={searching}
                options={searchResults}
                getOptionLabel={getOptionLabel}
                onChange={handleImport}
                onInputChange={handleSearch}
                className={classes.autocomplete}
                renderInput={params => (
                    <React.Fragment>
                        <TextField
                            {...params}
                            fullWidth
                            variant='outlined'
                            title='Search Weapons'
                            placeholder='Search Weapons...'
                        />
                        {(searching || importing) && (
                            <LinearProgress className={classes.progress} />
                        )}
                    </React.Fragment>
                )}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={snackbarOpen}
                autoHideDuration={5000}
                message={
                    <span className={classes.snackbar}>
                        <Error className={classes.snackbarIcon} />
                        <Typography>{snackbarMessage}</Typography>
                    </span>
                }
                onClose={() => setSnackbarOpen(false)}
            />
        </Box>
    );
});

export default SearchBar;
