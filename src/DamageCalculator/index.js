import React, { useEffect, useContext } from 'react';
import { makeStyles, Container, Grid, Card } from '@material-ui/core';
import { SubtitleContext } from '../App';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2)
    },
    item: {
        marginBottom: theme.spacing(2),
        '&:last-child': {
            marginBottom: 0
        }
    }
}));

export const DamageCalculator = props => {
    const classes = useStyles();
    const setSubtitle = useContext(SubtitleContext);

    useEffect(() => {
        setSubtitle('Damage Calculator');
    }, []);

    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid container item xs={12} lg={9}>
                    <Grid item xs={12} className={classes.item}>
                        <Card style={{ height: 100 }}>

                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Card style={{ height: 300 }}>

                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Card style={{ height: 800 }}>

                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Card style={{ height: 300 }}>

                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DamageCalculator;
