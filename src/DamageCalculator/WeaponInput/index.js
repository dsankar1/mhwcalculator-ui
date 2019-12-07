import _ from 'lodash';
import React, { memo } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import TextField from '../../TextField';
import WeaponTypeSelect from './WeaponTypeSelect';
import ElementInput from './ElementInput';
import SharpnessPicker from './SharpnessPicker';
import CoatingPicker from './CoatingPicker';
import ButtonPicker from '../ButtonPicker';

export const WeaponInput = memo(({ build, onChange }) => {
    const isDualBlades = _.isEqual(_.get(build, 'weapon'), 'dualBlades');
    const isBow = _.isEqual(_.get(build, 'weapon'), 'bow');
    const isBowgun = (
        _.isEqual(_.get(build, 'weapon'), 'lightBowgun')
        || _.isEqual(_.get(build, 'weapon'), 'heavyBowgun')
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <WeaponTypeSelect
                    value={_.get(build, 'weapon')}
                    onChange={weapon => onChange('weapon', weapon)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={isDualBlades ? 2 : 4}>
                <TextField
                    type='number'
                    label='Physical'
                    value={_.get(build, 'physical', '')}
                    onChange={e => _.attempt(onChange, 'physical', e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={isDualBlades ? 2 : 4}>
                <TextField
                    type='number'
                    label='Affinity'
                    value={_.get(build, 'affinity', '')}
                    onChange={e => _.attempt(onChange, 'affinity', e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'>%</InputAdornment>
                    }}
                />
            </Grid>
            {isBowgun ? <Grid item md={4} style={{ padding: 0 }} /> : (
                <Grid item xs={12} sm={6} md={4}>
                    <ElementInput
                        label='Element'
                        value={_.get(build, 'element', '')}
                        type={_.get(build, 'elementType', '')}
                        hidden={_.get(build, 'hiddenElement', false)}
                        onChange={element => _.attempt(onChange, 'element', element)}
                        onChangeType={elementType => _.attempt(onChange, 'elementType', elementType)}
                        onToggleHidden={hiddenElement => _.attempt(onChange, 'hiddenElement', hiddenElement)}
                    />
                </Grid>
            )}
            {isDualBlades && (
                <Grid item xs={12} sm={6} md={4}>
                    <ElementInput
                        label='Second Element'
                        value={_.get(build, 'secondElement', '')}
                        type={_.get(build, 'secondElementType', '')}
                        hidden={_.get(build, 'hiddenSecondElement', false)}
                        onChange={element => _.attempt(onChange, 'secondElement', element)}
                        onChangeType={elementType => _.attempt(onChange, 'secondElementType', elementType)}
                        onToggleHidden={hiddenElement => _.attempt(onChange, 'hiddenSecondElement', hiddenElement)}
                    />
                </Grid>
            )}
            {isBow && (
                <Grid item xs={12} md={6}>
                    <CoatingPicker
                        value={_.get(build, 'coating', '')}
                        onChange={coating => _.attempt(onChange, 'coating', coating)}
                    />
                </Grid>
            )}
            {!isBow && !isBowgun && (
                <Grid item xs={12} md={6}>
                    <SharpnessPicker
                        value={_.get(build, 'sharpness', '')}
                        onChange={sharpness => _.attempt(onChange, 'sharpness', sharpness)}
                    />
                </Grid>
            )}
            <Grid item xs={12} sm={6} md={isBowgun ? 4 : 3}>
                <ButtonPicker
                    grouped
                    range={3}
                    label='Attack Augments'
                    value={_.get(build, 'attackAugments', 0)}
                    onChange={attackAugments => _.attempt(onChange, 'attackAugments', attackAugments)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={isBowgun ? 4 : 3}>
                <ButtonPicker
                    grouped
                    range={3}
                    label='Affinity Augments'
                    value={_.get(build, 'affinityAugments', 0)}
                    onChange={affinityAugments => _.attempt(onChange, 'affinityAugments', affinityAugments)}
                />
            </Grid>
        </Grid>
    );
});

export default WeaponInput;
