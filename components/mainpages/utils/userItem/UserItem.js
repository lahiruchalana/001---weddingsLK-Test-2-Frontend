import React from 'react'
// import BtnRender from './BtnRender'
import Button from '@material-ui/core/Button';


function UserItem({user, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className="product_card" >
            {/* {
                isAdmin && <input type="checkbox" checked={user.checked}
                onChange={() => handleCheck(user._id)} />
            } */}
            {/* <img src={product.images.url} alt="" /> */}

            <div className="product_box">
                <h1 name={user.name}>{user.name}</h1>
                


                {/* ///////////// add here phone number for role (role -> phone number)/////////// */}
                { user.role === 0 ? <span>User Role: Customer </span>
                : <span>User Role: Admin </span>
                }

                <h5>{user.email}</h5>
                <h5>{user.contactFirst}</h5>
                <h5>{user.contactSecond}</h5>

                <h6>{user.updatedAt}</h6>

                <br></br>

                {/* ////////////////////List down a cart with users vendor prodoucts  ( SEE DOWN )/////////////////////// */}
                {/* /////////////// ( SEE DOWN ) //////////////// */}
              
                <div>{user.cart.map(cart => {
                    return( 
                    <>
                    <div>
                    <h3>{cart.title}</h3>
                    <div>Rs: {cart.price}</div>
                    {/* /// isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} /> */}
                    <Button variant="contained" color="secondary" color="white">
                                Not Completed
                    </Button>
                    <br></br>
                    </div>
                    </>
                )})}</div>




            </div>

            {/* //////////// buttons unvisible //////////////// */}
            {/* <BtnRender product={product} deleteProduct={deleteProduct} /> */}


        </div>
    )
}

export default UserItem
