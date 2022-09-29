import React from 'react'
import style from './index.module.css'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import LoginIcon from '@mui/icons-material/Login';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import lili from './lili.jpg'
import dimeng from './dimeng.png'


export default function TeamPage() {
    const naigate = useNavigate()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // console.log(newValue);
        setValue(newValue);
    };
    return (
        <div>
            <div className={style.fatherbox}>
                <div className={style.shortcut}>
                    <div>
                        <div className={style.fl}> <a href="/News"> ImpactNews</a> </div>
                        <div className={style.fr}>
                            <a className='login' href="/Login" >  <Button variant="contained" style={{ textTransform: 'none' }} color="primary" startIcon={<LoginIcon />}> Log In</Button></a>
                            <a className='login' href="/Register" >  <Button variant="contained" style={{ textTransform: 'none' }} color="info">Register</Button></a>
                        </div>
                    </div>
                </div>
                <div className={style.topbox}>The power of teamwork
                    <h3>Get to know our talented developers</h3></div>
                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Developers" sx={{ marginTop: 9, mx: 7 }} />
                        <Tab label="Team Leader" sx={{ marginTop: 9, mx: 7 }} />
                        <Tab label="Web Designer" sx={{ marginTop: 9, mx: 7 }} />
                    </Tabs>
                </Box>
                <div >

                    {
                        value === 0 && <Box className={style.paperbox}>
                            < Paper elevation={16} className={style.paper} children={'DMR'} >
                                <div >
                                    <Avatar alt="Remy Sharp" src={dimeng} sx={{ width: 88, height: 88, marginLeft: 10, marginTop: 2 }} />
                                </div>


                                <h4>
                                    Thomas Ren
                                </h4>
                                <p>  Highly motivated and adaptable Front end Engineer who has the ability to learn fast and tailor solutions specific to the requirements of the individual project.
                                    He is eager to contribute to team success through hard work, attention to detail and excellent organizational skills.
                                </p>

                                <a href="https://www.linkedin.com/in/thomas-ren-0723b5251/">< LinkedInIcon /></a>


                            </Paper>
                            < Paper elevation={16} className={style.paper} children={'LLY'} >
                                <div >
                                    <Avatar alt="Remy Sharp" src={lili} sx={{ width: 88, height: 88, marginLeft: 10, marginTop: 2 }} />
                                </div>


                                <h4>
                                    Lili Yao
                                </h4>
                                <p> Certified full stack web developer, dedicated and efficient with 6+ months experience in application layers,presentation layers and databases.Certified in AWS Certified Cloud Practitioner.
                                    She used to be a content marketer with one year of experience in SEO and content strategy.
                                </p>
                                <a href="https://www.linkedin.com/in/lili-yao-3377101b5/">< LinkedInIcon /></a>

                            </Paper >

                        </Box>
                    }
                    {
                        value === 1 && <Box className={style.paperbox}>
                            < Paper elevation={16} className={style.paper} children={'DMR'} >
                                <div >
                                    <Avatar alt="Remy Sharp" src={dimeng} sx={{ width: 88, height: 88, marginLeft: 10, marginTop: 2 }} />
                                </div>


                                <h4>
                                    Thomas Ren
                                </h4>
                                <p> Highly motivated and adaptable Front end Engineer who has the ability to learn fast and tailor solutions specific to the requirements of the individual project.
                                    He is eager to contribute to team success through hard work, attention to detail and excellent organizational skills.
                                </p>

                                <a href="https://www.linkedin.com/in/thomas-ren-0723b5251/">< LinkedInIcon /></a>


                            </Paper>
                        </Box>
                    }
                    {
                        value === 2 && <Box className={style.paperbox}>
                            < Paper elevation={16} className={style.paper} children={'LLY'} >
                                <div >
                                    <Avatar alt="Remy Sharp" src={lili} sx={{ width: 88, height: 88, marginLeft: 10, marginTop: 2 }} />
                                </div>


                                <h4>
                                    Lili Yao
                                </h4>
                                <p> Certified full stack web developer, dedicated and efficient with 6+ months experience in application layers,presentation layers and databases.Certified in AWS Certified Cloud Practitioner.
                                    She used to be a content marketer with one year of experience in SEO and content strategy.
                                </p>


                                <a href="https://www.linkedin.com/in/lili-yao-3377101b5/">< LinkedInIcon /></a>

                            </Paper >
                        </Box>
                    }


                </div>
            </div>
            <footer className={style.footer}>
                <div className={style.w}>
                    <div className={style.service}>
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
                <div className={style.copyright}>
                    <span >Terms of Use</span>
                    <span >|</span>
                    <span >Privacy</span>
                    <span >|</span>
                    <span > @2022AdminSystem</span>

                </div>
            </footer>
        </div >
    )
}
