import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Message } from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
    Avatar,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    MenuItem,
    Paper,
    Select,
    Typography
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { CustomLink, Message } from '../components';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    productList: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    },
    parentGrid: {
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    childGrid: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
    },
    buyButton: {
        backgroundColor: '#5BCA81',
        color: '#30323B'
    },
    disabledButon: {
        backgroundColor: '#5BCA81',
        color: '#30323B',
        opacity: 0.5,
        cursor: 'not-allowed',
        boxShadow: '0 0 0 0 rgba(0, 127, 255, 0)'
    }
}));

export const CartScreen = ({ match, location, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2);
    const productId = match.params.id;
    const quantity = location.search
        ? Number(location.search.split('=')[1])
        : 1;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    return (
        <Grid container item md={12} lg={12} className={classes.parentGrid}>
            <Typography variant='h2' className={classes.title}>
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Grid item md={6} lg={6}>
                    <Message severity='info' title='Nothing Here!'>
                        Your cart is empty.{' '}
                        <CustomLink size='body1' to='/' color='#5BCA81'>
                            Go to Homepage
                        </CustomLink>
                    </Message>
                </Grid>
            ) : (
                <div>
                    <CustomLink
                        to='/'
                        color='#5BCA81'
                        style={{ margin: '.5rem' }}
                    >
                        Continue Shopping
                    </CustomLink>
                    <Grid
                        container
                        item
                        md={12}
                        lg={12}
                        className={classes.childGrid}
                    >
                        <Grid
                            item
                            sm={12}
                            md={8}
                            lg={8}
                            key='cart-list-parent'
                            className={classes.productList}
                        >
                            <List key='cart-list'>
                                {cartItems.map(item => (
                                    <ListItem
                                        key={`item-${item.product}`}
                                        style={{ height: '12rem' }}
                                    >
                                        <ListItemAvatar
                                            key={item.image}
                                            style={{ minWidth: '12rem' }}
                                        >
                                            <Avatar
                                                style={{
                                                    width: '8rem',
                                                    height: '8rem'
                                                }}
                                                key={`image-${item.name}`}
                                                alt={item.name}
                                                src={item.image}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            key={`item-desc-${item.product}`}
                                            primary={item.name}
                                            secondary={item.price}
                                        />
                                        <FormControl
                                            style={{
                                                width: '25%',
                                                marginRight: '3rem'
                                            }}
                                        >
                                            <InputLabel id='quantity-label'>
                                                Quantity
                                            </InputLabel>
                                            <Select
                                                labelId='quantity-label'
                                                id='quantity-select'
                                                value={item.quantity}
                                                label='Quantity'
                                                onChange={({ target }) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.product,
                                                            Number(target.value)
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.countInStock
                                                    ).keys()
                                                ].map(k => (
                                                    <MenuItem
                                                        key={k + 1}
                                                        value={k + 1}
                                                    >
                                                        {k + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <ListItemSecondaryAction
                                            key={`delete-${item.name}`}
                                        >
                                            <IconButton
                                                key={`delete-button-${item.name}`}
                                                edge='end'
                                                aria-label='delete'
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.product
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            md={3}
                            lg={3}
                            className={classes.checkoutSection}
                        >
                            <Paper>
                                <List>
                                    <ListItem>
                                        <Typography
                                            variant='h5'
                                            className={classes.title}
                                        >
                                            Subtotal ({cartCount} Items) <br />${' '}
                                            {subtotal}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            variant='contained'
                                            className={
                                                !quantity
                                                    ? classes.disabledButton
                                                    : classes.buyButton
                                            }
                                            disabled={!quantity}
                                            onClick={checkoutHandler}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            )}
        </Grid>
    );
};
