import clsx from 'clsx';
import React, { memo } from 'react';
import { makeStyles, Drawer } from '@material-ui/core';

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
    drawer: {
        top: 57,
        flexShrink: 0,
        width: drawerWidth,
        border: 'none',
        whiteSpace: 'nowrap',
        boxShadow: theme.shadows[6],
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
            top: 49
        }, 
        [theme.breakpoints.up('sm')]: { 
            top: 65
        }
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: 0,
        overflowX: 'hidden',
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(9) + 1
        }
    }
}));

export const SideDrawer = memo(({ open, menuContent }) => {
    const classes = useStyles();
    return (
        <Drawer
            variant='permanent'
            classes={{
                paper: clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })
            }}
            open={open}
        >
            {menuContent}
        </Drawer>
    );
});

export default SideDrawer;
