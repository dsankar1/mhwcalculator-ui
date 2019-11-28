import React, { createContext, useState, useCallback } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home, Info } from '@material-ui/icons';
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
    const [mode, setMode] = useState('light');
    const [menuOpen, setMenuOpen] = useState(false);
    const [subtitle, setSubtitle] = useState('');
    const classes = useStyles();

    const toggleMode = useCallback(() => {
        setMode(mode => mode === 'dark' ? 'light' : 'dark');
    }, [setMode]);

    const toggleMenu = useCallback(() => {
        setMenuOpen(menuOpen => !menuOpen);
    }, [setMenuOpen]);

    return (
        <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <SubtitleContext.Provider value={setSubtitle}>
                <Route render={({ history }) => (
                    <Navigation
                        subtitle={subtitle}
                        menuOpen={menuOpen}
                        onMenuClick={toggleMenu}
                        onDarkModeClick={toggleMode}
                        onHomeClick={() => history.push('/calculator/damage')}
                        menuContent={
                            <List>
                                <ListItem button className={classes.menuItem}>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary='Damage Calculator' />
                                </ListItem>
                                {/* <ListItem button className={classes.menuItem}>
                                    <ListItemIcon>
                                        <Info style={{ fontSize: 22 }} />
                                    </ListItemIcon>
                                    <ListItemText primary='Calculation Info' />
                                </ListItem> */}
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
