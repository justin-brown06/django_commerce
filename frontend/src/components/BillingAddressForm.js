import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Grid, Typography } from '@material-ui/core';
import { BasicFormField, Message } from './utils';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#5BCA81',
        color: '#30323B'
    }
}));

export const BillingAddressForm = ({ userInfo, updateAddress }) => {
    const classes = useStyles();
    const [billingAddress1, setBillingAddress1] = useState(
        userInfo?.billing_address?.address_one || ''
    );
    const [billingAddress2, setBillingAddress2] = useState(
        userInfo?.billing_address?.address_two || ''
    );
    const [billingCity, setBillingCity] = useState(
        userInfo?.billing_address?.city || ''
    );
    const [billingState, setBillingState] = useState(
        userInfo?.billing_address?.state || ''
    );
    const [billingPostalCode, setBillingPostalCode] = useState(
        userInfo?.billing_address?.postal_code || ''
    );
    const [billingCountry, setBillingCountry] = useState(
        userInfo?.billing_address?.country || ''
    );
    const [message, setMessage] = useState('');

    const submitHandler = () => {
        console.log('saved billing address');
        setMessage('');
    };

    useEffect(() => {
        if (updateAddress) {
            setBillingAddress1(userInfo?.shipping_address?.address_one);
            setBillingAddress2(userInfo?.shipping_address?.address_two);
            setBillingCity(userInfo?.shipping_address?.city);
            setBillingState(userInfo?.shipping_address?.state);
            setBillingPostalCode(userInfo?.shipping_address?.postal_code);
            setBillingCountry(userInfo?.shipping_address?.country);
        }
    }, [updateAddress, userInfo]);

    return (
        !updateAddress && (
            <div className={classes.paper}>
                <Typography
                    component='h1'
                    variant='h4'
                    className={classes.alert}
                >
                    Billing Address
                </Typography>
                {message && (
                    <Message
                        className={classes.alert}
                        severity='error'
                        title='Login Error'
                    >
                        {message}
                    </Message>
                )}
                <FormGroup className={classes.form} noValidate>
                    <Grid container item spacing={2}>
                        <BasicFormField
                            state={billingAddress1}
                            stateSetter={setBillingAddress1}
                            propKey='billing-address-1'
                            label='Address 1'
                            size={6}
                        />
                        <BasicFormField
                            state={billingAddress2}
                            stateSetter={setBillingAddress2}
                            propKey='billing-address-2'
                            label='Address 2'
                            size={6}
                        />
                        <BasicFormField
                            state={billingCity}
                            stateSetter={setBillingCity}
                            propKey='billing-city'
                            label='City'
                        />
                        <BasicFormField
                            state={billingState}
                            propKey='billing-state'
                            label='State'
                            stateSetter={setBillingState}
                        />
                        <BasicFormField
                            state={billingPostalCode}
                            propKey='billing-postalCode'
                            label='Postal Code'
                            stateSetter={setBillingPostalCode}
                        />
                        <BasicFormField
                            state={billingCountry}
                            propKey='billingCountry'
                            label='Country'
                            stateSetter={setBillingCountry}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            className={classes.submit}
                            onClick={submitHandler}
                        >
                            Save Billing Address
                        </Button>
                    </Grid>
                </FormGroup>
            </div>
        )
    );
};
