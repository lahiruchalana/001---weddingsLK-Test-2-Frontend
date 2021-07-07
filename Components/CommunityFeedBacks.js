// import styled from "styled-components";

// const CommunityFeedBacks = (props) => {
//     return (
//         <h1>hello weddingslk</h1>
//     );
// };


// export default CommunityFeedBacks;

import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../Actions/Feedbacks';
import Posts from './FeedBacks/FeedBacks';
import Form from './FeedBackForm/FeedBackForm';
import Header from "./Header.js"
import Footer from './Footer.js'

import AnimatedBg from "react-animated-bg";
import AnimatedImages from "react-animated-bg";

import Aos from "aos";
import 'aos/dist/aos.css';

// hover sets
import "./css/hover-min.css";


const Home = () => {

  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);


  const imagesList = [
    'url("https://image.freepik.com/free-photo/groom-putting-ring-bride-s-finger_1157-338.jpg")',
    'url("https://image.freepik.com/free-photo/groom-bride-together-are-holding-wedding-pink-bouquet_8353-9794.jpg")',
    'url("https://image.freepik.com/free-photo/groom-black-tuxedo-hugs-tender-stunning-bride-while-they-stand_8353-8050.jpg")',
    'url("https://image.freepik.com/free-photo/young-beautiful-stylish-woman-wedding-dress_285396-7822.jpg")',
    'url("https://image.freepik.com/free-photo/valentines-day-marry-me-wedding-engagement-ring-box-with-red-rose-gift_114579-402.jpg")'
  ];


  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container data-aos="fade">
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>

      </Container>
    </Grow>
  );
};

export default Home;