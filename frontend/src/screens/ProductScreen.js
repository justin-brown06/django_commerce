import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "../components";
import { makeStyles } from "@material-ui/core/styles";
import { productsList } from "../productsList";
import { Card, CardMedia, Grid } from "@material-ui/core";

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

export const ProductScreen = ({ match }) => {
  const classes = useStyles();
  const product = productsList.find((p) => p._id === match.params.id);

  return (
    <Grid container>
      <Grid item>
        <Card>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
        </Card>
       </Grid>
     </Grid>
  );
};
