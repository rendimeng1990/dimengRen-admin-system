import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicList from '../../../components/sandbox/Home';
import RecipeReviewCard from '../../../components/sandbox/Card'
import Divider from '@mui/material/Divider'
import axios from 'axios';
import BasicModal from '../../../components/sandbox/Modal';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '686px'
}));

export default function Home() {
    const [viewList, setviewList] = useState([])
    const [starList, setstarList] = useState([])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc').then(res => {
            // console.log(res.data);
            setviewList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc').then(res => {
            // console.log(res.data);
            setstarList(res.data)
        })
    }, [])


    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={4} sx={{ height: '687px' }}>
                        <Item >
                            <BasicList viewList={viewList} />
                            <Divider variant="inset" component="li" />
                            <BasicModal viewList={viewList} />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <BasicList starList={starList} />
                            <Divider variant="inset" component="li" />
                            <BasicModal starList={starList} />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <RecipeReviewCard />
                        </Item>
                    </Grid>

                </Grid>
            </Box>


        </div>


    );
}