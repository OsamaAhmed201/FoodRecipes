import React from 'react'
import imgRec from '../../../assets/defulte.jpg'
export default function DetaliesRecipce({imgRec,nameRecpe,priceRecpe,descriptionRecpe,categoryRecpe,tagRecpe}) {
    return (
        <>
            <div className="container  all_detaliesRecipce ">
                <div className="text-center ">
                    <img src={imgRec} alt="img_REC" />
                    <div className=" d-flex justify-content-center title_detaliesRecipce">
                        <span><i class="fa-solid fa-utensils mx-2"></i></span>   <h4>{nameRecpe}</h4>
                    </div>

                </div>
                <div className="my-2">
                    <span className='subtitle_detalies '><i class="fa-solid fa-dollar-sign mx-2 my-2"></i> Price: </span> <span className='recipe_Resutel'>  {priceRecpe} $</span>
                    <br />  <span className='subtitle_detalies '><i class="fa-solid fa-audio-description mx-2 my-2"></i> Description: </span> <span className='recipe_Resutel'>  {descriptionRecpe} </span>
                    <br />  <span className='subtitle_detalies '><i class="fa-solid fa-list mx-2 my-2"></i> Categories: </span> <span className='recipe_Resutel'>  {categoryRecpe} </span>
                    <br />  <span className='subtitle_detalies '><i class="fa-solid fa-tag mx-2 my-2"></i> Tag: </span> <span className='recipe_Resutel'>  {tagRecpe}</span>
                </div>
            </div>
        </>
    )
}
