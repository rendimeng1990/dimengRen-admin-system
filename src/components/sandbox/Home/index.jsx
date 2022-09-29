import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { NavLink } from 'react-router-dom';



export default function BasicList(props) {
    // console.log(props);

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>

                            </ListItemIcon>
                            <ListItemText primary={props.viewList ? "Most View" : "Most Star"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    props.viewList && props.viewList.map((value) => (
                        <ListItem
                            key={value.id}

                            secondaryAction={
                                <IconButton aria-label="comment">
                                    <CommentIcon />
                                </IconButton>
                            }
                        >
                            <NavLink to={`/NewsSandBox/NewsManage/NewsPreview/${value.id}`}><ListItemText primary={` ${value.title}`} /></NavLink>
                        </ListItem>
                    ))}
                {
                    props.starList && props.starList.map((value) => (
                        <ListItem
                            key={value.id}
                            secondaryAction={
                                <IconButton aria-label="comment">
                                    <CommentIcon />
                                </IconButton>
                            }
                            onClick={() => {
                                // console.log(value);

                            }}
                        >
                            <NavLink to={`/NewsSandBox/NewsManage/NewsPreview/${value.id}`}><ListItemText primary={` ${value.title}`} /></NavLink>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}
