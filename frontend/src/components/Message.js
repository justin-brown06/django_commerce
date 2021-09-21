import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export const Message = ({ severity, title, children }) => {
    return (
        <Alert severity={severity}>
            <AlertTitle>{title}</AlertTitle>
            {children}
        </Alert>
    );
};
