import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export const Message = ({ severity, title, children, classes }) => {
    return (
        <Alert severity={severity} className={classes}>
            <AlertTitle>{title}</AlertTitle>
            {children}
        </Alert>
    );
};
