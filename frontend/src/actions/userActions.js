import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/userConstants';
import axios from 'axios';

export const Login = (email, password) => async dispatch => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const { data } = await axios.post(
            '/api/users/login/',
            { username: email, password: password },
            config
        );

        data.shipping_address = data.shipping_address[0];
        data.billing_address = data.billing_address[0];

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        });
    }
};

export const Register =
    (first_name, last_name, email, password) => async dispatch => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST
            });

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };

            const { data } = await axios.post(
                '/api/users/register/',
                { first_name, last_name, email, password },
                config
            );

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message
            });
        }
    };

export const Update = user => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const {
            user: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access || userInfo.token}`
            }
        };

        console.log(config, user);

        const { data } = await axios.put(
            '/api/users/profile/update/',
            user,
            config
        );

        data.shipping_address = data.shipping_address[0];
        data.billing_address = data.billing_address[0];

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        });
    }
};

export const Logout = () => dispatch => {
    localStorage.removeItem('userInfo');

    dispatch({
        type: USER_LOGOUT
    });
};
