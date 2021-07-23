import React, {useContext, useState, useEffect} from 'react'
import styled from "styled-components";
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
// import PaypalButton from '../../userProfile/PaypalButton'
import Button from '@material-ui/core/Button';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SideBarUser from './SideBarUser';

function ConfirmedVendors() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [confirmed_vendors, setConfirmedVendors] = state.userAPI.confirmed_vendors
    const [token] = state.token
    const [total, setTotal] = useState(0)

    //////////////////get total of prices of [cart] //////////////////
    useEffect(() =>{
        const getTotal = () =>{
            const total = confirmed_vendors.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToConfirmedVendors = async (confirmed_vendors) =>{
        await axios.patch('/user/addconfirmed_vendors', {confirmed_vendors}, {
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
    const removeConfirmedVendor = id =>{
        if(window.confirm("Do you want to Remove this Vendor?")){
            confirmed_vendors.forEach((item, index) => {
                if(item._id === id){
                    confirmed_vendors.splice(index, 1)
                }
            })

            setConfirmedVendors([...confirmed_vendors])
            addToConfirmedVendors(confirmed_vendors)
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


    if(confirmed_vendors.length === 0) 
        return(<Content>
            <Header/>
            <SideBarUser/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <h2 style={{marginLeft: "250px", textAlign: "center", fontSize: "40px"}}>There is no any Confirmed Services of Vendors</h2>
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
            <TextTitle>Your Confirmed Vendors</TextTitle>
            {
                confirmed_vendors.map(product => (
                    <div className="detail cart" key={product._id}>
                    <img src={product.images.url} alt="" />
                    
                    <div className="box-detail">
                    <h2>{product.title}</h2>
                    <LineLite1></LineLite1>
                    <h4>Rs {product.price} - {product.max_price}</h4>
                    <LineLite1></LineLite1>
                    <h4>{product.address_line_1}</h4>
                    <LineLite1></LineLite1>
                    <Text5>{product.description}</Text5>
                    <Line3></Line3>
                    <Text6>{product.content}</Text6>
                    <Line3></Line3>
                    <Text5>{product.content_2}</Text5>
                    <LineLite1></LineLite1>
                    <div className="row">
                    <Text7>{product.content_3}</Text7>
                    <Text7>{product.content_4}</Text7>
                    </div>
                    <LineLite1></LineLite1>
                        <Text2>{product.content_5}</Text2>
                    <Line3></Line3>
                    <h4>Total Buyers: {product.sold}</h4>
                    <Line2></Line2>
                    <h4>Contact: {product.contact_number_2} / {product.contact_number_1}</h4>
                    <Line1></Line1>
                    <Text4>{product.address_line_1}</Text4>
                    <Text4>{product.address_line_2}</Text4>
                    <Text4>{product.address_line_3}</Text4>
                    <LineLite1></LineLite1>
                            {/* <Text1>If you would like to buy or getting more information about this service, please wait a moment. One of our employees will contact you as soon as possible by a mobile phone call. If you do not wish to purchase this service, remove it by clicking the Remove button at the top of this vendor's service. </Text1> */}
                            <h6>Prices can be changed. this price is minimum price of the {product.title}</h6>

                            {/* <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div> */}
                            
                            <div className="delete" 
                            onClick={() => removeConfirmedVendor(product._id)}>
                                <Button variant="contained" color="secondary">
                                Remove Confirmed Service of {product.title}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* <div className="total">
                <br></br>
                <h1>Total: Rs {total}</h1>
                
                <h5>Note: this is the minimum price of your cart</h5>
                <br></br>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
                <br></br>
            </div> */}
        </div>
        </Container>
        <Footer/>
        </div>
    )
};
const TextTitle = styled.div`
    margin: 5px;
    font-size: 22px;
    font-weight: 700;
    color: darkblue;
    text-transform: uppercase;
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
    text-transform: lowercase;
`;
const Text3 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkred;
    text-transform: lowercase;
`;
const Text4 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkviolet;
    text-transform: lowercase;
`;
const Text5 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkcyan;
    text-align: center;
    text-transform: lowercase;
`;
const Text6 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkslategray;
    text-align: center;
    text-transform: lowercase;
`;
const Text7 = styled.div`
    margin: 5px;
    font-size: 20px;
    color: darkslategray;
    text-align: left;
    text-transform: uppercase;
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

export default ConfirmedVendors
