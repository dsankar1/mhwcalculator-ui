import _ from 'lodash';
import React from 'react';
import { makeStyles, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table: {
        tableLayout: 'fixed'
    },
    stickyHeader: {
        backgroundColor: theme.palette.background.paper
    }
}));

export const ResultTable = React.memo(props => {
    const classes = useStyles(props);

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
        <TableContainer>
            <Table
                size='small'
                stickyHeader
                classes={{
                    root: classes.table,
                    stickyHeader: classes.stickyHeader
                }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Combo Name</TableCell>
                        <TableCell>Physical Damage</TableCell>
                        <TableCell>Element Damage</TableCell>
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
