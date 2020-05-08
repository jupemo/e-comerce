import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, ottherProps}) => (
    <button className='custom-button'{...ottherProps}>
        {children}
    </button>   
);

export default CustomButton;