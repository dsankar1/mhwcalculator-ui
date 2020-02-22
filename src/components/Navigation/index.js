import React, { memo, Fragment } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import TopBar from './TopBar';
import SideDrawer from './SideDrawer';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 48 + theme.spacing(1),
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
            marginTop: 48 + theme.spacing(1)
        }, 
        [theme.breakpoints.up('sm')]: { 
            marginTop: 56 + theme.spacing(1)
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(9) + 1
        }
    }
}));

export const Navigation = memo(({ children, menuOpen, menuContent, ...topBarProps }) => {
    const classes = useStyles();
    return (
        <Fragment>
            <TopBar {...topBarProps} />
            <SideDrawer
                open={menuOpen}
                menuContent={menuContent}
            />
            <Box className={classes.container}>
                {children}
            </Box>
        </Fragment>
    );
});

export default Navigation;
