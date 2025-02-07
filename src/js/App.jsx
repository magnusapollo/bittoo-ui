import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Cart from './Cart';
import Checkout from './Checkout';
import Home from './home/Home';
import Layout from './Layout';
import LoginForm from './login/LoginForm';
import OrderConfirmation from './OrderConfirmation';
import SignUp from './login/Signup';
import { themeOptions } from './ThemeOptions';
import '../css/App.css'
import Products from './Products';
import Product from './Product';

const theme = createTheme(themeOptions);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <div>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="login" element={<LoginForm/>} />
                <Route path="home" element={<Home/>} />
                <Route path="s" element={<Products/>} />
                <Route path="cart" element={<Cart cartId='582c09c9-183c-4fc0-a8bc-4a565d84ecd6' />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="p" element={<Product />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="checkout/confirmation" element={<OrderConfirmation />} />
              </Route>
            </Routes>
        </div>
    </ThemeProvider>
  );
};

export default App;