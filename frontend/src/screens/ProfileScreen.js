import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BasicFormField,
    Loader,
    Message,
    Copyright,
    ShippingAddressForm,
    PasswordField
} from '../components';
import { Update } from '../actions/userActions';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    FormGroup,
    Grid,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { BillingAddressForm } from '../components/BillingAddressForm';

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
        marginTop: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#5BCA81',
        color: '#30323B'
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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [differentAddress, setDifferentAddress] = useState(false);
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
                        <div className={classes.paper}>
                            <Typography component='h1' variant='h4'>
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
                                <FormGroup className={classes.form} noValidate>
                                    <Grid container item spacing={2}>
                                        <BasicFormField
                                            state={firstName}
                                            stateSetter={setFirstName}
                                            propKey='firstName'
                                            label='First Name'
                                            autoFocus={true}
                                            size={6}
                                        />
                                        <BasicFormField
                                            state={lastName}
                                            stateSetter={setLastName}
                                            propKey='lastName'
                                            label='Last Name'
                                            size={6}
                                        />
                                        <BasicFormField
                                            state={email}
                                            stateSetter={setEmail}
                                            propKey='email'
                                            label='Email'
                                        />
                                        {showResetPassword && (
                                            <Grid container item>
                                                <PasswordField
                                                    propKey='password-reset'
                                                    label='Password'
                                                    setPassword={setPassword}
                                                />
                                                <PasswordField
                                                    propKey='confirm-password-reset'
                                                    label='Confirm Password'
                                                    setPassword={
                                                        setConfirmPassword
                                                    }
                                                />
                                            </Grid>
                                        )}
                                        <Button
                                            fullWidth
                                            onClick={
                                                setShowResetPasswordHandler
                                            }
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
                                </FormGroup>
                            )}
                        </div>
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
                    {loading && userInfo ? (
                        <Loader />
                    ) : (
                        <div className={classes.paper}>
                            <ShippingAddressForm
                                userInfo={userInfo}
                                showSameAsBillingButton
                                sameAddressState={differentAddress}
                                sameAddressStateSetter={setDifferentAddress}
                            />
                            <BillingAddressForm
                                userInfo={userInfo}
                                updateAddress={differentAddress}
                            />
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
