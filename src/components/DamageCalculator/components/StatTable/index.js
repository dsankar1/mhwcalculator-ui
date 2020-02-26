import _ from 'lodash';
import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export const StatTable = React.memo(props => {
    console.log('Props', props);

    const baseTrueAttack = _.get(props, 'baseTrueAttack');
    const baseTrueElement = _.get(props, 'baseTrueElement');
    const baseAffinityPct = _.get(props, 'baseAffinityPct');

    const attack = _.get(props, 'attack');
    const element = _.get(props, 'element');
    const trueAttack = _.get(props, 'trueAttack');
    const trueElement = _.get(props, 'trueElement');
    const affinityPct = _.get(props, 'affinityPct');
    const criticalAttackMult = _.get(props, 'criticalAttackMult');
    const freeElement = _.get(props, 'freeElement');

    const buffs = _.get(props, 'buffs');

    const rows = _.map(buffs, buff => {
        const criticalAttackMult = _.defaultTo(buff.criticalAttackMult, '-');
        const freeElement = _.defaultTo(buff.freeElement, '-');
        const trueAttack = _.defaultTo(buff.trueAttack, '-');
        const trueElement = _.defaultTo(buff.trueElement, '-');
        const affinityPct = _.defaultTo(buff.affinityPct, '-');

        return (
            <TableRow key={buff.name} hover>
                <TableCell>{buff.name}</TableCell>
                <TableCell align='right'>{trueAttack}</TableCell>
                <TableCell align='right'>{affinityPct}</TableCell>
                <TableCell align='right'>{trueElement}</TableCell>
                <TableCell align='right'>{freeElement}</TableCell>
                <TableCell align='right'>{criticalAttackMult}</TableCell>
            </TableRow>
        );
    });

    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align='right'>True Attack</TableCell>
                        <TableCell align='right'>Affinity</TableCell>
                        <TableCell align='right'>True Element</TableCell>
                        <TableCell align='right'>Free Element</TableCell>
                        <TableCell align='right'>Critical Boost</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align='right'>{trueAttack} ({attack})</TableCell>
                        <TableCell align='right'>{affinityPct}</TableCell>
                        <TableCell align='right'>{trueElement} ({element})</TableCell>
                        <TableCell align='right'>{freeElement}</TableCell>
                        <TableCell align='right'>{criticalAttackMult}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Base</TableCell>
                        <TableCell align='right'>{baseTrueAttack}</TableCell>
                        <TableCell align='right'>{baseAffinityPct}</TableCell>
                        <TableCell align='right'>{baseTrueElement}</TableCell>
                        <TableCell align='right'>0</TableCell>
                        <TableCell align='right'>1.25</TableCell>
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
