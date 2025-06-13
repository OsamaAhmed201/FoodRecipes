import React, { useState } from 'react'
import logoimg from '../../../assets/foodRecipe.png'
import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { axiosInstance, USERS_URLS } from '../../Shared/baseUrl/baseUrl.js'
import { EMAIL_VALIDTION } from './../../Shared/Validtion/Validtion';
export default function VerifyAcount() {

  let [loding, setLoding] = useState(false)
  let navigate = useNavigate()
  let { register, watch, handleSubmit, formState: { errors } } = useForm()
 
  const [dispalyForm, setDisplayForm] = useState(true)


  // call ApiForget
  const onSubmit = async (data) => {
    try {
      setLoding(true)
      let respons = await axiosInstance.put(USERS_URLS.VERIFY, data)
      console.log(respons);

      if (respons.data.message === 'Account verified successfully') {
        toast.success(`Account verified successfully`)
        setLoding(false)
        setDisplayForm(false)
        navigate('/login')
      }

    } catch (error) {
      toast.error(error.response.data.message)
      setLoding(false)
    }
  }


  return (
    <>
      {loding ? (
        <div className="d-flex justify-content-center align-items-center vh-100 bg_load">
          <div className="loader"></div>
        </div>
      ):  <div className='All_AuthContant'>
        <div className="container-fluid overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white  rounded-3 py-5 px-5">
              <div>
                {/* /logoimg/ */}
                <div className="log_img text-center ">
                  <img src={logoimg} className='w-50' alt="food-logo" />
                </div>
                {/* /title/ */}
                <div className="title_auth">
                  <h2>  Verify Account</h2>
                  <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox  </p>
                </div>
                {/* /form/ */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* /email/ */}
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                    <input {...register('email', EMAIL_VALIDTION)} type="mail" name='email' className="form-control input_height" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />

                  </div>
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                  {/* /OTP/ */}
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                    <input {...register('code', {
                      required: 'OTP is require',
                    })} type="text" name='code' className="form-control input_height" placeholder="Enter your OTP" aria-label="code" aria-describedby="basic-addon1" />

                  </div>
                  {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}

                  <button className='bnt_submit w-100 mt-4'>Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>}


    

    </>


  )
}
