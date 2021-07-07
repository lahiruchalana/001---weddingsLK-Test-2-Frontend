import styled from "styled-components";
import Header from "./Header.js"
import Footer from './Footer.js'

const UserProfile = (props) => {
    return (
        <Container>
            <Content>

                <Bg></Bg> 

            </Content>
        </Container>   
    );
};

const Container = styled.div`

`;

const Content = styled.div`

`;

const Bg = styled.div`
    min-height: 1500px;
    width: 100%;
    background-color: #E0D6DC;
`;


export default UserProfile;