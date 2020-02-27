import { createMuiTheme } from "@material-ui/core/styles";

const query = '@media (min-width: 600px)';

export const baseTheme = createMuiTheme({
    overrides: {
        MuiCardHeader: {
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
                },
                '&$selected': {
                    color: '#000 !important',
                    backgroundColor: '#81c784 !important'
                }
            },
            selected: {}
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
            },
            sizeSmall: {
                fontSize: '0.875rem'
            }
        },
        MuiTableCell: {
            root: {
                //whiteSpace: 'nowrap'
            },
            head: {
                borderColor: '#81c784'
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
            default: '#ddd',
            paper: '#f7f7f7'
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
