import React from 'react';
import BuffsInput from '../BuffsInput';
import skills from './skills';

export const ItemsInput = React.memo(props => {
    return (
        <BuffsInput
            {...props}
            title='Skills'
            config={skills}
        />
    );
});

export default ItemsInput;
