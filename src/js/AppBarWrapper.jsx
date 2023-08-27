import { AppBar, Box, Button, Popover, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import AdbIcon from '@mui/icons-material/Adb'
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";
import { useMemo } from "react";


const AppBarWrapper =  memo((props) => {
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
    const cookie = useMemo(() =>  new Cookies(), []);

    const signInOut = () => {
        if (cookie.get('customerId') === "null") {
            navigate('../login', { state: { redirLoc: '../' + props.page, redirState: props.pageProps } });
        } else {
            // logout
            cookie.set('customerId', null);
            cookie.set('access_token', null);
            setLoginButtonText('Sign In');
            navigate('../home');
        }
    };
    
    
    useEffect(() => {
        const customerId = cookie.get('customerId');
        const loginTxt = ( customerId === "null") ? "Sign In " : "Sign Out";
        setLoginButtonText(loginTxt);        
    }, [cookie]);

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
    const trigger = useScrollTrigger({threshold: 300});
    return <>
        <AppBar sx={{height: 130}} position='static'>           
            <Toolbar>
                <MenuIcon sx={{ mr: 2 }} />
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
                <Box>
                    <Button sx={{ color: 'secondary.dark' }} variant="text" onClick={() => { navigate(`../home`) }}>
                        <Typography variant='h3'>Bittoo</Typography>
                    </Button>
                </Box>
                <SearchBar showSearch={props.showSearch} />
                <Box sx={{ flexGrow: 1 }}>
                    {/* { {popOverEnabled && <Button aria-haspopup="true" aria-owns={popOverOpen ? 'login-popover' : undefined} variant='contained' }
                        { onMouseEnter={handlePopOverOpen} onMouseLeave={handlePopOverClose}> }
                        {{loginButtonText}} }
                        </Button>*/}
                    <Button variant='contained' onClick={signInOut}> {loginButtonText} </Button>
                    {popOverEnabled && popOverElem}
                </Box>
                <ShoppingCartIcon />
            </Toolbar> 
            <MenuBar />
        </AppBar>
        <Slide appear={true} direction="down" in={trigger}>        
            <AppBar >
                <MenuBar />    
            </AppBar>
        </Slide>
    </>
});

export default AppBarWrapper;