import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt from 'jwt-decode' // import dependency

const axios = require('axios');
        
const LoginForm = (props) => {
  let navigate = useNavigate();
  const location = useLocation();
  const redirLoc = location.state.redirLoc;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('/v1/login', { 'email': data.get('email'), 'password': data.get('password') }).then((response) => {
      const accessToken = response.data.accessToken;
      const decoded = jwt(accessToken)
      const custId = decoded.bittooId;
      const cookie = new Cookies();
      cookie.set('access_token', accessToken);
      cookie.set('customerId', custId);
      navigate(redirLoc);
      
    }).catch((error) => {
      console.log(error);
    });
  };

  return(
    <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
    >
      <Typography component="h1" variant="h5">
          Sign in
      </Typography>
        
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="SignUp" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LoginForm;