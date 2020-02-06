import React, { memo } from 'react';
import { makeStyles, useTheme, useMediaQuery, AppBar, Toolbar, Box, IconButton, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import icon from '../../assets/favicon.png';

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
        color: theme.palette.text.primary
    },
    subtitle: {
        fontSize: 14,
        color: theme.palette.text.primary
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    darkThemeLabel: {
        fontSize: 14,
        marginRight: theme.spacing(0.2),
        color: theme.palette.text.primary
    }
}));

export const TopBar = memo(({ subtitle, onMenuClick, onHomeClick, onDarkThemeClick }) => {
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery('(min-width:500px)');
    return (
        <AppBar position='fixed' className={classes.appBar}>
            <Toolbar>
                <IconButton
                    edge='start'
                    aria-label='menu'
                    className={classes.menuButton}
                    onClick={onMenuClick}
                >
                    <Menu />
                </IconButton>
                <img
                    alt='Monster Hunter Gem'
                    src={icon}
                    className={classes.icon}
                    onClick={onHomeClick}
                />
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    className={classes.titleBox}
                >
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
                        <Typography className={classes.darkThemeLabel}>
                            Dark Theme
                        </Typography>
                    ) : null}
                    control={
                        <Switch
                            checked={theme.palette.type === 'dark'}
                            onClick={onDarkThemeClick}
                        />
                    }
                />
            </Toolbar>
        </AppBar>
    );
});

export default TopBar;
