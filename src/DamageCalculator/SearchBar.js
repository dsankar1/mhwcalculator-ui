import _ from 'lodash';
import axios from 'axios';
import React, { memo, useState, useCallback, useRef } from 'react';
import { makeStyles, Box, LinearProgress, Snackbar, Typography } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import TextField from '../TextField';

const instance = axios.create({
    baseURL: 'https://mhw-db.com',
    timeout: 5000
});

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

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
        await sleep(500);
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

const getOptionLabel = option => _.get(option, 'name');

const getSharpness = durability => {
    const maxDurability = _.last(durability);
    let sharpness;
    if (_.get(maxDurability, 'purple')) {
        sharpness = 'purple'
    } else if (_.get(maxDurability, 'white')) {
        sharpness = 'white'
    } else if (_.get(maxDurability, 'blue')) {
        sharpness = 'blue'
    } else if (_.get(maxDurability, 'green')) {
        sharpness = 'green'
    } else if (_.get(maxDurability, 'yellow')) {
        sharpness = 'yellow'
    } else if (_.get(maxDurability, 'orange')) {
        sharpness = 'orange'
    } else if (_.get(maxDurability, 'red')) {
        sharpness = 'red'
    }
    return sharpness;
}

const useStyles = makeStyles(theme => ({
    root: {
       marginBottom: theme.spacing(2)
    },
    progress: {
        height: 2,
        marginTop: -2,
        borderRadius: 4
    },
    snackbar: {
        fontSize: 14,
        display: 'flex',
        alignItems: 'center'
    },
    snackbarIcon: {
        color: theme.palette.error.main,
        marginRight: theme.spacing(1)
    }
}));

export const SearchBar = memo(({ onChange }) => {
    const classes = useStyles();
    const [searching, setSearching] = useState(false);
    const [importing, setImporting] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const previousImportId = useRef(0);
    const handleImport = useCallback(async (e, searchResult) => {
        const importId = +_.get(searchResult, 'id', 0);
        const name = _.get(searchResult, 'name', '?');
        if (!_.isEqual(importId, previousImportId.current)) {
            previousImportId.current = importId;
            try {
                setImporting(true);
                const response = await getWeaponInfo(importId);
                if (_.has(response, 'data')) {
                    const weapon = _.camelCase(_.get(response, ['data', 'type'], ''));
                    const physical = +_.get(response, ['data', 'attack', 'display'], 0);
                    const affinity = +_.get(response, ['data', 'attributes', 'affinity'], 0);
                    const sharpness = getSharpness(_.get(response, ['data', 'durability'], []));
    
                    const element = +_.get(response, ['data', 'elements', 0, 'damage'], 0);
                    const elementType = _.get(response, ['data', 'elements', 0, 'type'], '');
                    const hiddenElement = _.get(response, ['data', 'elements', 0, 'hidden'], false);
    
                    const secondElement = +_.get(response, ['data', 'elements', 1, 'damage'], 0);
                    const secondElementType = _.get(response, ['data', 'elements', 1, 'type'], '');
                    const hiddenSecondElement = _.get(response, ['data', 'elements', 1, 'hidden'], false);
    
                    _.attempt(onChange, 'physical', physical);
                    _.attempt(onChange, 'affinity', affinity);
                    _.attempt(onChange, 'element', element);
                    _.attempt(onChange, 'hiddenElement', hiddenElement);
                    _.attempt(onChange, 'secondElement', secondElement);
                    _.attempt(onChange, 'hiddenSecondElement', hiddenSecondElement);
    
                    if (weapon) {
                        _.attempt(onChange, 'weapon', weapon);
                    }
                    if (sharpness) {
                        _.attempt(onChange, 'sharpness', sharpness);
                    }
                    if (elementType) {
                        _.attempt(onChange, 'elementType', elementType);
                    }
                    if (secondElementType) {
                        _.attempt(onChange, 'secondElementType', secondElementType);
                    }
                }
            } catch (err) {
                setSnackbarOpen(true);
                setSnackbarMessage(`Failed to get weapon info for ${name}`);
            } finally {
                setImporting(false);
            }
        }
    }, [onChange, setImporting, setSnackbarOpen, setSnackbarMessage]);

    const previousSearch = useRef('');
    const handleSearch = useCallback(async (e, search) => {
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
        <Box className={classes.root}>
            <Autocomplete
                disableOpenOnFocus
                loading={searching}
                options={searchResults}
                getOptionLabel={getOptionLabel}
                onChange={handleImport}
                onInputChange={handleSearch}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Search Weapons'
                    />
                )}
            />
            {(searching || importing) && (
                <LinearProgress className={classes.progress} />
            )}
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
