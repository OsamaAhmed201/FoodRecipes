import React, { use } from 'react'
import imgBackNotFound from '../../../assets/Vector.png'
import foodRecipe from '../../../assets/foodRecipe.png'
import img404 from '../../../assets/404.png'
import { useNavigate } from 'react-router-dom'


export default function Notfound() {
  let navigate=useNavigate()
  function backToHome(){
    navigate('/dashboard')
  }
  return (
    <>
      <div className="notFoundPage position-relative ">

        <div className="container position-absolute notFoundContant   ">

          <div className="row ">

            <div className="col-md-6 itemNotFound">
              <div className="">
                <img src={foodRecipe} className="w-50 pb-5 mb-5" alt="LOGO" />
                <h2>Oops.... </h2>
                <h3 className='text-success'>Page  not found </h3>
                <p className='text-muted '>This Page doesn’t exist or was removed! <br />
                  We suggest you  back to home.</p>
                <button onClick={backToHome} className='btn_notFound bg-success text-white px-4 py-3 border-none'> <i class="fa-solid fa-arrow-left mx-2"></i> Back To Home</button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-end" style={{ height: "100vh" }}>
              <img src={img404} className='w-100' alt="" />
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
