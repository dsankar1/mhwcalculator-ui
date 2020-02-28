import _ from 'lodash';
import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export const ComboTable = React.memo(props => {
    console.log('Props', props);

    const rows = _.map(props.combos, combo => {
        const hitCount = _.size(combo.motionValues);
        const motionValueSum = _.reduce(combo.motionValues, _.add);
        const baseDamage = _.reduce(_.map(combo.damageValues, 'baseTotal'), _.add);
        const effectiveDamage = _.reduce(_.map(combo.damageValues, 'effectiveTotal'), _.add);

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
                    {baseDamage}
                </TableCell>
                <TableCell align='right'>
                    {effectiveDamage}
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
                        <TableCell align='right'>Motion Value</TableCell>
                        <TableCell align='right'>Base Damage</TableCell>
                        <TableCell align='right'>Effective Damage</TableCell>
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
