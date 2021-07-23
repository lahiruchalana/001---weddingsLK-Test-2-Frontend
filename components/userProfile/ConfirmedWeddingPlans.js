import React, {useContext, useState, useEffect} from 'react'
import styled from "styled-components";
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
// import PaypalButton from '../../userProfile/PaypalButton'
import Button from '@material-ui/core/Button';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SideBarUser from './SideBarUser';

function ConfirmedWeddingPlans() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [confirmed_wedding_plans, setConfirmedWeddingPlans] = state.userAPI.confirmed_wedding_plans
    const [token] = state.token
    const [total, setTotal] = useState(0)

    //////////////////get total of prices of [cart] //////////////////
    // useEffect(() =>{
    //     const getTotal = () =>{
    //         const total = confirmed_vendors.reduce((prev, item) => {
    //             return prev + (item.price * item.quantity)
    //         },0)

    //         setTotal(total)
    //     }

    //     getTotal()

    // },[cart])

    const addToConfirmedWeddingPlans = async (confirmed_wedding_plans) =>{
        await axios.patch('/user/addconfirmed_wedding_plans', {confirmed_wedding_plans}, {
            headers: {Authorization: token}
        })
    }

     ////////////////// using this i can choose multiple quantity in one products /////////
    // const increment = (id) =>{
    //     cart.forEach(item => {
    //         if(item._id === id){
    //             item.quantity += 1
    //         }
    //     })

    //     setCart([...cart])
    //     addToCart(cart)
    // }

    // const decrement = (id) =>{
    //     cart.forEach(item => {
    //         if(item._id === id){
    //             item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
    //         }
    //     })

    //     setCart([...cart])
    //     addToCart(cart)
    // }
    ///////////// remove vendors /////////////
    const removeWeddingPlan = id =>{
        if(window.confirm("Do you want to Remove this Wedding Plan?")){
            confirmed_wedding_plans.forEach((item, index) => {
                if(item._id === id){
                    confirmed_wedding_plans.splice(index, 1)
                }
            })

            setConfirmedWeddingPlans([...confirmed_wedding_plans])
            addToConfirmedWeddingPlans(confirmed_wedding_plans)
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


    if(confirmed_wedding_plans.length === 0) 
        return (<Content>
            <Header/>
            <SideBarUser/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <h2 style={{marginLeft: "250px", textAlign: "center", fontSize: "40px"}}>There is no any Confirmed Wedding Plans</h2>
        </Content>);

    return (
        <div>
        <Header/>
        <SideBarUser/>
        <Container>
        <div >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Text1>This is your Confirmed Wedding Plans</Text1>
            {
                confirmed_wedding_plans.map(weddingPlan => (
                    <div key={weddingPlan._id}>
                        <Product_card>

                            <h2 title={weddingPlan.title}>{weddingPlan.title}</h2>
            
                            <img src={weddingPlan.images_1.url} alt="" />

                            

                            <Box>
                                <Product_box>
                                    <h2 title={weddingPlan.vendor_1}>{weddingPlan.vendor_1}</h2>
                                    <h5>Service: {weddingPlan.category_1}</h5>
                                    <span>Rs {weddingPlan.price_1} - Rs {weddingPlan.max_price_1}</span>
                                    <p>{weddingPlan.description_1}</p>
                                    {/* <h5>No: {weddingPlan.contact_number_1}</h5> */}
                                    <h5>Address: {weddingPlan.address_1}</h5>
                                </Product_box>
                                <Product_box>
                                    <h2 title={weddingPlan.vendor_2}>{weddingPlan.vendor_2}</h2>
                                    <h5>Service: {weddingPlan.category_2}</h5>
                                    <span>Rs {weddingPlan.price_2} - Rs {weddingPlan.max_price_2}</span>
                                    <p>{weddingPlan.description_2}</p>
                                    {/* <h5>No: {weddingPlan.contact_number_1}</h5> */}
                                    <h5>Address: {weddingPlan.address_2}</h5>
                                </Product_box>
                                { weddingPlan.vendor_3 == '' ? '' :
                                    <Product_box>
                                        <h2 title={weddingPlan.vendor_3}>{weddingPlan.vendor_3}</h2>
                                        <h5>Service: {weddingPlan.category_3}</h5>
                                        <span>Rs {weddingPlan.price_3} - Rs {weddingPlan.max_price_3}</span>
                                        <p>{weddingPlan.description_3}</p>
                                        {/* <h5>No: {weddingPlan.contact_number_1}</h5> */}
                                        <h5>Address: {weddingPlan.address_3}</h5>
                                    </Product_box>
                                }
                            </Box>
                            <Delete 
                            onClick={() => removeWeddingPlan(weddingPlan._id)}>
                                <Button variant="contained" color="inherit" >
                                Remove Confirmed Wedding Plan
                                </Button>
                            </Delete>
                            <br/>
                            <h5>Prices can be changed. this price is minimum price of the {weddingPlan.title}</h5>
                        </Product_card>
                    </div>
                ))
            }
        </div>
        </Container>
        <Footer/>
        </div>
    )
};

const Product_card = styled.div`

  width: 1000px;
  overflow: hidden;
  height: 580px;
  padding: 15px;
  box-shadow: 0 0 15px #03045e;
  margin: 10px 100px;
  position: relative;


  img {
  width: 100%;
  height: 300px;
  display: block;
  object-fit: cover;
  }

  h2 {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-transform: capitalize;
  cursor: pointer;
  color: #323232;
  }
  
  span {
  color: crimson;
  }
`;

const Box = styled.div`
    display: flex;
    flex-direction: row;
`;
 
const Product_box = styled.div`
    margin: 5px 5px;
`;


const Text1 = styled.div`
    margin: 5px;
    font-size: 22px;
    font-weight: 700;
    color: darkblue;
`;
const Text2 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkgreen;
`;
const Text3 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkred;
`;
const Text4 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkviolet;
`;
const Text5 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkcyan;
    text-align: center;
`;
const Text6 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkslategray;
    text-align: center;
`;
const Line1 = styled.div`
    padding: 2px;
    margin: 5px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    background-color: black;
`;
const Line2 = styled.div`
    padding: 2px;
    margin: 5px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    background-color: black;
`;
const Line3 = styled.div`
    padding: 2px;
    margin: 5px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    background-color: black;
`;
const Line4 = styled.div`
    padding: 2px;
    margin: 5px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    background-color: black;
`;
const LineLite1 = styled.div`
    padding: 2px;
    margin: 10px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    background-color: darkgrey;
`;

const Container = styled.div`
    margin-right: 50px;
    margin-left: 250px;
`;

const Content = styled.div`
    
`;

const Delete = styled.div`
    position: absolute;
    top:0;
    right: 5px;
    color: white;
    font-weight: 900;
    cursor: pointer;
    
`;

export default ConfirmedWeddingPlans
