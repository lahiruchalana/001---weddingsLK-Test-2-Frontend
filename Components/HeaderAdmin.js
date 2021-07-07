
import styled from "styled-components";
import NotificationsIcon from '@material-ui/icons/Notifications';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const HeaderAdmin = (props) => {
    return (
        <Container>
            <Content>
                <Nav>
                    <HeaderLeft>
                        <a href="/">
                            <NotificationsIcon></NotificationsIcon>
                        </a>
                        <a href="/">
                            <QuestionAnswerIcon></QuestionAnswerIcon>
                        </a>
                    </HeaderLeft>
                    <HeaderRight>
                        <HeaderAdminSearch>
                            <a href= '/admin/search/results'>
                                <input className= "header__adminSearchInput" type= "text"/>
                            </a>
                    </HeaderAdminSearch>
                    <Search>
                        <a href="/">
                        <SearchIcon></SearchIcon>
                        </a>
                    </Search>
                    <Name>Admin - Lahiru</Name>
                    <ProfileIcon>
                        <a href="/admin/profile">
                            <AccountCircleIcon></AccountCircleIcon>
                        </a>
                    </ProfileIcon>
                    </HeaderRight>
                </Nav>
                <TitleBar>
                    <Title>Home</Title>
                </TitleBar>
            </Content>
        </Container>
    );
};

const Container = styled.nav`
    
`;

const Content = styled.nav`
    display: flex;
    flex-direction: column;
`;

const Nav = styled.nav`
    position: fixed;
    top: o;
    left: 0;
    right: 0;
    height: 48px;
    background-color: #474545;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    letter-spacing: 2px;
    z-index: 4;
`;

const HeaderLeft = styled.nav`
   margin-left: 220px;
   a {
       color: white;
       margin-left: 10px;
   }
`;

const HeaderRight = styled.nav`
   margin-right: 20px;
   display: flex;
`;

const HeaderAdminSearch = styled.nav`
   opacity: 80%;
`;

const Search = styled.nav`
   margin-top: -1px;
   margin-left: 10px;
   a {
    color: white;
   }
`;

const Name = styled.nav`
    margin-left: 10px;
    margin-top: 4px;
`;

const ProfileIcon = styled.nav`
    margin-left: 10px;
    a {
        color: white;
    }
`;

const TitleBar = styled.nav`
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    height: 52px;
    background-color: #181616;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    letter-spacing: 2px;
    z-index: 4;
`;

const Title = styled.nav`
    margin-left: 220px;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    font-weight: 700;
`;


export default HeaderAdmin;
