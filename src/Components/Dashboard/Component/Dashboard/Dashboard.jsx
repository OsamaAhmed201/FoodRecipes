import React, { useContext } from 'react'
import { AuthContext } from '../../../Context/authContext/AuthContextProvider.jsx'
import HeaderImg from '../../../../assets/imgHeader.png'
import Header from '../../../Shared/Header/Header.jsx'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  let { LogData } = useContext(AuthContext)
  let userName = (LogData?.userName);

  return (
    <>
      <Header title={'Welcome'} subTitle={`${userName}`} Descraption={'This is a welcoming screen for the entry of the application , you can now see the options'} ImgHeader={HeaderImg} />

      <div className=" container FillRecipes my-3 p-3">
        <div className="row d-flex px-5 justify-content-between align-items-center">
          <div className="col-md-6">
            <div className="inerContiantDash">
              <h3> Fill the  <span className=''>Recipes</span> !</h3>
              <p className=''>you can now fill the meals easily using the table and form , <br /> click here and sill it with the table !</p>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <Link to="/dashboard/recipes-data" className="btn link_fillRecipes">
              Fill Recipes  <i className="fa-solid fa-right-long ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </>

  )
}
