import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Rating } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Loader } from '../components';

const useStyles = makeStyles({
    root: {
        display: 'flex'
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
    }
});

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { error, loading, products } = useSelector(
        state => state.productList
    );

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <Grid container className={classes.container}>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                products.map(product => (
                    <Grid
                        key={`product_${product._id}`}
                        container
                        item
                        md={products.length > 2 ? 3 : 6}
                        lg={products.length > 2 ? 3 : 6}
                        spacing={2}
                        className={classes.gridItem}
                    >
                        <Card className={classes.item}>
                            <CardActionArea style={{ height: '35rem' }}>
                                <Link to={`/product/${product._id}`}>
                                    <CardMedia
                                        className={classes.media}
                                        image={product.image}
                                        title={product.name}
                                    />
                                </Link>
                                <CardContent>
                                    <Typography gutterBottom variant='h6'>
                                        {product.name}
                                    </Typography>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                        color={'#f8e825'}
                                    />
                                    <Typography variant='h4'>
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};
