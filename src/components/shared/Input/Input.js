import React from 'react';
import FormControl from 'react-bootstrap/FormControl';

const input = props => {
    const { className, placeholder, ariaLabel, title } = props;

    const handleChange = e => {
        props.onChange(e);
    }

    const handleKeyPress = e => {
        props.onKeyPress(e);
    }

    return (
        <FormControl
            style={{
                backgroundColor: '#212121',
                borderColor: '#555',
                color: 'white'
            }}
            className={className}
            placeholder={placeholder || ""}
            aria-label={ariaLabel || ""}
            value={title}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
        />
    );
}

export default input;