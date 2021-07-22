import React, {useContext, useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
// import PaypalButton from './PaypalButton'
import Button from '@material-ui/core/Button';
import Header from '../header/Header';
import Footer from '../footer/Footer';


import './ExportExample.css';
// import kendoka from './react-kendoka.png';
// import { Button } from '@progress/kendo-react-buttons';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
// import { useRef } from 'react';

function BudgetReport() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)






    const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);
  
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const handleExportWithFunction = (event) => {
    savePDF(contentArea.current, { paperSize: "A2" });
  }





    //////////////////get total of prices of [cart] //////////////////
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

     ////////////////// using this i can choose multiple quantity in one products /////////
    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }
    ///////////// remove vendors /////////////
    const removeProduct = id =>{
        if(window.confirm("Do you want to Remove this Vendor?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }
    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div className="app-content">
            <PDFExport ref={pdfExportComponent} paperSize="A2">
        <div ref={contentArea}>
        {/* <Header/> */}
        <Container>
            <Line></Line>
            <Title>WEDDINGSLK</Title>
            <Info>Budget Report of The Wedding</Info>
        <div >
            <Line></Line>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <div >
                            <Text1>{product.title} - {product.address_line_1}</Text1>
                            <Text3>{product.description}</Text3>

                            <Text2>Rs {product.price * product.quantity} - {product.max_price}</Text2>
                            {/* <h6>{product.content}</h6> */}
                            <Text4>Prices can be changed. this price is minimum price of the {product.title}</Text4>
                            <Text3>{product.contact_number_1} / {product.contact_number_2}</Text3>
                            
                        </div>
                    </div>
                ))
            }
          </div>  
          <div >
              <Text1>Summery of Cost</Text1>
              <Line></Line>
          {
                cart.map(product => (
                    <div  key={product._id}>
                        <div >
                            <Text2>Cost of {product.title} Services: Rs {product.price * product.quantity} - {product.max_price}</Text2>
                        </div>
                    </div>
                ))
            }
            <div className="total">
                <br></br>
                <Line></Line>
                <Text1>Total Cost: Rs {total}</Text1>
                <Line></Line>
                <Text2>Note: this is the minimum cost of your wedding services </Text2>
                <Text3>This cost definetly will be increased</Text3>
                <Line></Line>
                
                <Text3>Thank You for Your Interesting, WeddingsLK Provide You Many Services</Text3>
                <Text3>We are WeddingsLK, Stay With Us</Text3>
                <Text4>Kaluthara,</Text4>
                <Text4>Mathugama,</Text4>
                <Text4>Aluthgama Road,</Text4>
                <Text4>No 234/56 (Near Court)</Text4>
                <Text4>0769018490</Text4>
                <Line></Line>
                <br></br>
               
            </div>
        </div>
        </Container>
        </div>
        <br></br>
      <br></br>
      <br></br>
      <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
      </PDFExport>
     
               
      <div className="button-area" >
            <Button  primary={true} onClick={handleExportWithComponent}>Download The Budget Report</Button>
            <Button onClick={handleExportWithFunction}>Export File</Button>
          </div>
          <br></br>
                <br></br>
                <br></br>
        </div>
    )
};


const Container = styled.div`
    margin-right: 50px;
    margin-left: 50px;
    div {
        display: flex;
        flex-direction: column;
    }
`;
const Line = styled.div`
    padding: 5px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    width: 500px;
`;

const Info = styled.div`
    margin: 10px;
    font-weight: 500;
`;

const Title = styled.div`
    margin: 10px;
    font-weight: 700;
`;

const Text1 = styled.div`
    margin: 5px;
    font-size: 25px;
    font-weight: 700;
    /* border-radius: 1px;
    border-color: white;
     */

`;
const Text2 = styled.div`
    margin: 5px;
    font-size: 20px;
`;
const Text3 = styled.div`
    margin: 5px;
    font-size: 15px;
`;

const Text4 = styled.div`
    margin: 5px;
    font-size: 10px;
`;

export default BudgetReport
