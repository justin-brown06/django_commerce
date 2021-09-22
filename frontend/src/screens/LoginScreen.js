import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Loader,
    Message,
    CustomLink,
    BokChoyTextField,
    Copyright,
    ShowPasswordIcon
} from '../components';
import { Login } from '../actions/userActions';
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

export const LoginScreen = ({ location, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { error, loading, userInfo } = useSelector(state => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, redirect, userInfo]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(Login(email, password));
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
                    Sign in
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
                {loading ? (
                    <Loader />
                ) : (
                    <form className={classes.form} noValidate>
                        <BokChoyTextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            onChange={({ target }) => setEmail(target.value)}
                        />
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
                            onChange={({ target }) => setPassword(target.value)}
                            InputProps={ShowPasswordIcon(
                                showPassword,
                                setShowPassword
                            )}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={submitHandler}
                            style={{
                                backgroundColor: '#5BCA81',
                                color: '#30323B'
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <CustomLink to='/forgot-password' size='body1'>
                                    Forgot Password?
                                </CustomLink>
                            </Grid>
                            <Grid item>
                                <CustomLink to='/register' size='body1'>
                                    Don't have an account? Sign Up
                                </CustomLink>
                            </Grid>
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
