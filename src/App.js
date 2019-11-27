import _ from 'lodash';
import React, { createContext, Fragment, useState, useCallback } from 'react';
import { createMuiTheme, ThemeProvider, darken } from '@material-ui/core/styles';
import { CssBaseline, useMediaQuery, makeStyles, Box, AppBar, Toolbar, IconButton, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Switch as RouteSwitch, Route, Redirect } from 'react-router-dom';
import DamageCalculator from './DamageCalculator';
import NotFound from './NotFound';

export const SubtitleContext = createContext();

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
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

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
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

export const App = () => {
    const [mode, setMode] = useState('light');

    const toggleMode = useCallback(() => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }, [mode, setMode]);

    return (
        <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
            <Route render={routeProps => (
                <Content {...routeProps} mode={mode} toggleMode={toggleMode} />
            )} />
        </ThemeProvider>
    )
}

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: theme.palette.background.paper
    },
    titleBox: {
        flexGrow: 1,
        marginLeft: theme.spacing(1)
    },
    icon: {
        width: 36,
        height: 36,
        cursor: 'pointer'
    },
    title: {
        fontSize: 17,
        color: darken(theme.palette.text.primary, 0.1)
    },
    subtitle: {
        fontSize: 14,
        color: darken(theme.palette.text.primary, 0.1)
    },
    menu: {
        marginRight: theme.spacing(1),
        color: darken(theme.palette.text.primary, 0.1)
    },
    darkModeLabel: {
        fontSize: 14,
        marginRight: theme.spacing(0.2),
        color: darken(theme.palette.text.primary, 0.1)
    }
}));

const Content = ({ history, mode, toggleMode }) => {
    const [subtitle, setSubtitle] = useState();
    const mobile = useMediaQuery('(min-width:500px)');
    const classes = useStyles();
    
    const goHome = useCallback(() => {
        if (_.isFunction(history.push)) {
            history.push('/');
        }
    }, [history.push]);

    return (
        <Fragment>
            <CssBaseline />
            <SubtitleContext.Provider value={setSubtitle}>
                <AppBar position='static' className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label='menu' className={classes.menu}>
                            <Menu />
                        </IconButton>
                        <img
                            alt='Monster Hunter Gem'
                            src={process.env.PUBLIC_URL + '/favicon.png'}
                            className={classes.icon}
                            onClick={goHome}
                        />
                        <Box display='flex' flexDirection='column' justifyContent='center' className={classes.titleBox}>
                            <Typography className={classes.title}>
                                Monster Hunter: World
                            </Typography>
                            {subtitle && (
                                <Typography className={classes.subtitle}>
                                    {subtitle}
                                </Typography>
                            )}
                        </Box>
                        <FormControlLabel
                            labelPlacement='start'
                            label={mobile ? (
                                <Typography className={classes.darkModeLabel}>
                                    Dark Mode
                                </Typography>
                            ) : null}
                            control={
                                <Switch
                                    checked={mode === 'dark'}
                                    onClick={toggleMode}
                                />
                            }
                        />
                    </Toolbar>
                </AppBar>
                <Box>
                    <RouteSwitch>
                        <Route exact path='/' render={() => <Redirect to='/calculator/damage' />} />
                        <Route path='/calculator/damage' component={DamageCalculator} />
                        <Route component={NotFound} />
                    </RouteSwitch>
                </Box>
            </SubtitleContext.Provider>
        </Fragment>
    );
}

export default App;
