import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BokChoyTextField,
    Loader,
    Message,
    CustomLink,
    Copyright,
    ShowPasswordIcon
} from '../components';
import { Register } from '../actions/userActions';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
        margin: theme.spacing(3, 0, 2)
    }
}));

export const RegisterScreen = ({ location, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { error, loading, userInfo } = useSelector(
        state => state.userRegister
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, redirect, userInfo]);

    const submitHandler = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setMessage('Passwords do not match.');
        }
        dispatch(Register(email, password));
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography
                    component='h1'
                    variant='h3'
                    className={classes.alert}
                >
                    Sign Up
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <BokChoyTextField
                                    autoFocus
                                    autoComplete='fname'
                                    name='firstName'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <BokChoyTextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id='lastName'
                                    label='Last Name'
                                    name='lastName'
                                    autoComplete='lname'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <BokChoyTextField
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
                            <Grid item xs={12}>
                                <BokChoyTextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    autoComplete='current-password'
                                    onChange={({ target }) =>
                                        setPassword(target.value)
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
                                    label='confirm-password'
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    id='confirm-password'
                                    autoComplete='current-confirm-password'
                                    onChange={({ target }) =>
                                        setConfirmPassword(target.value)
                                    }
                                    InputProps={ShowPasswordIcon(
                                        showConfirmPassword,
                                        setShowConfirmPassword
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            style={{
                                backgroundColor: '#5BCA81',
                                color: '#30323B'
                            }}
                            className={classes.submit}
                            onClick={submitHandler}
                        >
                            Register
                        </Button>
                        <Grid
                            container
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <CustomLink to='/login' size='body1'>
                                Already have an Account? Log In.
                            </CustomLink>
                        </Grid>
                    </form>
                )}
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};
