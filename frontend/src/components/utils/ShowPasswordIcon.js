import React from 'react';
import { IconButton, InputAdornment } from '@material-ui/core';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons';

export const ShowPasswordIcon = (showPassword, setShowPassword) => {
    return {
        endAdornment: (
            <InputAdornment position='end'>
                <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={e => e.preventDefault()}
                    tabIndex={-1}
                >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
            </InputAdornment>
        )
    };
};
