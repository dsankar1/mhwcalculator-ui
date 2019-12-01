import _ from 'lodash';
import clsx from 'clsx';
import React, { memo } from 'react';
import { darken } from '@material-ui/core/styles';
import { makeStyles, useTheme, TextField, InputAdornment, Select, Tooltip, Checkbox, MenuItem, Divider } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export const getColorMap = type => {
    const isLight = _.isEqual(type, 'light');
    const colors = {
        fire: '#ff4802',
        water: '#93ebff',
        thunder: '#fffe06',
        ice: '#9cbeec',
        dragon: '#6b72b6',
        poison: '#d769e4',
        blast: '#c3f174',
        paralysis: '#ffee58',
        stun: '#cfc176',
        sleep: '#74d9ed'
    };
    if (isLight) {
        return _.transform(colors, (acc, color, key) => {
            _.set(acc, key, darken(color, 0.3));
        }, {});
    } else {
        return colors;
    }
}

export const elementTypeOptions = [
    {
        label: 'Thunder',
        value: 'thunder'
    },
    {
        label: 'Fire',
        value: 'fire'
    },
    {
        label: 'Water',
        value: 'water'
    },
    {
        label: 'Ice',
        value: 'ice'
    },
    {
        label: 'Dragon',
        value: 'dragon'
    }
];

export const abnormalStatusOptions = [
    {
        label: 'Paralysis',
        value: 'paralysis'
    },
    {
        label: 'Stun',
        value: 'stun'
    },
    {
        label: 'Blast',
        value: 'blast'
    },
    {
        label: 'Sleep',
        value: 'sleep'
    },
    {
        label: 'Poison',
        value: 'poison'
    }
];

const useStyles = makeStyles(theme => ({
    divider: {
        height: theme.spacing(4),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    select: {
        width: 90
    },
    hidden: {
        opacity: 0.6
    }
}));

export const ElementInput = memo(props => {
    const theme = useTheme();
    const classes = useStyles();

    const elementTypeMenuItems = _.map(elementTypeOptions, elementTypeOption => {
        const value = _.get(elementTypeOption, 'value');
        const label = _.get(elementTypeOption, 'label', value);
        return (
            <MenuItem
                key={value}
                value={value}
                style={{
                    color: _.get(getColorMap(theme.palette.type), value)
                }}
            >
                {label}
            </MenuItem>
        );
    });

    const abnormalStatusMenuItems = _.map(abnormalStatusOptions, abnormalStatusOption => {
        const value = _.get(abnormalStatusOption, 'value');
        const label = _.get(abnormalStatusOption, 'label', value);
        return (
            <MenuItem
                key={value}
                value={value}
                style={{
                    color: _.get(getColorMap(theme.palette.type), value)
                }}
            >
                {label}
            </MenuItem>
        );
    });

    const type = +props.value ? props.type : 'none';

    return (
        <TextField
            fullWidth
            type='number'
            variant='outlined'
            label={props.label}
            value={props.value}
            onChange={e => _.attempt(props.onChange, e.target.value)}
            InputProps={{
                style: {
                    paddingRight: 8
                },
                endAdornment: (
                    <InputAdornment position='end'>
                        <Divider orientation='vertical' className={classes.divider} />
                        <Select
                            disableUnderline
                            placeholder='None'
                            value={type}
                            onChange={e => _.attempt(props.onChangeType, e.target.value)}
                            style={{
                                color: _.get(getColorMap(theme.palette.type), type)
                            }}
                        >
                            <MenuItem value='none' disabled>None</MenuItem>
                            <Divider />
                            {elementTypeMenuItems}
                            <Divider />
                            {abnormalStatusMenuItems}
                        </Select>
                        <Divider orientation='vertical' className={classes.divider} />
                        <Tooltip title={`Hidden: ${_.get(props, 'hidden', false)}`} enterDelay={500}>
                            <Checkbox
                                size='small'
                                color='default'
                                checked={_.get(props, 'hidden', false)}
                                onChange={() => _.attempt(props.onToggleHidden, !_.get(props, 'hidden', false))}
                                icon={<Visibility fontSize='small' />}
                                checkedIcon={<VisibilityOff fontSize='small' />}
                            />
                        </Tooltip>
                    </InputAdornment>
                )
            }}
            className={clsx({
                [classes.hidden]: _.get(props, 'hidden', false)
            })}
        />
    );
});

export default ElementInput;
