import { Container, Toolbar, Typography } from "@mui/material";

const MenuBar = () => {
return <Container>
    <Toolbar sx={{height:50}}>
            <Container><Typography align='center'>Dog</Typography></Container>
            <Container><Typography align='center'>Cat</Typography></Container>
            <Container><Typography align='center'>Birds</Typography></Container>
            <Container><Typography align='center'>Small Pet</Typography></Container>
            <Container><Typography align='center'>Reptile</Typography></Container>
        </Toolbar>
        </Container>
}

export default MenuBar;
