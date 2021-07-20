import React, {useContext, useState, useEffect} from 'react'
import styled from "styled-components";
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import Button from '@material-ui/core/Button';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

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
    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div>
        <Header/>
        <Container>
        <div >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Text1>This is your Cart of Vendors</Text1>
            {
                cart.map(product => (
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
                    <Text1>{product.content_2}</Text1>
                    <LineLite1></LineLite1>
                    <div className="row">
                    <Text2>{product.content_3}</Text2>
                    <Text2>{product.content_4}</Text2>
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
                            onClick={() => removeProduct(product._id)}>
                                <Button variant="contained" color="secondary">
                                Remove Vendor
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <br></br>
                <h1>Total: Rs {total}</h1>
                
                <h5>Note: this is the minimum price of your cart</h5>
                <br></br>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
                <br></br>
            </div>
        </div>
        </Container>
        <Footer/>
        </div>
    )
};
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
    margin-right: 100px;
    margin-left: 100px;
`;

export default Cart
