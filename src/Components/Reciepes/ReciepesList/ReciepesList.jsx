import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header.jsx'
import imgRespice from '../../../assets/category.svg'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance, baseIMG, RECIPES_URLS } from '../../Shared/baseUrl/baseUrl.js'
import { toast } from 'react-toastify'
import NoDataFound from '../../Shared/NoDataFound/NoDataFound.jsx'
import defaultImg from '../../../assets/borger.jpg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteItim from '../../Shared/DeleteItim/DeleteItim.jsx';
import DetaliesRecipce from '../DetaliesRecipce/DetaliesRecipce.jsx'


export default function ReciepesList() {
  //pagination
  const [page, setPage] = useState(1)
  const limit = 7
  //
  let [respecie, setRespecie] = useState([])
  let [lodingPage, setLodingPage] = useState(false)
  let [btnLoad, setBtnLoad] = useState(false)
  let navigate = useNavigate()
  // delete
  const [cateId, setCateId] = useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [nameRecipe, setNameRecipe] = useState('')
  const handleShow = (id) => { setShow(true), setCateId(id) };
  //View
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (id) => { setShowView(true), setCateId(id), viewRecipe(id) };
  const [showDataView, setshowDataView] = useState("");

  //delete Cate
  async function deleteRecipe() {
    setBtnLoad(true);
    try {
      let response = await axiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(cateId));
      setBtnLoad(false);
      getAllRecipes();
      handleClose();
      toast.success(`recipe deleted successfully.`)
    } catch (error) {
      toast.error(error)
      setBtnLoad(false);
    }
  }
  async function getAllRecipes() {
    setLodingPage(true)
    try {
      let response = await axiosInstance.get(`${RECIPES_URLS.GET_ALL_RECIPES}?pageSize=${limit}&pageNumber=${page}`)
      setLodingPage(false)
      setRespecie(response.data.data);
    } catch (error) {
      toast.error(error.data);
      setLodingPage(false)
    }
  }
  async function viewRecipe(id) {
    setshowDataView(null);
    setBtnLoad(true)
    try {
      let response = await axiosInstance.get(RECIPES_URLS.GET_RECIPE_BY_ID(id))
      setBtnLoad(false)
      setshowDataView(response.data);

    } catch (error) {
      toast.error(error || "Something went wrong")
      setBtnLoad(false)
    }


  }

  useEffect(() => {
    getAllRecipes()
  }, [page])
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

          <Button className='icon_delete' variant=" btn-outline-danger" onClick={deleteRecipe}>
            {btnLoad ? <i className='fa fa-spinner fa-spin'></i> : 'Delete this item'}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* /View Model/ */}
      <Modal show={showView} onHide={handleCloseView} animation={false}>
        <Modal.Header closeButton className='title_alart_Cate'>
          <i class="fa-solid fa-align-left me-3"></i> Recipe Details
        </Modal.Header>
        <Modal.Body>
          {showDataView ? (
            <DetaliesRecipce
              imgRec={showDataView?.imagePath ? `${baseIMG}${showDataView.imagePath}` : defaultImg}
              nameRecpe={showDataView?.name}
              priceRecpe={showDataView?.price}
              descriptionRecpe={showDataView?.description}
              categoryRecpe={showDataView?.category?.[0]?.name}
              tagRecpe={showDataView.tag?.name}
            />
          ) : (
            <div className=" d-flex justify-content-center">
              <i class="fa-solid fa-spinner"></i>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='icon_delete btn-outline-danger' onClick={handleCloseView}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      <Header title={'Recipes'} subTitle={'Items'} Descraption={'You can now add your items that any user can order it from the Application and you can edit'} ImgHeader={imgRespice} />
      <div className="container d-flex justify-content-between align-items-center  all_listCate my-3">
        <div className="Caegory_titel">
          <h3>Categories Table Details</h3>
          <p className='muted'>You can check all details</p>
        </div>
        <div>
          <Link to="/dashboard/recipes-data" className='btnAdd_cate text-decoration-none'>Add New Recipe </Link>
        </div>
      </div>

      <div className="container ">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group mb-3">
              <select className="form-select" id="inputGroupSelect01" placeholder='Tag'>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group mb-3">
              <select className="form-select" id="inputGroupSelect01" placeholder='Category'>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container table-responsive">
        <table className="table table-striped table-hover  ">
          <thead className='text-center bg-light'>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col"> Image </th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">tag</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>

            </tr>

          </thead>

          <tr>
            <td colSpan="7">
              {lodingPage && (
                <div className="d-flex justify-content-center align-items-center vh-50 bg_loadCategory">
                  <span class="loader"></span>
                </div>
              )}
            </td>
          </tr>
          <tbody className='text-center' >

            {respecie.length > 0 ? respecie.map((i) =>
              <tr>
                <th>{i.name}</th>
                <td>{i.imagePath ? <img className='img-productRecipe' src={`${baseIMG}/${i.imagePath}`} alt="img_Recipe" /> : <img className='img-productRecipe' src={defaultImg} alt="img_Recipe" />} </td>
                <td>{i.price}</td>
                <td>{i.description}</td>
                <td>{i.tag?.name || "No tag"}</td>
                <td>{i.category?.[0]?.name || "No category"}</td>
                <td>
                  <div className="action">
                    <div className="dropdown">
                      <a className="btn fs-4 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">

                      </a>
                      <div className="actionBtn">

                        <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">
                          <li onClick={() => { handleShowView(i.id) }}><span className="dropdown-item" > <i className=" p-2 fa-solid fa-eye"></i>View</span></li>
                          <li onClick={() => { navigate(`/dashboard/recipes-data`, { state: i }) }} ><span className="dropdown-item" ><i className=" p-2 fa-solid fa-pen-to-square"></i>Edit</span></li>
                          <li onClick={() => { handleShow(i.id), setNameRecipe(i.name) }}><span className="dropdown-item " ><i className="p-2 fa-solid fa-trash"></i>Delete</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </td>

              </tr>
            ) :
              <tr>
                <td colSpan="7">
                  <NoDataFound />
                </td>
              </tr>
            }


          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center align-content-center py-3 pagination">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2  rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 ">Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={respecie.length < limit}
          className="px-4  rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </>
  )
}
