import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Grid,
    Typography
} from '@material-ui/core';
import {
    CheckCircle as CheckCircleIcon,
    CheckCircleOutlined as CheckCircleOutlinedIcon
} from '@material-ui/icons';
import { BasicFormField, Message } from './utils';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const BokChoyCheckbox = withStyles({
    root: {
        color: '#5BCA81',
        '&$checked': {
            color: '#5BCA81'
        }
    },
    checked: {}
})(props => <Checkbox color='default' {...props} />);

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#5BCA81',
        color: '#30323B'
    }
}));

export const ShippingAddressForm = ({
    userInfo,
    showSameAsBillingButton,
    sameAddressState,
    sameAddressStateSetter
}) => {
    const classes = useStyles();
    const [shippingAddress1, setShippingAddress1] = useState(
        userInfo?.shipping_address?.address_one || ''
    );
    const [shippingAddress2, setShippingAddress2] = useState(
        userInfo?.shipping_address?.address_two || ''
    );
    const [shippingCity, setShippingCity] = useState(
        userInfo?.shipping_address?.city || ''
    );
    const [shippingState, setShippingState] = useState(
        userInfo?.shipping_address?.state || ''
    );
    const [shippingPostalCode, setShippingPostalCode] = useState(
        userInfo?.shipping_address?.postal_code || ''
    );
    const [shippingCountry, setShippingCountry] = useState(
        userInfo?.shipping_address?.country || ''
    );
    const [message, setMessage] = useState('');

    const submitHandler = () => {
        console.log('saved shipping address');
        setMessage('');
    };

    return (
        <div className={classes.paper}>
            <Typography component='h1' variant='h4'>
                Shipping Address
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
                    {showSameAsBillingButton ? (
                        <Grid
                            item
                            xs={12}
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <FormControlLabel
                                defaultValue={sameAddressState}
                                control={
                                    <BokChoyCheckbox
                                        icon={<CheckCircleOutlinedIcon />}
                                        checkedIcon={<CheckCircleIcon />}
                                        name='sameAddress'
                                    />
                                }
                                onChange={() =>
                                    sameAddressStateSetter(!sameAddressState)
                                }
                                label='Same as Billing Address'
                            />
                        </Grid>
                    ) : null}
                    <BasicFormField
                        state={shippingAddress1}
                        stateSetter={setShippingAddress1}
                        propKey='shipping-address-1'
                        label='Address 1'
                        size={6}
                    />
                    <BasicFormField
                        state={shippingAddress2}
                        stateSetter={setShippingAddress2}
                        propKey='shipping-address-2'
                        label='Address 2'
                        size={6}
                    />
                    <BasicFormField
                        state={shippingCity}
                        stateSetter={setShippingCity}
                        propKey='shipping-city'
                        label='City'
                    />
                    <BasicFormField
                        state={shippingState}
                        propKey='shipping-state'
                        label='State'
                        stateSetter={setShippingState}
                    />
                    <BasicFormField
                        state={shippingPostalCode}
                        propKey='shipping-postalCode'
                        label='Postal Code'
                        stateSetter={setShippingPostalCode}
                    />
                    <BasicFormField
                        state={shippingCountry}
                        propKey='shippingCountry'
                        label='Country'
                        stateSetter={setShippingCountry}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        className={classes.submit}
                        onClick={submitHandler}
                    >
                        Save Shipping Address
                    </Button>
                </Grid>
            </FormGroup>
        </div>
    );
};
