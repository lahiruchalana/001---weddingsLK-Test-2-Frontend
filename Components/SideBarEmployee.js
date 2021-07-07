import styled from "styled-components";
import YourService from '@material-ui/icons/FormatListNumbered';
import WeddingPlan from '@material-ui/icons/Assignment';
import Settings from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DescriptionIcon from '@material-ui/icons/Description';

const SideBarEmployee = (props) => {
    return (
        <Container>
            <Content>
            <ImageBg src="/images/HomeGallery6.jpg"
                    ></ImageBg>
                <NavBar>
                    {/* Use Id to assign the couple name here  */}
                    <Logo>
                        <a href= '/'>
                            <img src= "../images/Logo.png"/> 
                        </a>
                    </Logo>
                    <Designation>Employee</Designation>
                    <Row>
                        <a href="/">
                            <HomeIcon></HomeIcon>
                            <BtnYourServices>Home</BtnYourServices>
                        </a>
                    </Row>
                    <Row>
                        <a href="/">
                            <WeddingPlan></WeddingPlan>
                            <BtnWeddingPlan>Tasks in Progress</BtnWeddingPlan> 
                        </a>
                    </Row>
                    <Row>
                        <a href="/">
                            <PlaylistAddIcon></PlaylistAddIcon>
                            <BtnCurrentVendors>Tasks Management</BtnCurrentVendors>
                        </a>
                    </Row>
                    <Row>
                        <a href="/">
                            <DescriptionIcon></DescriptionIcon>
                            <BtnMessanger>Budget Report</BtnMessanger>
                        </a>
                    </Row>
                    <RowLast>
                        <a href="/">
                            <Settings></Settings>
                            <BtnSettings>Settings</BtnSettings>
                        </a>
                    </RowLast>
                </NavBar>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    z-index: 20;
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: #0E1A06;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    min-width: 210px;
    min-height: 900px;
`;

const Content = styled.div`

`;

const NavBar = styled.div`
    z-index: 0;
    filter: brightness(100%);
`;

const ImageBg = styled.img`
        z-index: -10;
        width: 210px;
        height: 900px;
        object-fit: cover;
        filter: brightness(30%);

`;

const Logo = styled.div`
margin-top: -900px;
    a{
        img{
            max-width: 210px;
            opacity: 70%;
        }
    }
`;

const Row = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    a {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
        text-decoration: none;
        color: white;
    } 
`;

const Designation = styled.div`
    max-width: 210px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    background-color: #FFFFFF;
    color: #122322;
`;

const BtnYourServices = styled.div`
    margin-left: 10px;
`;

const BtnWeddingPlan = styled.div`
    margin-left: 10px;
`;

const BtnCurrentVendors = styled.div`
    margin-left: 10px;
`;


const BtnBugdetReport = styled.div`
    margin-left: 10px;
`;

const BtnMessanger = styled.div`
    margin-left: 10px;
`;


const BtnSettings = styled.div`
    margin-left: 10px;
`;

const RowLast = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    a {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
        text-decoration: none;
        color: white;
    } 
`;

    

export default SideBarEmployee;