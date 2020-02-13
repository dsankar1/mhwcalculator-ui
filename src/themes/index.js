import { createMuiTheme } from "@material-ui/core/styles";

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
        },
        MuiButton: {
            root: {
                fontWeight: 400,
                textTransform: 'capitalize'
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
            main: '#81c784'
        },
        secondary: {
            main: '#81c784'
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
            main: '#81c784'
        },
        secondary: {
            main: '#81c784'
        }
    }
});
