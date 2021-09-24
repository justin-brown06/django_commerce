import React, { useState } from 'react';
import { BokChoyTextField, ShowPasswordIcon } from '../components';
import { Grid } from '@material-ui/core';

export const PasswordField = ({ setPassword, propKey, label }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Grid item xs={12}>
            <BokChoyTextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name={propKey}
                label={label}
                type={showPassword ? 'text' : 'password'}
                id={propKey}
                onChange={({ target }) => setPassword(target.value)}
                InputProps={ShowPasswordIcon(showPassword, setShowPassword)}
            />
        </Grid>
    );
};
