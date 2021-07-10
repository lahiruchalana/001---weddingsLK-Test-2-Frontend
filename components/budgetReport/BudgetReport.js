import React, {useContext, useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
// import PaypalButton from './PaypalButton'
// import Button from '@material-ui/core/Button';
import Header from '../header/Header';
import Footer from '../footer/Footer';


import './ExportExample.css';
// import kendoka from './react-kendoka.png';
import { Button } from '@progress/kendo-react-buttons';
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
    savePDF(contentArea.current, { paperSize: "A4" });
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
     /////////////////// about payment /////////////////
    // const tranSuccess = async(payment) => {
    //     const {paymentID, address} = payment;

    //     await axios.post('/api/payment', {cart, paymentID, address}, {
    //         headers: {Authorization: token}
    //     })

    //     setCart([])
    //     addToCart([])
    //     alert("You have successfully placed an order.")
    // }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div className="app-content">
            <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div ref={contentArea}>
        {/* <Header/> */}
        <Container>
            <Title>WEDDINGSLK</Title>
            <Info>Budget Report of The Wedding</Info>
        <div >
            <br></br>

            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        {/* <img src={product.images.url} alt="" /> */}

                        <div >
                            <Text1>{product.title}</Text1>

                            
                            <Text3>{product.description}</Text3>

                            <Text2>Rs {product.price * product.quantity}</Text2>
                            {/* <h6>{product.content}</h6> */}
                            <Text3>Prices can be changed. this price is minimum price of the {product.title}</Text3>

                            {/* <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div> */}
                            
                            {/* <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                <Button variant="contained" color="secondary">
                                Remove Vendor
                                </Button>
                            </div> */}
                        </div>
                    </div>
                ))
            }
          </div>  
          <div >
          {
                cart.map(product => (
                    <div  key={product._id}>
                        <div >
                            <Text2>Cost of {product.title} Vendor Services: Rs {product.price * product.quantity}</Text2>
                        </div>
                    </div>
                ))
            }
            <div className="total">
                <br></br>
                <Text1>Total Cost: Rs {total}</Text1>
                
                <Text2>Note: this is the minimum cost of your wedding services </Text2>
                <Text3>This cost definetly will be increased</Text3>
                <br></br>
                {/* <PaypalButton
                total={total}
                tranSuccess={tranSuccess} /> */}

            </div>
        </div>
        </Container>
        {/* <Footer/> */}


        </div>
      </PDFExport>
      <br></br>
      <br></br>
      <br></br>
      <div className="button-area">
            <Button primary={true} onClick={handleExportWithComponent}>Export with Component</Button>
            <Button onClick={handleExportWithFunction}>Export with Method</Button>
          </div>
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


export default BudgetReport
