import React, { useState, useEffect } from 'react';

import styled from "styled-components";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Button } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import useStyles from './HeaderStyles';
/// aos fade in up out ////
import Aos from "aos";
import 'aos/dist/aos.css';

// hover sets
import "./css/hover-min.css";


const Header = () => {

    const imagesList = [
        'url("https://image.freepik.com/free-photo/groom-putting-ring-bride-s-finger_1157-338.jpg")',
        'url("https://image.freepik.com/free-photo/groom-bride-together-are-holding-wedding-pink-bouquet_8353-9794.jpg")',
        'url("https://image.freepik.com/free-photo/groom-black-tuxedo-hugs-tender-stunning-bride-while-they-stand_8353-8050.jpg")',
        'url("https://image.freepik.com/free-photo/young-beautiful-stylish-woman-wedding-dress_285396-7822.jpg")',
        'url("https://image.freepik.com/free-photo/valentines-day-marry-me-wedding-engagement-ring-box-with-red-rose-gift_114579-402.jpg")'
    ];

    useEffect(() => {
        Aos.init({ duration: 2500 });
    }, []);

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    const logout = () => {
        // dispatch({ type: actionType.LOGOUT });
        dispatch({ type: "LOGOUT" });

        history.push('/');

        setUser(null);
    };

    return (
        <Content>
            <Nav>
                <HeaderLogo>
                    <a href='/'>
                        <img data-aos="fade up" src="../images/Logo.png" />
                    </a>
                </HeaderLogo>
                <HeaderNav>
                    {/* TODO -- make drop down here */}
                    <a href='/weddingplans'>
                        <span data-aos="fade up">WEDDING PLANS</span>
                    </a>
                    <a href='/services'>
                        <span data-aos="fade up">SERVICES</span>
                    </a>
                    <a href='/vendors'>
                        <span data-aos="fade up">VENDORS</span>
                    </a>
                    <a href='/shops'>
                        <span data-aos="fade up">SHOPS</span>
                    </a>
                    <a href='/Galleries'>
                        <span data-aos="fade up">GALLERIES</span>
                    </a>
                    <a href='/about'>
                        <span data-aos="fade up">ABOUT</span>
                    </a>
                    <a href='/weddingwebsites'>
                        <span data-aos="fade up">WEDDING WEBSITES</span>
                    </a>
                    <a href='/weddinginvitationcards'>
                        <span data-aos="fade up">INVITATION CARDS</span>
                    </a>
                </HeaderNav>
                {/* <HeaderSearch>
                <a href='/search/results'>
                    <input className="header__searchInput" type="text" />
                </a>
            </HeaderSearch>
            <Search>
                <a href="/search/reasults">
                    <SearchIcon></SearchIcon>
                </a>
            </Search> */}


                <ToolBar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <a href='/user/profile'>
                                <Typography data-aos="fade-right" className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            </a>
                            <a href='/user/profile'>
                                <Avatar data-aos="fade" className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl} />
                            </a>
                            <ButtonlogOut data-aos="fade" variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</ButtonlogOut>
                        </div>
                    ) : (
                        // <Button component={Link} to="/user/auth" variant="contained" color="primary">Sign In</Button>
                        <HeaderNavIcon>
                            <a href='/user/auth'>
                                <span>LogIn</span>
                            </a>
                            {/* <a href='/user/auth'>
                            <span>SignUp</span>
                        </a> */}
                        </HeaderNavIcon>
                    )}
                </ToolBar>



                {/* Previous Toolbar START */}


                {/* <ToolBar className={classes.toolbar}>
                {user ? (
                    <Profile className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <a href='/user/logout'>
                            <span>Logout</span>
                        </a>
                    </Profile>
                ) : (
                    <HeaderNavIcon>
                        <a href='/user/auth'>
                            <span>LogIn</span>
                        </a>
                        <a href='/user/auth'>
                            <span>SignUp</span>
                        </a>
                    </HeaderNavIcon>
                )}
            </ToolBar> */}


                {/* Previous Toolbar END */}


            </Nav>
            <CommunityButton>
                <Button data-aos="fade-left" size="large" variant="contained" color="white" href="/communityfeedbacks">
                    Join with Community
                </Button>
            </CommunityButton>
            <Messanger data-aos="fade-up">
                <a href="/communityfeedbacks" class='button hvr-grow-shadow' >
                    <WhatsAppIcon href="/communityfeedbacks" fontSize="large" data-aos="fade-up" ></WhatsAppIcon>
                </a>
            </Messanger>
        </Content>
    );
};
const Content = styled.nav`
    
`;


const Nav = styled.nav`
    position: fixed;
    top: o;
    left: 0;
    right: 0;
    height: 70px;
    width: 100%;
    /* background-color: #230723; */
    background-color: rgba(0,0,0,.92);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    letter-spacing: 2px;
    z-index: 3;
`;

// const Search = styled.div`
//     z-index: 5;
//     margin-top: 5px;
//     a {
//             color: #7E7272;

//         }
// `;


const ToolBar = styled.div`
    div {
        a {
            text-decoration: none;
            color: white;
        }
    }
`;
const ButtonlogOut = styled.button`
 background-color: #FFF;
 margin-right: 5px;
 color: #230723;
 border-radius: 5px;
 border-color: #A0A0A0;
 font-size: 10px;
`;



// const Profile = styled.div`
//     align-items: center;
//     display: flex;
//     flex-flow: row nowrap;
//     height: 100%;
//     justify-content: flex-end;
//     margin: 0;
//     padding: 0;
//     position: relative;
//     margin-right: auto;
//     margin-left: 0px;

//     a {
//         color: white;
//     text-decoration: none;
//     font-size: 10px;
//     margin: 3px;
//     border: 1px solid white;
//     border-radius: 5px;
//     padding: 5px;
//     }

//     @media (max-width: 768px) {
//         display: none;
//     }
// `;

const Typography = styled.div`
    margin-top: 7px;
    margin-left: 50px;
    /* color: white;
    text-decoration: none;
    font-size: 10px;
    margin: 3px;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px; */


`;

const Avatar = styled.img`

    width: 30px;
    height: auto; 
    clip-path: circle();
    margin-right: 0px;


 @media (max-width: 768px) {
        display: none;
}

`;

// const Logout = styled.div`

//     color: white;
//     text-decoration: none;
//     font-size: 10px;
//     margin: 3px;
//     border: 1px solid white;
//     border-radius: 5px;
//     padding: 5px;
// `;


const HeaderNavIcon = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    position: relative;
    margin-right: 10px;
    margin-left: 0px;
    

    a {
        color: 230723;
    text-decoration: none;
    font-size: 10px;
    margin: 3px;
    border: 1px solid white;
    border-radius: 3px;
    padding: 5px;
    margin-left: 10px;
    background-color: #FFF;
    span {
        color: #230723;
    }
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

// const LogIn = styled.div`

//     color: white;
//     text-decoration: none;
//     font-size: 10px;
//     margin: 3px;
//     border: 1px solid white;
//     border-radius: 5px;
//     padding: 5px;
// `;

// const SignUp = styled.div`

//     color: white;
//     text-decoration: none;
//     font-size: 10px;
//     margin: 3px;
//     border: 1px solid white;
//     border-radius: 5px;
//     padding: 5px;


// `;

// const HeaderSearch = styled.div`
//     a {
//         input {
//             background-color: rgba(88, 83, 83, 0.986);
//             color: gray;
//             border-radius: 5px;
//         }

//     }

//     @media (max-width: 768px) {
//         display: none;
//     }
// `;


//  a {
//     color: white;
//     text-decoration: none;
//   }

const HeaderLogo = styled.div`
    a {
        img{
        background-color: aliceblue;
        padding-top: 5px;
        width: 180px;
        max-height: 80px;
        font-size: 0;
        display: inline-block;
        }
    }
`;

const HeaderNav = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    position: relative;
    margin-right: auto;
    margin-left: 20px;

  
    a {
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        padding: 0 12px;

  
        span {
            color: white;
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

  
            &:before {
                background-color: white;
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0px;
                opacity: 0;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;
            }
        }  

        &:hover {
            span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
            z-index: 5;
            }
        } 
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const CommunityButton = styled.div`
    position: fixed;
    right: 0;
    top: 550px;
    z-index: 3;
`;

const Messanger = styled.div`
    position: fixed;
    right: 30px;
    top: 610px;
    z-index: 3;
    text-decoration: none;
    background-color: white;
    padding: 10px;
    clip-path: circle();

    a {
        right: 30px;
        text-decoration: none;
        color: green;
    }
`;



export default Header;
