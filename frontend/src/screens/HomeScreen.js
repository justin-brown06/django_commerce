import React from "react";
import { Rating } from '../components';
import { productsList } from "../productsList";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  media: {
    height: '65%',
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  item: {
    width: '100%',
    height: "35rem",
    margin: "auto",
  },
  gridItem: {
    display: "flex",
    margin: ".5rem",
    width: '18vh'
  },
});

export const HomeScreen = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {productsList.map((product) => (
        <Grid
          key={`product_${product._id}`}
          container
          item
          md={3}
          lg={3}
          spacing={2}
          className={classes.gridItem}
        >
          <Card className={classes.item}>
            <CardActionArea style={{height: '35rem'}}>
              <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {product.name}
                </Typography>
                <br/>
               <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                <br/>
                <Typography variant="h4">
                  ${product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
