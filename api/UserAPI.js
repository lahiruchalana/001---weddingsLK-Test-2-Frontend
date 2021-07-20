import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEmployee, setIsEmployee] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [confirmed_vendors, setConfirmedVendors] = useState([])
    const [wish_to_buy, setWishToBuy] = useState([])
    // /////////////////////////////////////////////////////////
    // const [user, setUser] = useState('')
    // /////////////////////////////////////////////////////////

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    res.data.role === 2 ? setIsEmployee(true) : setIsEmployee(false)

                    setCart(res.data.cart)
                    setConfirmedVendors(res.data.confirmed_vendors)
                    setWishToBuy(res.data.wish_to_buy)

    // /////////////////////////////////////////////////////////
    //                 setUser(res.data.user)
    // /////////////////////////////////////////////////////////

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }


    const addConfirmedVendors = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = confirmed_vendors.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setConfirmedVendors([...confirmed_vendors, {...product, quantity: 1}])

            await axios.patch('/user/addconfirmed_vendors', {confirmed_vendors: [...confirmed_vendors, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to Confirmed Vendors in your profile.")
        }
    }


    const addWishToBuy = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = wish_to_buy.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setWishToBuy([...wish_to_buy, {...product, quantity: 1}])

            await axios.patch('/user/addwish_to_buy', {wish_to_buy: [...wish_to_buy, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        isEmployee: [isEmployee, setIsEmployee],
        cart: [cart, setCart],
        addCart: addCart,
        confirmed_vendors: [confirmed_vendors, setConfirmedVendors],
        addConfirmedVendors: addConfirmedVendors,
        wish_to_buy: [wish_to_buy, setWishToBuy],
        addWishToBuy: addWishToBuy,
        history: [history, setHistory],
        // user: [user, setUser]
    }
}

export default UserAPI
 