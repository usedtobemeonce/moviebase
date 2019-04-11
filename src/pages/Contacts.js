import React from 'react';
import styled from 'styled-components';
import * as Yup from "yup";
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/shared/Button';
import Input from '../components/shared/FormInput';
import Label from '../components/shared/Label';
import Panel from '../components/shared/Panel';
import Header from '../components/shared/Header';

const contactSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
    phone: Yup.string(),
});

const contacts = props => {

    const { history } = props;
    const initialValues = {
        name: '',
        email: '',
        message: '',
        phone: '',
    };

    const handleSubmit = values => {
        history.replace('/');
    }

    return (
        <>
            <ContactForm>

                <Panel>
                    <Header middle>Send us a message</Header>
                    <Header>Please enter your details and message below, and we'll get back to you.</Header>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={contactSchema}
                        onSubmit={values => {
                            handleSubmit(values);
                        }}
                    >
                        {({
                            values,
                            touched,
                            errors,
                            handleSubmit,
                            setFieldValue,
                            setFieldTouched
                        }) => (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <Label>Your name</Label>
                                        <Input
                                            ariaLabel="Your name input"
                                            name="name"
                                            onChange={(name, e) => setFieldValue(name, e)}
                                            onBlur={(name, e) => {
                                                setFieldValue(name, e);
                                                setFieldTouched(name, true, false);
                                            }}
                                            value={values.name}
                                            errors={errors.name}
                                            touched={touched.name}
                                        />
                                    </div>
                                    <div>
                                        <Label>Your email</Label>
                                        <Input
                                            ariaLabel="Your email input"
                                            name="email"
                                            onChange={(name, e) => setFieldValue(name, e)}
                                            onBlur={(name, e) => {
                                                setFieldValue(name, e);
                                                setFieldTouched(name, true, false);
                                            }}
                                            value={values.email}
                                            errors={errors.email}
                                            touched={touched.email}
                                        />
                                    </div>
                                    <div>
                                        <Label>Your phone (optional)</Label>
                                        <Input
                                            ariaLabel="Your phone input"
                                            name="phone"
                                            onChange={(name, e) => setFieldValue(name, e)}
                                            onBlur={(name, e) => {
                                                setFieldValue(name, e);
                                                setFieldTouched(name, true, false);
                                            }}
                                            value={values.phone}
                                        />
                                    </div>
                                    <div>
                                        <Label>Your message</Label>
                                        <Input
                                            ariaLabel="Your message input"
                                            name="message"
                                            as="textarea"
                                            rows="5"
                                            onChange={(name, e) => setFieldValue(name, e)}
                                            onBlur={(name, e) => {
                                                setFieldValue(name, e);
                                                setFieldTouched(name, true, false);
                                            }}
                                            value={values.message}
                                            errors={errors.message}
                                            touched={touched.message}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        variant="outline-danger"
                                    >
                                        <FontAwesomeIcon
                                            fixedWidth size="1x"
                                            icon="paper-plane"
                                            style={{ marginRight: '10px' }}
                                        />
                                        Submit
                                </Button>
                                </form>
                            )}
                    </Formik>
                </Panel>
            </ContactForm>
        </>
    );
}

export default contacts;

const ContactForm = styled.div`
    max-width: 600px;
    margin: 20px auto;

    ${Header} {
        text-align: center;
    }

    form {
        padding: 20px;
        display: flex;
        flex-direction: column;

        div {
            margin: 10px 0;
        }

        button {
            margin: 20px 0;
        }
    }
`;