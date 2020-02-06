import { fade, createMuiTheme } from "@material-ui/core/styles";

const query = '@media (min-width: 600px)';

export const baseTheme = createMuiTheme({
    overrides: {
        MuiCardHeader: {
            root: {
                padding: '8px 8px 8px 16px'
            },
            title: {
                fontSize: '1.25rem'
            },
            content: {
                flex: '0 0 auto',
                marginRight: '16px'
            },
            action: {
                flex: '1 1 auto',
                alignSelf: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: 'unset',
                marginRight: 'unset',
                marginBottom: 'unset'
            }
        },
        MuiFormControlLabel: {
            label: {
                [query]: {
                    fontSize: '0.875rem'
                }
            }
        },
        MuiInputLabel: {
            root: {
                [query]: {
                    fontSize: '0.875rem'
                }
            }
        },
        MuiInputBase: {
            root: {
                [query]: {
                    fontSize: '0.875rem'
                }
            }
        },
        MuiMenuItem: {
            root: {
                [query]: {
                    fontSize: '0.875rem'
                }
            }
        },
        MuiOutlinedInput: {
            root: {
                padding: `2px 8px !important`
            }
        }
    }
});

export const lightTheme = createMuiTheme({
    ...baseTheme,
    palette: {
        type: 'light',
        text: {
            primary: '#212121'
        },
        background: {
            default: '#efefef'
        },
        primary: {
            main: fade('#66bb6a', 0.7)
        },
        secondary: {
            main: fade('#66bb6a', 0.7)
        }
    }
});

export const darkTheme = createMuiTheme({
    ...baseTheme,
    palette: {
        type: 'dark',
        text: {
            primary: '#efefef'
        },
        background: {
            default: '#212121',
            paper: '#303030'
        },
        primary: {
            main: fade('#81c784', 0.7)
        },
        secondary: {
            main: fade('#81c784', 0.7)
        }
    }
});
