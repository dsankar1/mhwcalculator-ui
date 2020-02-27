import _ from 'lodash';
import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export const ComboTable = React.memo(props => {
    console.log('Props', props);

    const rows = _.map(props.combos, combo => {
        const hitCount = _.size(combo.motionValues);
        const motionValueSum = _.reduce(combo.motionValues, _.add);
        const physicalDamage = _.reduce(_.map(combo.damageValues, 'physical'), _.add);
        const elementalDamage = _.reduce(_.map(combo.damageValues, 'elemental'), _.add);
        const totalDamage = _.reduce(_.map(combo.damageValues, 'total'), _.add);

        return (
            <TableRow key={combo.name} hover>
                <TableCell>
                    {combo.name}
                </TableCell>
                <TableCell align='right'>
                    {hitCount}
                </TableCell>
                <TableCell align='right'>
                    {motionValueSum}
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
                        <TableCell />
                        <TableCell align='right'>Hit Count</TableCell>
                        <TableCell align='right'>Motion Value Sum</TableCell>
                        <TableCell align='right'>Physical Damage (Base + Affinity)</TableCell>
                        <TableCell align='right'>Elemental Damage (Base + Affinity)</TableCell>
                        <TableCell align='right'>Total Damage (Base + Affinity)</TableCell>
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
