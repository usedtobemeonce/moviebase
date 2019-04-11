import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { Alert } from 'react-bootstrap';

const input = props => {
    const { className, placeholder, ariaLabel, value, name, as, rows, errors, touched } = props;

    const handleChange = e => {
        props.onChange(e.target.name, e.target.value);
    }

    const handleBlur = e => {
        props.onBlur(e.target.name, e.target.value);
    }

    return (
        <>
            <FormControl
                style={{
                    backgroundColor: '#212121',
                    borderColor: '#555',
                    color: 'white'
                }}
                className={className}
                placeholder={placeholder || ""}
                aria-label={ariaLabel || ""}
                name={name}
                value={value}
                as={as || 'input'}
                rows={rows || 1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors ? 1 : 0 && touched ? 1 : 0}
            />
            {
                errors &&
                touched &&
                <Alert variant="info">
                    {errors}
                </Alert>
            }
        </>
    );
}

export default input;