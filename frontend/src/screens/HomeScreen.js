import React from "react";
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
    height: '24rem',
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  item: {
    height: "35rem",
    margin: "auto",
  },
  gridItem: {
    display: "flex",
    margin: ".5rem",
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
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.rating} from {product.numReviews} reviews
                </Typography>
                <br/>
                <Typography variant="h3">
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
