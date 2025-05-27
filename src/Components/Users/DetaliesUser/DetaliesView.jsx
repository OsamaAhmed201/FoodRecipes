import React from 'react'
import imgRec from '../../../assets/defulte.jpg'
export default function DetaliesView({imguser,userName,email,country,phoneNumber,role}) {
    return (
        <>
            <div className="container  all_detaliesRecipce ">
                <div className="text-center ">
                    <img src={imguser} alt="img_REC" className='w-25 m-auto' />
                    <div className=" d-flex justify-content-center title_detaliesRecipce mt-2">
                         <h4>{userName}</h4>
                    </div>

                </div>
                <div className="my-2">
                    <span className='subtitle_detalies '><i class="fa-solid fa-user-tie mx-2 my-2"></i> Role: </span> <span className='recipe_Resutel'>  {role}</span>
                    <br />
                    <span className='subtitle_detalies '><i class="fa-solid fa-envelope mx-2 my-2"></i> Email : </span> <span className='recipe_Resutel'>  {email} </span>
                    <br />  <span className='subtitle_detalies '><i class="fa-solid fa-earth-americas mx-2 my-2"></i> Country : </span> <span className='recipe_Resutel'>  {country} </span>
                    <br />  <span className='subtitle_detalies '><i class="fa-solid fa-phone mx-2 my-2"></i> Phone : </span> <span className='recipe_Resutel'>  {phoneNumber} </span>
                  
                </div>
            </div>
        </>
    )
}
