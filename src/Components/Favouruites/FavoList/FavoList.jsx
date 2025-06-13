import React, { useContext, useEffect, useState } from 'react'
import imgFavs from '../../../assets/category.svg'
import defaultImg from '../../../assets/borger.jpg'
import Header from '../../Shared/Header/Header.jsx'
import { axiosInstance, baseIMG, FAVS_URLS } from '../../Shared/baseUrl/baseUrl.js'
import NoDataFound from '../../Shared/NoDataFound/NoDataFound.jsx'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteItim from '../../Shared/DeleteItim/DeleteItim.jsx'
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function FavoList() {
  let navigate=useNavigate()
  let { LogData } = useContext(AuthContext)
  let role = LogData?.userGroup
  if (role !=="SystemUser") {
    navigate('/dashboard')
  }

  // delete
  const [cateId, setCateId] = useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [nameRecipe, setNameRecipe] = useState('')
  const handleShow = (id) => { setShow(true), setCateId(id) };
  let [favsRes, setFavsRes] = useState([])
  let [btnLoad, setBtnLoad] = useState(false)
  let [lodingPage, setLodingPage] = useState(false)

  async function getAllFavs() {
    setLodingPage(true)
    try {
      let response = await axiosInstance.get(FAVS_URLS.GET_ALL_FAVS)

      setFavsRes(response.data.data);
      setLodingPage(false)

    }
    catch (error) {
      toast.error(error.data);
      setLodingPage(false)
    }
  }


  async function deleteFavs() {
    setBtnLoad(true)
    try {
      let response = await axiosInstance.delete(FAVS_URLS.DELETE_FAV(cateId))
      setBtnLoad(false)
      getAllFavs()
      handleClose()
    }
    catch (error) {
      toast.error(error.data);
      setBtnLoad(false)
    }
  }
  useEffect(() => {
    getAllFavs()
  }, [])


  return (
    <>
      {/* //Delete */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>

        </Modal.Header>

        <Modal.Body>
          <DeleteItim deleteitem={`${nameRecipe}`} />
        </Modal.Body>
        <Modal.Footer>

          <Button className='icon_delete' variant=" btn-outline-danger" onClick={deleteFavs}>
            {btnLoad ? <i className='fa fa-spinner fa-spin'></i> : 'Delete this item'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Header title={'Favorite'} subTitle={'Itmes!'} Descraption={'You can now add your items that any user can order it from the Application and you can edit'} ImgHeader={imgFavs} />

      {lodingPage && (
        <div className="d-flex justify-content-center align-items-start pt-5 vh-50 bg_loadCategory">
          <span class="loader mt-5"></span>
        </div>
      )}

      <div className="container py-4">
        <div className="row gx-3 gy-3">
          {favsRes.length > 0 ?
            favsRes.map((item) => {
              return (
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-bodys  position-relative  ">
                      <img
                        src={item.recipe.imagePath ? `${baseIMG}/${item.recipe.imagePath}` : defaultImg}
                        className="card-img-top w-100 m-auto"
                        alt={item.name}
                      />
                      <div className="Contant_Card">
                        <i onClick={() => { handleShow(item.id), setNameRecipe(item.recipe.name) }} class="fa-solid fa-heart position-absolute "></i>
                        <h5 className="card-title pt-3">{item.recipe.name}</h5>
                        <p className="card-text ">
                          {item.recipe.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }) : <NoDataFound />
          }

        </div>
      </div>
    </>
  )
}
