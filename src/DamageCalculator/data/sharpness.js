import { makeStyles } from "@material-ui/core";
import { fade, darken } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    button: {
        minWidth: 80
    },
    red: {
        color: '#f44336',
        '&:hover': {
            backgroundColor: fade('#f44336', 0.3)
        }
    },
    redSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: darken('#f44336', 0.2)
        }
    },
    orange: {
        color: '#d9662c',
        '&:hover': {
            backgroundColor: fade('#d9662c', 0.3)
        }
    },
    orangeSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9662c',
        '&:hover': {
            backgroundColor: darken('#d9662c', 0.2)
        }
    },
    yellow: {
        color: '#d9d12c',
        '&:hover': {
            backgroundColor: fade('#d9d12c', 0.2)
        }
    },
    yellowSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9d12c',
        '&:hover': {
            backgroundColor: darken('#d9d12c', 0.2)
        }
    },
    green: {
        color: '#70d92c',
        '&:hover': {
            backgroundColor: fade('#70d92c', 0.3)
        }
    },
    greenSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#70d92c',
        '&:hover': {
            backgroundColor: darken('#70d92c', 0.2)
        }
    },
    blue: {
        color: '#42a5f5',
        '&:hover': {
            backgroundColor: fade('#42a5f5', 0.3)
        }
    },
    blueSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#42a5f5',
        '&:hover': {
            backgroundColor: darken('#42a5f5', 0.2)
        }
    },
    white: {
        color: theme.palette.grey[500],
        '&:hover': {
            backgroundColor: fade('#eeeeee', 0.2)
        }
    },
    whiteSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#eeeeee',
        '&:hover': {
            backgroundColor: darken('#eeeeee', 0.2)
        }
    },
    purple: {
        color: '#cc99ff',
        '&:hover': {
            backgroundColor: fade('#cc99ff', 0.3)
        }
    },
    purpleSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#cc99ff',
        '&:hover': {
            backgroundColor: darken('#cc99ff', 0.2)
        }
    }
}));

export const red = {
    name: 'Red'
};

export const orange = {
    name: 'Orange'
};

export const yellow = {
    name: 'Yellow'
};

export const green = {
    name: 'Green'
};

export const blue = {
    name: 'Blue'
};

export const white = {
    name: 'White'
};

export const purple = {
    name: 'Purple'
};

export default [red, orange, yellow, green, blue, white, purple];
