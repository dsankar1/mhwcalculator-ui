import { makeStyles } from '@material-ui/core';
import { fade, darken } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    box: {
        marginTop: theme.spacing(3),
        '-webkit-overflow-scrolling': 'touch'
    },
    button: {
        minWidth: 70
    },
    none: {
        color: darken('#bcaaa4', 0.2),
        '&:hover': {
            backgroundColor: fade('#bcaaa4', 0.2)
        }
    },
    noneSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#bcaaa4',
        '&:hover': {
            backgroundColor: darken('#bcaaa4', 0.2)
        }
    },
    spread: {
        color: theme.palette.grey[500],
        '&:hover': {
            backgroundColor: fade('#eeeeee', 0.2)
        }
    },
    spreadSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#eeeeee',
        '&:hover': {
            backgroundColor: darken('#eeeeee', 0.2)
        }
    },
    power: {
        color: '#f85858',
        '&:hover': {
            backgroundColor: fade('#f85858', 0.2)
        }
    },
    powerSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#f85858',
        '&:hover': {
            backgroundColor: darken('#f85858', 0.2)
        }
    }
}));

export const spread = {
    name: 'Spread'
};

export const power = {
    name: 'Power'
};

export default [spread, power];
