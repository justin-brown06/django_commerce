import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const Loader = () => {
    return (
        <div>
            <CircularProgress
                style={{
                    height: '100px',
                    width: '100px',
                    margin: 'auto',
                    display: 'block'
                }}
            />
            <span>Loading...</span>
        </div>
    );
};
