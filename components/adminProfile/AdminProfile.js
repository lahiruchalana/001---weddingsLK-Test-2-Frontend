import styled from "styled-components";
import SideBarAdmin from "./SideBarAdmin";
import React from "react";
import Header from "../header/Header";


const AdminProfile = (props) => {
    return (
        <Container>
            <Header/>
            <SideBarAdmin/>
            <Content>



            {/* /////////////////// show user details /////////////////// */}
                {/* <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
            </div> */}



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


export default AdminProfile;