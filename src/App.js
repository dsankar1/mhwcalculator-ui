import _ from 'lodash';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Home } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Switch as RouteSwitch, Route, Redirect } from 'react-router-dom';
import { lightTheme, darkTheme } from './themes';
import DamageCalculator from './components/DamageCalculator';
import Navigation from './components/Navigation';

export const SubtitleContext = createContext();

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
                        onHomeClick={() => history.push('/')}
                        menuContent={
                            <List>
                                <ListItem
                                    button
                                    selected={_.isEqual(location.pathname, '/')}
                                    onClick={() => history.push('/')}
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
                            <Route exact path='/' component={DamageCalculator} />
                            <Route render={() => <Redirect to='/' />} />
                        </RouteSwitch>
                    </Navigation>
                )} />
            </SubtitleContext.Provider>
        </ThemeProvider>
    );
}

export default App;
