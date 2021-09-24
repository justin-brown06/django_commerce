import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BokChoyTextField,
    Loader,
    Message,
    Copyright,
    ShowPasswordIcon
} from '../components';
import { Update } from '../actions/userActions';
import {
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography
} from '@material-ui/core';
import {
    CheckCircle as CheckCircleIcon,
    CheckCircleOutlined as CheckCircleOutlinedIcon
} from '@material-ui/icons';
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
    mainGrid: {
        display: 'flex',
        flexFlow: 'row wrap'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    alert: {
        margin: theme.spacing(2)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#5BCA81',
        color: '#30323B'
    },
    grow: {
        flexGrow: 1
    }
}));

export const ProfileScreen = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { error, loading, userInfo } = useSelector(state => state.user);
    const [firstName, setFirstName] = useState(userInfo?.first_name || '');
    const [lastName, setLastName] = useState(userInfo?.last_name || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [password, setPassword] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState('');
    const [differentAddress, setDifferentAddress] = useState(false);
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

    useEffect(() => {
        if (!userInfo || !userInfo.email) history.push('/login');
    }, [userInfo, history]);

    const setShowResetPasswordHandler = () => {
        setShowResetPassword(!showResetPassword);
        setPassword('');
        setConfirmPassword('');

        if (message.toLowerCase().includes('password')) setMessage('');
    };

    const submitHandler = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setMessage('Passwords do not match.');
        }

        dispatch(
            Update({
                first_name: firstName,
                last_name: lastName,
                email,
                password
            })
        );
    };

    return (
        <Container component='main'>
            <Grid container spacing={10} className={classes.mainGrid}>
                <Grid container item spacing={2} xs={12} sm={12} md={6} lg={6}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography
                            component='h1'
                            variant='h3'
                            className={classes.alert}
                        >
                            User Info
                        </Typography>
                        {error && (
                            <Message
                                className={classes.alert}
                                severity='error'
                                title='Login Error'
                            >
                                {error}
                            </Message>
                        )}
                        {message && (
                            <Message
                                className={classes.alert}
                                severity='error'
                                title='Login Error'
                            >
                                {message}
                            </Message>
                        )}
                        {loading ? (
                            <Loader />
                        ) : (
                            <form className={classes.form} noValidate>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <BokChoyTextField
                                            defaultValue={firstName}
                                            autoFocus
                                            name='firstName'
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='firstName'
                                            label='First Name'
                                            onChange={({ target }) =>
                                                setFirstName(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <BokChoyTextField
                                            defaultValue={lastName}
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='lastName'
                                            label='Last Name'
                                            name='lastName'
                                            autoComplete='lname'
                                            onChange={({ target }) =>
                                                setLastName(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={email}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='email'
                                            label='Email Address'
                                            name='email'
                                            autoComplete='email'
                                            onChange={({ target }) =>
                                                setEmail(target.value)
                                            }
                                        />
                                    </Grid>
                                    {showResetPassword && (
                                        <Grid container item>
                                            <Grid item xs={12}>
                                                <BokChoyTextField
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    name='password'
                                                    label='Password'
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    id='password'
                                                    autoComplete='current-password'
                                                    onChange={({ target }) =>
                                                        setPassword(
                                                            target.value
                                                        )
                                                    }
                                                    InputProps={ShowPasswordIcon(
                                                        showPassword,
                                                        setShowPassword
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <BokChoyTextField
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    name='confirm-password'
                                                    label='Confirm Password'
                                                    type={
                                                        showConfirmPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    id='confirm-password'
                                                    autoComplete='current-confirm-password'
                                                    onChange={({ target }) =>
                                                        setConfirmPassword(
                                                            target.value
                                                        )
                                                    }
                                                    InputProps={ShowPasswordIcon(
                                                        showConfirmPassword,
                                                        setShowConfirmPassword
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    )}
                                    <Button
                                        fullWidth
                                        onClick={setShowResetPasswordHandler}
                                    >
                                        {showResetPassword
                                            ? 'Cancel Password Reset'
                                            : 'Reset Passwords'}
                                    </Button>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        className={classes.submit}
                                        onClick={submitHandler}
                                    >
                                        Save Updates
                                    </Button>
                                </Grid>
                            </form>
                        )}
                    </div>
                </Grid>
                <Grid
                    container
                    item
                    spacing={2}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={{ display: 'flex' }}
                >
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography
                            component='h1'
                            variant='h3'
                            className={classes.alert}
                        >
                            Shipping Address
                        </Typography>
                        {error && (
                            <Message
                                className={classes.alert}
                                severity='error'
                                title='Login Error'
                            >
                                {error}
                            </Message>
                        )}
                        {message && (
                            <Message
                                className={classes.alert}
                                severity='error'
                                title='Login Error'
                            >
                                {message}
                            </Message>
                        )}
                        {loading ? (
                            <Loader />
                        ) : (
                            <FormGroup className={classes.form} noValidate>
                                <Grid container item spacing={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <BokChoyCheckbox
                                                    icon={
                                                        <CheckCircleOutlinedIcon />
                                                    }
                                                    checkedIcon={
                                                        <CheckCircleIcon />
                                                    }
                                                    name='sameAddress'
                                                />
                                            }
                                            onChange={() =>
                                                setDifferentAddress(
                                                    !differentAddress
                                                )
                                            }
                                            label='Same as Billing Address'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <BokChoyTextField
                                            defaultValue={shippingAddress1}
                                            name='shipping-address1'
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='shipping-address1'
                                            label='Address 1'
                                            onChange={({ target }) =>
                                                setShippingAddress1(
                                                    target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <BokChoyTextField
                                            defaultValue={shippingAddress2}
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='shipping-address2'
                                            label='Address 2'
                                            name='shipping-address2'
                                            onChange={({ target }) =>
                                                setShippingAddress2(
                                                    target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={shippingCity}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='shipping-city'
                                            label='City'
                                            name='shipping-city'
                                            onChange={({ target }) =>
                                                setShippingCity(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={shippingState}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='shipping-state'
                                            label='State'
                                            name='shipping-state'
                                            onChange={({ target }) =>
                                                setShippingState(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={shippingPostalCode}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='shipping-postalCode'
                                            label='Postal Code'
                                            name='shipping-postalCode'
                                            onChange={({ target }) =>
                                                setShippingPostalCode(
                                                    target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={shippingCountry}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='shippingCountry'
                                            label='Country'
                                            name='shipping-postal-Code'
                                            onChange={({ target }) =>
                                                setShippingCountry(target.value)
                                            }
                                        />
                                    </Grid>
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
                        )}
                    </div>
                    {!differentAddress && (
                        <div className={classes.paper}>
                            <Typography
                                component='h1'
                                variant='h3'
                                className={classes.alert}
                            >
                                Billing Address
                            </Typography>
                            <FormGroup className={classes.form}>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <BokChoyTextField
                                            defaultValue={billingAddress1}
                                            name='billing-address1'
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='billing-address1'
                                            label='Address 1'
                                            onChange={({ target }) =>
                                                setBillingAddress1(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <BokChoyTextField
                                            defaultValue={billingAddress2}
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='billing-address2'
                                            label='Address 2'
                                            name='billing-address2'
                                            onChange={({ target }) =>
                                                setBillingAddress2(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={billingCity}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='billing-city'
                                            label='City'
                                            name='billing-city'
                                            onChange={({ target }) =>
                                                setBillingCity(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={billingState}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='billing-state'
                                            label='State'
                                            name='billing-state'
                                            onChange={({ target }) =>
                                                setBillingState(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={billingPostalCode}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='billing-postalCode'
                                            label='Postal Code'
                                            name='billing-postalCode'
                                            onChange={({ target }) =>
                                                setBillingPostalCode(
                                                    target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={billingCountry}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='billing-country'
                                            label='Country'
                                            name='billing-country'
                                            onChange={({ target }) =>
                                                setBillingCountry(target.value)
                                            }
                                        />
                                    </Grid>
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
                    )}
                </Grid>
            </Grid>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};
