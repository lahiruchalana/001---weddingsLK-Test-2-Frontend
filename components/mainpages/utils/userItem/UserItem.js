import React from 'react'
// import BtnRender from './BtnRender'

function UserItem({user, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className="product_card">
            {/* {
                isAdmin && <input type="checkbox" checked={user.checked}
                onChange={() => handleCheck(user._id)} />
            } */}
            {/* <img src={product.images.url} alt="" /> */}

            <div className="product_box">
                <h2 title={user.name}>{user.name}</h2>


                {/* ///////////// add here phone number for role (role -> phone number)/////////// */}
                {/* <span>Rs {user.role}</span> */}
                
                
                <p>{user.email}</p>

                {/* ////////////////////List down a cart with users vendor prodoucts  ( SEE DOWN )/////////////////////// */}
                {/* /////////////// ( SEE DOWN ) //////////////// */}
              
                {/* <p>{user.cart}</p> */}




            </div>

            {/* //////////// buttons unvisible //////////////// */}
            {/* <BtnRender product={product} deleteProduct={deleteProduct} /> */}


        </div>
    )
}

export default UserItem
