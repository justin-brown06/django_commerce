import React, { useEffect, useState } from "react";
import { Rating } from "../components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  media: {
    height: "24rem",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  item: {
    width: "100%",
    height: "35rem",
    margin: "auto",
  },
  gridItem: {
    display: "flex",
    margin: ".5rem",
    width: "18vh",
  },
});

export const HomeScreen = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Grid container className={classes.container}>
      {products.map((product) => (
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
            <CardActionArea style={{ height: "35rem" }}>
              <Link to={`/product/${product._id}`}>
                <CardMedia
                  className={classes.media}
                  image={product.image}
                  title={product.name}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {product.name}
                </Typography>
                <br />
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
                <br />
                <Typography variant="h3">${product.price}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
