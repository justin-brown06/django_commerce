import React from 'react';
import { BokChoyTextField } from '.';
import { Grid } from '@material-ui/core';

export const BasicFormField = ({
    state,
    stateSetter,
    propKey,
    label,
    autoFocus,
    size
}) => {
    return (
        <Grid item xs={12} sm={size || 12}>
            <BokChoyTextField
                required
                fullWidth
                variant='outlined'
                defaultValue={state}
                autoFocus={autoFocus}
                name={propKey}
                id={propKey}
                label={label}
                onChange={({ target }) => stateSetter(target.value)}
            />
        </Grid>
    );
};
