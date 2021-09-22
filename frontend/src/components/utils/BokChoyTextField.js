import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const BokChoyTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#5BCA81'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#5BCA81'
        },
        '& input:valid + fieldset': {
            borderColor: '#5BCA81',
            borderWidth: 2
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#30323B'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#5BCA81'
            }
        }
    }
})(TextField);
