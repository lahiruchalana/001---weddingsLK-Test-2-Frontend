import styled from "styled-components";
import SideBarEmployee from "./SideBarEmployee";
import React from "react";
import Header from "../header/Header";


const EmployeeProfile = (props) => {
    return (
        <Container>
            <Content>
                <Header/>
                <SideBarEmployee/>
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
    background-color: #FFF;
`;


export default EmployeeProfile;