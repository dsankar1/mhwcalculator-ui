import React from 'react';
import BuffsInput from '../BuffsInput';
import augments from './augments';

export const AugmentsInput = React.memo(props => {
    return (
        <BuffsInput
            {...props}
            title='Augments'
            config={augments}
        />
    );
});

export default AugmentsInput;
