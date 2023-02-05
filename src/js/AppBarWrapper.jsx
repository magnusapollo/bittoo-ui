import { AppBar, Autocomplete, Badge, Box, Button, InputAdornment, Popover, TextField, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import AdbIcon from '@mui/icons-material/Adb'
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import Cookies from "universal-cookie";

const AppBarWrapper = () => {
    const [searchedItem, setSearchedItem] = useState();
    const [top100Items, setTop100Items] = useState([]);
    const [loginButtonText, setLoginButtonText] = useState();
    let navigate = useNavigate();

    // Popover vars

    const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);

    const handlePopOverOpen = (event) => {
        setPopOverAnchorEl(event.currentTarget);
    }

    const handlePopOverClose = () => {
        setPopOverAnchorEl(null);
    }

    const popOverOpen = Boolean(popOverAnchorEl);
    const cookie = new Cookies();
    
    useEffect(() => {
        const txt = (cookie.get('customerId') == "null") ? "Sign In " : "Sign Out";
        console.log(cookie.get('customerId'));
        setLoginButtonText(txt);
    }, []);  
    
    const popOverElem = <Popover id='login-popover'
        open={popOverOpen} anchorEl={popOverAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handlePopOverClose}
    >
        <Button onClick={() => {
            if (cookie.get('customerId') == null) {
                navigate('../login', { state: { redirLoc: 'home' } })
            } else {
                // logout
                cookie.set('customerId', null);
                cookie.set('access_token', null);
            }
        }}>Sign In</Button>
        <Typography>New Customer? <Link to="signup">Sign Up</Link></Typography>
    </Popover>
    const popOverEnabled = false
    return <AppBar position='static'>
        <Toolbar>
            <MenuIcon sx={{ mr: 2 }} />
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
            <Box>
                <Button sx={{ color: 'secondary.dark' }} variant="text" onClick={() => { navigate(`../home`) }}>
                    <Typography>Bittoo</Typography>
                </Button>
            </Box>
            <Autocomplete sx={{ position: 'relative', flexGrow: 5 }}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                onChange={(e, newValue) => {
                    console.log(newValue);
                    setSearchedItem(newValue.id);
                    console.log(searchedItem);
                }}
                options={top100Items.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)
                        }}
                    />
                )}
            />
            <Box sx={{ flexGrow: 1 }}>
                { popOverEnabled && <Button aria-haspopup="true" aria-owns={popOverOpen ? 'login-popover' : undefined} variant='contained'
                    onMouseEnter={handlePopOverOpen} onMouseLeave={handlePopOverClose}>
                    {loginButtonText}
                </Button> }
                <Button variant='contained' onClick={() => {
                    if (cookie.get('customerId') == "null") {
                        setLoginButtonText('Sign In');
                        navigate('../login', { state: { redirLoc: '../home' } });
                    } else {
                        // logout
                        cookie.set('customerId', null);
                        cookie.set('access_token', null);
                        setLoginButtonText('Sign In');
                        navigate('../home');
                    }
                }}> { loginButtonText } </Button>
                { popOverEnabled && popOverElem }
            </Box>
            <Box >
                <Button sx={{ flexGrow: 1, justifyContent: 'flex-end' }} variant='contianed' onClick={() => { navigate('../cart') }}>
                    <Badge><ShoppingCart>Cart</ShoppingCart></Badge></Button>
            </Box>

        </Toolbar>
    </AppBar>
};

export default AppBarWrapper;