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
    Container,
    CssBaseline,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
                <Grid container item spacing={2} xs={12} sm={12} md={6} lg={6}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography
                            component='h1'
                            variant='h3'
                            className={classes.alert}
                        >
                            Past Orders
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
                                </Grid>
                            </form>
                        )}
                    </div>
                </Grid>
            </Grid>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};
