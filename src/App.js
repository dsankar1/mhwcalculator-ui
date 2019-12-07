import _ from 'lodash';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { createMuiTheme, ThemeProvider, fade } from '@material-ui/core/styles';
import { CssBaseline, makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { Switch as RouteSwitch, Route, Redirect } from 'react-router-dom';
import DamageCalculator from './DamageCalculator';
import Navigation from './Navigation';

export const SubtitleContext = createContext();

const lightTheme = createMuiTheme({
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

const darkTheme = createMuiTheme({
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

const useStyles = makeStyles(theme => ({
    menuItem: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: { 
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        }
    }
}));

export const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const [menuOpen, setMenuOpen] = useState(false);
    const [subtitle, setSubtitle] = useState('');
    const classes = useStyles();

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(theme => theme === 'dark' ? 'light' : 'dark');
    }, [setTheme]);

    const toggleMenu = useCallback(() => {
        setMenuOpen(menuOpen => !menuOpen);
    }, [setMenuOpen]);

    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <SubtitleContext.Provider value={setSubtitle}>
                <Route render={({ location, history }) => (
                    <Navigation
                        subtitle={subtitle}
                        menuOpen={menuOpen}
                        onMenuClick={toggleMenu}
                        onDarkThemeClick={toggleTheme}
                        onHomeClick={() => history.push('/calculator/damage')}
                        menuContent={
                            <List>
                                <ListItem
                                    button
                                    selected={_.startsWith(location.pathname, '/calculator/damage')}
                                    onClick={() => history.push('/calculator/damage')}
                                    className={classes.menuItem}
                                >
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary='Damage Calculator' />
                                </ListItem>
                            </List>
                        }
                    >
                        <RouteSwitch>
                            <Route path='/calculator/damage' component={DamageCalculator} />
                            <Route render={() => <Redirect to='/calculator/damage' />} />
                        </RouteSwitch>
                    </Navigation>
                )} />
            </SubtitleContext.Provider>
        </ThemeProvider>
    );
}

export default App;
