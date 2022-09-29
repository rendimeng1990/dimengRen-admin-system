import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';


const mainFeaturedPost = {
    title: 'Explore what the world is reading & watching',
    description:
        "To read and to understand what you are reading and be part of the wonderful stories with just a simple click.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Featured videos and pictures ',
        description:
            'Editors pick',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        title: 'Most read and more comments',
        description:
            'Readers choose',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
];


const theme = createTheme();

export default function Blog() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                </main>
            </Container>

        </ThemeProvider>
    );
}