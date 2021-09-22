import {
    HomeScreen,
    ProductScreen,
    CartScreen,
    LoginScreen,
    RegisterScreen
} from './screens';
import { Navbar } from './components/Navbar';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export const App = () => {
    return (
        <Router>
            <Navbar
                main={
                    <div className='App'>
                        <Route path='/' component={HomeScreen} exact />
                        <Route path='/login' component={LoginScreen} />
                        <Route path='/register' component={RegisterScreen} />
                        <Route path='/product/:id' component={ProductScreen} />
                        <Route path='/cart/:id?' component={CartScreen} />
                    </div>
                }
            />
        </Router>
    );
};
