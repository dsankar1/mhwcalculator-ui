import _ from 'lodash';
import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export const ComboTable = React.memo(props => {
    const rows = _.map(props.combos, combo => {
        const physicalDamage = _.reduce(_.map(combo.damageValues, 'physical'), _.add);
        const elementalDamage = _.reduce(_.map(combo.damageValues, 'elemental'), _.add);
        const totalDamage = physicalDamage + elementalDamage;

        return (
            <TableRow key={combo.name} hover>
                <TableCell>
                    {combo.name}
                </TableCell>
                <TableCell align='right'>
                    {physicalDamage}
                </TableCell>
                <TableCell align='right'>
                    {elementalDamage}
                </TableCell>
                <TableCell align='right'>
                    {totalDamage}
                </TableCell>
            </TableRow>
        );
    });

    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Physical Damage</TableCell>
                        <TableCell align='right'>Element Damage</TableCell>
                        <TableCell align='right'>Total Damage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    )
});

export default ComboTable;
