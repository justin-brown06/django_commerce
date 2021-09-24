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

export const ShippingScreen = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { error, loading, userInfo } = useSelector(state => state.user);
    const [address1, setAddress1] = useState(userInfo?.address_one || '');
    const [address2, setAddress2] = useState(userInfo?.address_two || '');
    const [city, setCity] = useState(userInfo?.city || '');
    const [state, setState] = useState(userInfo?.state || '');
    const [postalCode, setPostalCode] = useState(userInfo?.postal_code || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!userInfo || !userInfo.email) history.push('/login');
    }, [userInfo, history]);

    const submitHandler = e => {
        e.preventDefault();

        dispatch();
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
                            Shipping
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
                                            defaultValue={address1}
                                            autoFocus
                                            name='address1'
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='address1'
                                            label='Address 1'
                                            onChange={({ target }) =>
                                                setAddress1(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <BokChoyTextField
                                            defaultValue={address2}
                                            variant='outlined'
                                            required
                                            fullWidth
                                            id='address2'
                                            label='Address 2'
                                            name='address2'
                                            onChange={({ target }) =>
                                                setAddress2(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={city}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='city'
                                            label='City'
                                            name='city'
                                            onChange={({ target }) =>
                                                setCity(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={state}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='state'
                                            label='State'
                                            name='state'
                                            autoComplete='state'
                                            onChange={({ target }) =>
                                                setState(target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <BokChoyTextField
                                            defaultValue={postalCode}
                                            variant='outlined'
                                            margin='normal'
                                            required
                                            fullWidth
                                            id='postalCode'
                                            label='Postal Code'
                                            name='postalCode'
                                            onChange={({ target }) =>
                                                setPostalCode(target.value)
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
                                        Save Shipping Info
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
                            Billing
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
                                                console.log(target.value)
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
                                                console.log(target.value)
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
                                                console.log(target.value)
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
