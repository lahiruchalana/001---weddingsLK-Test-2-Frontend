import React, { useState } from 'react';
import styled from "styled-components";

//////////////  i changed this code start //////////////////
// import { useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
//////////////  i changed this code end //////////////////


import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import Icon from './UserAuthIcon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './UserAuthInput';
import useStyles from './UserAuthStyles';
import { AUTH } from '../Constants/ActionTypes';
import { signin, signup } from '../Actions/UserAuth';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };



const UserAuth = () => {
    //////////////  i changed this code start //////////////////
    const dispatch = useDispatch();
    //////////////  i changed this code end //////////////////

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();
    const [form, setForm] = useState(initialState);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
          dispatch(signup(form, history));
        } else {
          dispatch(signin(form, history));
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };


    //////////////  i changed this code start //////////////////

    const googleSuccess = async (res) => {

        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };


    //////////////  i changed this code end //////////////////

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');


    return (
        <AllContainer>
            <Content>
                {/* ////////////////////////// Start of common page top section //////////////////// */}


                <BgImageHome src="/images/HomeGallery1.jpg" />

                <BgColoredSection1></BgColoredSection1>

                <AuthSection>
                    <Container component="main" maxWidth="xs">
                        <Paper className={classes.paper} elevation={3}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {isSignup && (
                                        <>
                                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                        </>
                                    )}
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                                </Grid>
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    {isSignup ? 'Sign Up' : 'Sign In'}
                                </Button>

                                {/* Have to Add Google Auth Here*/}

                                <GoogleLogin
                                    clientId="896072720575-he5hm44hbhrrun8bd1fo2r2mbav86n2q.apps.googleusercontent.com"
                                    render={(renderProps) => (
                                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                            Google Sign In
                                        </Button>
                                    )}
                                    onSuccess={googleSuccess}
                                    onFailure={googleError}
                                    cookiePolicy="single_host_origin"
                                />


                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button onClick={switchMode}>
                                            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Container>
                </AuthSection>


            </Content>
        </AllContainer>
    );
};

const AllContainer = styled.div`
    a {
        text-decoration: none;
        color: white;
    }
`;

const Content = styled.div`
 
`;

const BgImageHome = styled.img`
    height: 850px;
    width: 100%;
    z-index: -100;
    position: relative;
    /* mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 2), rgba(0, 0, 0, 2)); */

`;



const BgColoredSection1 = styled.div`
    margin-top: -340px;
    opacity: 80%;
    z-index: -5;
    position: relative;
    background-color: #07464D;
    height: 500px;
    width: 100%;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;


const AuthSection = styled.div`
    margin-top: -950px;
    margin-bottom: 300px;
`;

export default UserAuth;