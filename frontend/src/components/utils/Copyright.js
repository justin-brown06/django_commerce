import React from 'react';
import { Link, Typography } from '@material-ui/core';

export const Copyright = () => {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                justinshops.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};
