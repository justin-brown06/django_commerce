import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarOutline as StarOutlineIcon,
} from "@material-ui/icons";

export const Rating = ({ value, text, color }) => {
  const useStyles = makeStyles({
    stars: {
      color,
      margin: '0.1rem'
    },
  });

  const classes = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body2" className={classes.stars} component="span">
        {value >= 1 ? (
          <StarIcon />
        ) : value >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </Typography>
      <Typography variant="body2" className={classes.stars} component="span">
        {value >= 2 ? (
          <StarIcon />
        ) : value >= 1.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </Typography>
      <Typography variant="body2" className={classes.stars} component="span">
        {value >= 3 ? (
          <StarIcon />
        ) : value >= 2.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </Typography>
      <Typography variant="body2" className={classes.stars} component="span">
        {value >= 4 ? (
          <StarIcon />
        ) : value >= 3.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </Typography>
      <Typography variant="body2" className={classes.stars} component="span">
        {value >= 5 ? (
          <StarIcon />
        ) : value >= 4.5 ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </Typography>
      {text ? (
        <Typography variant="body2" component="span">
          {text}
        </Typography>
      ) : null}
    </div>
  );
};
