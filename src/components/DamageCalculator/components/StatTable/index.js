import _ from 'lodash';
import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export const StatTable = React.memo(props => {
    const baseTrueAttack = _.get(props, 'baseTrueAttack');
    const baseTrueElement = _.get(props, 'baseTrueElement');
    const baseAffinityPct = _.get(props, 'baseAffinityPct');

    const trueAttackBuff = _.get(props, 'trueAttackBuff');
    const trueElementBuff = _.get(props, 'trueElementBuff');
    const affinityPctBuff = _.get(props, 'affinityPctBuff');

    const attack = _.get(props, 'attack');
    const element = _.get(props, 'element');
    const trueAttack = _.get(props, 'trueAttack');
    const trueElement = _.get(props, 'trueElement');
    const affinityPct = _.get(props, 'affinityPct');
    const freeElement = _.get(props, 'freeElement');
    const criticalAttackMult = _.get(props, 'criticalAttackMult');
    const criticalElement = _.get(props, 'criticalElement') ? 'Yes' : '-';

    const buffs = _.get(props, 'buffs');

    const rows = _.map(buffs, buff => {
        const trueAttack = _.defaultTo(buff.trueAttack, '-');
        const trueElement = _.defaultTo(buff.trueElement, '-');
        const affinityPct = _.defaultTo(buff.affinityPct, '-');
        const freeElement = _.defaultTo(buff.freeElement, '-');
        const criticalAttackMult = _.defaultTo(buff.criticalAttackMult, '-');
        const criticalElement = buff.criticalElement ? 'Yes' : '-';

        return (
            <TableRow key={buff.name} hover>
                <TableCell>{buff.name}</TableCell>
                <TableCell align='right'>{trueAttack}</TableCell>
                <TableCell align='right'>{affinityPct}</TableCell>
                <TableCell align='right'>{trueElement}</TableCell>
                <TableCell align='right'>{freeElement}</TableCell>
                <TableCell align='right'>{criticalAttackMult}</TableCell>
                <TableCell align='right'>{criticalElement}</TableCell>
            </TableRow>
        );
    });

    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align='right'>True Attack (Display)</TableCell>
                        <TableCell align='right'>Affinity Percent</TableCell>
                        <TableCell align='right'>True Element (Display)</TableCell>
                        <TableCell align='right'>Free Element</TableCell>
                        <TableCell align='right'>Critical Boost</TableCell>
                        <TableCell align='right'>Critical Element</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align='right'>{trueAttack} ({attack})</TableCell>
                        <TableCell align='right'>{affinityPct}</TableCell>
                        <TableCell align='right'>{trueElement} ({element})</TableCell>
                        <TableCell align='right'>{freeElement}</TableCell>
                        <TableCell align='right'>{criticalAttackMult}</TableCell>
                        <TableCell align='right'>{criticalElement}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Weapon</TableCell>
                        <TableCell align='right'>{baseTrueAttack}</TableCell>
                        <TableCell align='right'>{baseAffinityPct}</TableCell>
                        <TableCell align='right'>{baseTrueElement}</TableCell>
                        <TableCell align='right'>-</TableCell>
                        <TableCell align='right'>-</TableCell>
                        <TableCell align='right'>-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Subtotal</TableCell>
                        <TableCell align='right'>{trueAttackBuff}</TableCell>
                        <TableCell align='right'>{affinityPctBuff}</TableCell>
                        <TableCell align='right'>{trueElementBuff}</TableCell>
                        <TableCell align='right'>{freeElement}</TableCell>
                        <TableCell align='right'>{criticalAttackMult}</TableCell>
                        <TableCell align='right'>{criticalElement}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    )
});

export default StatTable;
