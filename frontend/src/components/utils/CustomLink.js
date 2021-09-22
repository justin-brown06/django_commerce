import React, { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export const CustomLink = ({ to, color, size, style, children }) => {
    const CustomLink = useMemo(
        () =>
            forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to]
    );

    return (
        <Typography
            variant={size || 'h6'}
            noWrap
            color='inherit'
            component={CustomLink}
            style={{
                ...style,
                textDecoration: 'none',
                color: color || '#5BCA81'
            }}
        >
            {children}
        </Typography>
    );
};
