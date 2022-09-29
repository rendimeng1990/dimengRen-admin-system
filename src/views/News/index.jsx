import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import LoginIcon from '@mui/icons-material/Login';
import PublicIcon from '@mui/icons-material/Public';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ComputerIcon from '@mui/icons-material/Computer';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import Carousel from '../Swiper';
import Blog from './Blog/Blog';
// import MainFeaturedPost from './Blog/MainFeaturePost';

import Pic1 from './coffee.jpg'

// Rearrange date value to get the order you want... also replace / with a cooler separator like ⋅
function CurrentDate() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    return (
        <div className="App">
            <h2>{date}</h2>
        </div>
    );
}

export default function News() {
    const naigate = useNavigate()
    return (
        <div className='fatherbox'>
            <div className='topbox'>
                <div className='shortcut'>
                    <div className="fl"><a href="/News" style={{ color: 'black' }}>SUBSCRIBE ❤️</a> </div>
                    {/*  current date */}
                    <div className='fc'><CurrentDate /></div>
                    <div className="fr">
                        <a className='login' href="/Login" >  <Button variant="contained" style={{ textTransform: 'none' }} color="primary" startIcon={<LoginIcon />}> Log In</Button></a>
                        <a className='login' href="/Register" >  <Button variant="contained" style={{ textTransform: 'none' }} color="info">Register</Button></a>
                    </div>
                </div>
                <div className='w'>
                    <div className='main' >
                        <div className='headline'>
                            <h2>Breaking News Headlines</h2>
                            <div className="inputbox" > <Input placeholder="Search..." prefix={<SearchOutlined />} />
                            </div>

                        </div>

                        <div className='searchbox'>
                            <Carousel />
                        </div>
                    </div>
                </div>

            </div>
            <div className='w'>
                <div className="nav">
                    <div className='category'>
                        <ul>
                            <li> <PublicIcon />National</li>
                            <li> <BusinessCenterIcon />Business</li>
                            <li> <InsertEmoticonIcon />Entertainment</li>
                            <li> <ComputerIcon /> Technology</li>
                            <li> <SportsHandballIcon />Sports</li>
                        </ul>
                    </div>
                    {/* display area */}
                    <div className='editorpick1'>
                        {/* <h4>Editor's Picks </h4> */}
                        <Blog />
                    </div>
                </div>
            </div>
            <footer className='footer'>
                <div className='w'>
                    <div className="service">
                        <dl>
                            <dt>Regins</dt>
                            <dd>Africa</dd>
                            <dd>Americas</dd>
                            <dd>Europe</dd>
                            <dd>Asia</dd>
                            <dd>Oceanian</dd>
                            <dd>Global</dd>
                        </dl>
                        <dl>
                            <dt>News</dt>
                            <dd>Life and Finance</dd>
                            <dd>Current Event</dd>
                            <dd>Sports</dd>
                            <dd>Science and Technology</dd>
                            <dd>Economy</dd>
                            <dd>Milotary</dd>
                        </dl>
                        <dl>
                            <dt>Help & Support</dt>
                            <dd>
                                <a href=""> Contact Us</a>
                            </dd>
                            <dd>FAQ</dd>
                            <dd>General Feedback</dd>
                            <dd>Advertise With Us</dd>

                        </dl>



                        <dl>
                            <dt>About Us</dt>
                            <dl><a href='/TeamPage'>Our Team</a></dl>
                        </dl>
                    </div>
                </div>
                <div className="copyright">
                    <span >Terms of Use</span>
                    <span >|</span>
                    <span >Privacy</span>
                    <span >|</span>
                    <span > @2022AdminSystem</span>

                </div>
            </footer>
        </div>
    )
}
