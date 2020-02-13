import React from 'react';
import { Box } from '@material-ui/core';

export const CalculationsDisplay = React.memo(props => {
    return (
        <Box maxHeight='300px' overflow='auto'>
            {JSON.stringify(props.calculations)}
        </Box>
    )
});

export default CalculationsDisplay;
