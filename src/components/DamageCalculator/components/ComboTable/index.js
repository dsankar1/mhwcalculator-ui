import _ from 'lodash';
import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export const ComboTable = React.memo(props => {
    const rows = _.map(props.combos, combo => {
        const hitCount = _.size(combo.motionValues);
        const motionValueSum = _.reduce(combo.motionValues, _.add);
        const basePhysical = _.reduce(_.map(combo.damageValues, 'basePhysical'), _.add);
        const baseElemental = _.reduce(_.map(combo.damageValues, 'baseElemental'), _.add);
        const baseDamage = _.reduce(_.map(combo.damageValues, 'baseTotal'), _.add);
        const effectivePhysical = _.reduce(_.map(combo.damageValues, 'effectivePhysical'), _.add);
        const effectiveElemental = _.reduce(_.map(combo.damageValues, 'effectiveElemental'), _.add);
        const effectiveDamage = _.reduce(_.map(combo.damageValues, 'effectiveTotal'), _.add);

        return (
            <TableRow key={combo.name} hover>
                <TableCell>
                    {combo.name}
                </TableCell>
                <TableCell align='right'>
                    {effectiveDamage} ({effectivePhysical}/{effectiveElemental})
                </TableCell>
                <TableCell align='right'>
                    {baseDamage} ({basePhysical}/{baseElemental})
                </TableCell>
                <TableCell align='right'>
                    {motionValueSum}
                </TableCell>
                <TableCell align='right'>
                    {hitCount}
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
                        <TableCell align='right'>Effective Damage (Physical/Elemental)</TableCell>
                        <TableCell align='right'>Base Damage (Physical/Elemental)</TableCell>
                        <TableCell align='right'>Motion Value</TableCell>
                        <TableCell align='right'>Hit Count</TableCell>
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
