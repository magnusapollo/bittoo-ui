import { Box, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Link, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AppBarWrapper from '../AppBarWrapper';
import { Link as RouterLink } from 'react-router-dom';
import Carousel from './Carousel';


const axios = require('axios');
const Home = () => {

    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState({})

    useEffect(() => {
        axios.get('/home_page.json').then((response) => {
            setLayout(response.data);
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        });

    }, []);
    if (loading) {
        return <CircularProgress sx={{margin:'auto', height: '100%' , display:'block'}}/>
    }

    return (<Box>        
        <AppBarWrapper page='home' showSearch/>
        <Box sx={{ flexGrow: 1}}>
            {layout !== undefined &&
                layout.sections.filter(s => s.order !== 0).sort((s1, s2) => s1.order - s2.order).map(section => {
                    switch (section.type) {
                        case 'carousel': {
                            let carouselImages = [];
                            section.elements.forEach(element => {
                                carouselImages.push({ 'label': element.text, 'imgPath': element.imgsrc })
                            })

                            return <Carousel images={carouselImages}></Carousel>
                        }
                        case 'categories':
                            let cards = [];
                            section.elements.forEach(element => {
                                cards.push(
                                <Grid item xs={24/section.elements.length}>
                                        <Card sx={{ ':hover': {boxShadow: 20, cursor: 'pointer' }, maxWidth: 200 }}>
                                            <Link component={RouterLink}  to='../s' state={{ categoryId: element.link }} color='inherit' underline='hover'>
                                                <CardMedia
                                                    component="img"
                                                    height="194"
                                                    image={element.imgsrc}
                                                    alt={element.text}
                                                    />
                                                <CardContent sx={{ textAlign:'center'}}>
                                                    <Typography sx={{textTransform: 'uppercase', textAlign:'center'}} color="text.primary" variant='body'>{element.text}</Typography>
                                                </CardContent>
                                            </Link>

                                        </Card>
                                </Grid>);
                            })
                            return <Container sx={{mt:1 }}>
                                <Typography color='text.primary' variant='h5' sx={{mb:1}}>{section.title}</Typography>
                                    <Grid container spacing={1}>
                                        {cards}
                                    </Grid>
                            </Container>
                        case 'petType':
                            let petCards = [];
                            section.elements.forEach(element => {
                                petCards.push(
                                <Grid item xs={12/section.elements.length}>
                                    <Card sx={{ ':hover': {boxShadow: 20, cursor: 'pointer' }, maxWidth: 200 }}>
                                        <Link component={RouterLink}  to='../s' state={{ petType: element.link }} color='inherit' underline='hover'>
                                                <CardMedia
                                                component="img"
                                                height="194"
                                                image={element.imgsrc}
                                                alt={element.text}
                                                />
                                            <CardContent sx={{ textAlign:'center'}}><Typography sx={{textTransform: 'uppercase'}} color="text.primary" variant='body'>{element.text}</Typography></CardContent>
                                        </Link>
                                    </Card> 
                                </Grid>);
                            })
                            return <Container sx={{mt:2, mb:2}}>
                                <Typography color='text.primary' variant='h5' sx={{mb:1}}>{section.title}</Typography>
                                <Grid container spacing={1}>{petCards}</Grid>
                            </Container> 
                        case 'deals':
                            let dealCards = [];
                            //force get 5 deals
                            const numDeals = 5;
                            section.elements.slice(0, numDeals).forEach(element => {
                                dealCards.push(
                                <Grid item xs={12/section.elements.length}>
                                        <Card sx={{ ':hover': {boxShadow: 20, cursor: 'pointer' } }}>
                                            <Link component={RouterLink}  to='../s' state={{ dealId: element.link }} color='inherit' underline='hover'>
                                                <CardMedia
                                                    component="img"
                                                    height="194"
                                                    image={element.imgsrc}
                                                    alt={element.text}
                                                    />
                                            </Link>
                                        </Card>
                                </Grid>);
                            })
                            return <Container sx={{mt:2, mb:2}}>
                                <Typography color='text.primary' variant='h5' sx={{mb:1}}>{section.title}</Typography>
                                <Grid container spacing={1}>{dealCards}</Grid>
                            </Container>
                        case 'brandCards':
                            let brandCards = [];
                            //force get 5 deals
                            const numBrands = 2;
                            section.elements.slice(0, numBrands).forEach(element => {
                                brandCards.push(
                                <Grid item xs={12/section.elements.length}>
                                    <Paper>
                                        <Link component={RouterLink}  to='../s' state={{ dealId: element.link }} color='inherit' underline='hover'>
                                            <CardContent sx={{ textAlign:'center'}}>
                                                <Typography sx={{textTransform: 'uppercase'}} color="text.primary" variant='body'>{element.text}</Typography>
                                            </CardContent>
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={element.imgsrc}
                                                alt={element.text}
                                                />
                                            
                                        </Link>
                                    </Paper>
                                </Grid>);
                            })
                            return <Container sx={{mt:3, mb:2}}>
                                <Grid container spacing={1}>{brandCards}</Grid>
                            </Container>
                        default:
                            return <></>
                    }
                })}
        </Box>
        {/** Footer */}
        <Box sx={{ background: '#3f51b5' }} height={80}>
            <Container sx={{height:'100%', display: 'flex', alignItems: 'center'}}>
                <Container maxWidth='sm'><Typography color='white'>About</Typography></Container>
                <Container maxWidth='sm'><Typography color='white'>Investor Relations</Typography></Container>
                <Container maxWidth='sm'><Typography color='white'>Jobs</Typography></Container>
                <Container maxWidth='sm'><Typography color='white'>FAQs</Typography></Container>
                <Container maxWidth='sm'><Typography color='white'>Gift Guide</Typography></Container>
                <Container maxWidth='sm'><Typography color='white'>Gift cards</Typography></Container>
            </Container>
            <Box >
                <Box height={10}><Typography>About</Typography></Box>
                <Box height={10}><Typography>About</Typography></Box>
                <Container color='primary.main' height={100}><Typography align='center'>© Bittoo.com, Inc.</Typography></Container>
            </Box>
        </Box>
    </Box>
    );
};

export default Home;