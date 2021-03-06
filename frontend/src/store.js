import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productDetailReducers,
    productListReducers
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userUpdateReducer
} from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailReducers,
    cart: cartReducer,
    user: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    user: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
