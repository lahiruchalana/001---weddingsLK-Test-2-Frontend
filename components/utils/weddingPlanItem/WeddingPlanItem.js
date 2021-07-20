import React from 'react'
import BtnRender from './BtnRender'

function WeddingPlanItem({weddingPlan, isAdmin, deleteWeddingPlan, handleCheck}) {

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={weddingPlan.checked}
                onChange={() => handleCheck(weddingPlan._id)} />
            }
            <img src={weddingPlan.images_1.url} alt="" />

            <div className="product_box">
                <h2 title={weddingPlan.title}>{weddingPlan.title}</h2>
                <span>Rs {weddingPlan.price_1} - Rs {weddingPlan.max_price_1}</span>
                <p>{weddingPlan.description_1}</p>
                {/* <h5>No: {weddingPlan.contact_number_1}</h5> */}
                <h5>Address: {weddingPlan.address_1}</h5>
            </div>

            
            <BtnRender weddingPlan={weddingPlan} deleteWeddingPlan={deleteWeddingPlan} />
        </div>
    )
}

export default WeddingPlanItem
