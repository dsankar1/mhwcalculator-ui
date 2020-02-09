import React from 'react';
import BuffsInput from '../BuffsInput';
import items from './items';

export const ItemsInput = React.memo(props => {
    return (
        <BuffsInput
            {...props}
            title='Items/Equipment'
            config={items}
        />
    );
});

export default ItemsInput;
