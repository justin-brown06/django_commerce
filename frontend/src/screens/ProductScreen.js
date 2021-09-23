import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail } from '../actions/productActions';
import { CustomLink, Rating } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Paper,
    Select,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        font: 'circularStd'
    },
    parentGrid: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center'
    },
    middleGrid: {
        maxWidth: 360,
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    paper: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        height: '24rem'
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

export const ProductScreen = ({ match, history }) => {
    const dispatch = useDispatch();
    const productId = match.params.id;
    const classes = useStyles();
    const { error, loading, product } = useSelector(
        state => state.productDetail
    );
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        dispatch(productDetail(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        history.push(`/cart/${productId}?qty=${quantity}`);
    };

    return loading ? (
        <h2>...Loading Product</h2>
    ) : error ? (
        <p>{error}</p>
    ) : (
        <Grid container className={classes.parentGrid}>
            <Grid
                item
                md={6}
                lg={6}
                style={{ display: 'flex', flexFlow: 'column wrap' }}
            >
                <CustomLink to='/' color='#30323B' style={{ margin: '.5rem' }}>
                    Continue Shopping
                </CustomLink>
                <img src={product.image} alt={product.name} />
            </Grid>
            <Grid item container md={6} lg={6}>
                <Paper className={classes.paper}>
                    <Grid container item className={classes.middleGrid}>
                        <List className={classes.middleGrid}>
                            <Grid item>
                                <ListItem>
                                    <Typography variant={'h5'}>
                                        {product.name}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                        color={'#f8e825'}
                                    />
                                </ListItem>
                            </Grid>
                            <Grid item>
                                <ListItem>
                                    <Typography variant={'body2'}>
                                        Description: {product.description}
                                    </Typography>
                                </ListItem>
                            </Grid>
                        </List>
                    </Grid>
                    <Grid item className={classes.middleGrid}>
                        <List>
                            <ListItem>
                                <Typography variant={'body1'}>
                                    Price: {product.price}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant={'body1'}>
                                    Availability: &nbsp;
                                </Typography>
                                <Typography variant={'body2'}>
                                    {product.countInStock > 0
                                        ? 'In Stock'
                                        : 'Out of Stock'}
                                </Typography>
                            </ListItem>
                            {product.countInStock > 0 ? (
                                <div>
                                    <ListItem>
                                        <FormControl fullWidth>
                                            <InputLabel id='quantity-label'>
                                                Quantity
                                            </InputLabel>
                                            <Select
                                                labelId='quantity-label'
                                                id='quantity-select'
                                                value={quantity}
                                                label='Quantity'
                                                onChange={({ target }) =>
                                                    setQuantity(target.value)
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        product.countInStock
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
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListItem>
                                </div>
                            ) : null}
                        </List>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};
