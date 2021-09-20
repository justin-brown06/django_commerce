import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail } from '../actions/productActions';
import { Rating } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    media: {
        height: '24rem'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    item: {
        width: '100%',
        height: '35rem',
        margin: 'auto'
    },
    gridItem: {
        display: 'flex',
        margin: '.5rem',
        width: '18vh'
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
    }
}));

export const ProductScreen = ({ match }) => {
    const dispatch = useDispatch();
    const productId = match.params.id;
    const classes = useStyles();
    const { error, loading, product } = useSelector(state => state.productDetail);

    useEffect(() => {
        dispatch(productDetail(productId));
    }, [dispatch, productId]);

    return loading ? (
        <h2>...Loading Product</h2>
    ) : error ? (
        <p>{error}</p>
    ) : (
        <Grid container className={classes.parentGrid}>
            <Grid item>
                <img src={product.image} alt={product.name} />
            </Grid>
            <Grid container item className={classes.middleGrid}>
                <List className={classes.root}>
                    <Grid item>
                        <ListItem>
                            {/* Add Typography */}
                            {product.name}
                        </ListItem>
                        <ListItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        </ListItem>
                    </Grid>
                    <Grid item>
                        <ListItem>Description: {product.description}</ListItem>
                    </Grid>
                </List>
            </Grid>
            <Grid item>
                <List>
                    <ListItem>Price: {product.price}</ListItem>
                    <ListItem>Availability: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</ListItem>
                </List>
            </Grid>
        </Grid>
    );
};
