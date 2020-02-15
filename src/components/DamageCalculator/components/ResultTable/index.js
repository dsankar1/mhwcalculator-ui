import _ from 'lodash';
import React from 'react';
import { makeStyles, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    stickyHeader: {
        backgroundColor: theme.palette.background.paper
    }
}));

export const ResultTable = React.memo(props => {
    console.log('Combos', props.combos);

    const classes = useStyles();

    const combos = _.map(props.combos, combo => {
        const physicalDamage = _.reduce(_.map(combo.damageValues, 'physical'), _.add);
        const elementalDamage = _.reduce(_.map(combo.damageValues, 'elemental'), _.add);
        const totalDamage = physicalDamage + elementalDamage;

        return (
            <TableRow key={combo.name} hover>
                <TableCell>
                    {combo.name}
                </TableCell>
                <TableCell>
                    {physicalDamage}
                </TableCell>
                <TableCell>
                    {elementalDamage}
                </TableCell>
                <TableCell>
                    {totalDamage}
                </TableCell>
            </TableRow>
        );
    });

    return (
        <TableContainer style={{ maxHeight: 300 }}>
            <Table stickyHeader classes={{ stickyHeader: classes.stickyHeader }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Combo Name</TableCell>
                        <TableCell>Total Physical</TableCell>
                        <TableCell>Total Element</TableCell>
                        <TableCell>Total Damage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {combos}
                </TableBody>
            </Table>
        </TableContainer>
    )
});

export default ResultTable;
