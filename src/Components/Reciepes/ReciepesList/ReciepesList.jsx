import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header.jsx'
import imgRespice from '../../../assets/category.svg'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance, baseIMG, CATEGORIES_URLS, RECIPES_URLS, TAGS_URLS } from '../../Shared/baseUrl/baseUrl.js'
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
  const limit = 6
  const [numPage, setNumPage] = useState([])
  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [cateValue, setCateValue] = useState('');

  //
  let [categoryLis, setCategoryLis] = useState([])
  let [tag, setTag] = useState([])

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
      toast.success(response?.data?.message || `recipe deleted successfully.`)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
      setBtnLoad(false);
    }
  }
  async function getAllRecipes(searchText = '', tagValue = '', cateValue = '') {
    setLodingPage(true)
    try {
      let response = await axiosInstance.get(`${RECIPES_URLS.GET_ALL_RECIPES}?pageSize=${limit}&pageNumber=${page}&name=${searchText}&tagId=${tagValue}&categoryId=${cateValue}`)
      setLodingPage(false)
      setNumPage(Array(response.data.totalNumberOfPages).fill().map((_, index) => index + 1))
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

  //Tag
  async function getTag() {
    try {
      let response = await axiosInstance.get(TAGS_URLS.GET_ALL_TAGS)
      setTag(response.data);
    } catch (error) {
      toast.error(error.data);
    }
  }
  //GetAllCate
  async function getAllCategories() {
    try {
      let response = await axiosInstance.get(`${CATEGORIES_URLS.GET_ALL_CATEGORIES}`)
      setCategoryLis(response.data.data);
    } catch (error) {
      toast.error(error.data);
    }
  }
  //search
  async function setSearch(data) {
    setNameValue(data);
    setPage(1);
  }
  function cateValueSearch(data) {
    setCateValue(data);

  }
  function tagValueSearch(data) {
    setTagValue(data);

  }
  useEffect(() => {
    getAllRecipes(nameValue, tagValue, cateValue)
    getAllCategories()
    getTag()
  }, [page, nameValue, tagValue, cateValue])
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
              <i className='fa fa-spinner fa-spin'></i>
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
              <span className="input-group-text input_FormRecipes" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" className="form-control input_FormRecipes" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group mb-3">
              <select onChange={(e) => tagValueSearch(e.target.value)} type="text" className='form-control input_FormRecipes' placeholder='Tag' >
                <option value="">Select Tag</option>
                {tag.map((item) => <option value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group mb-3">
              <select onChange={(e) => cateValueSearch(e.target.value)} type="text" className='form-control input_FormRecipes' placeholder='category' >
                <option value="">Select Category</option>
                {categoryLis.map((cate) => <option value={cate.id}>{cate.name}</option>)}
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
                <div className="d-flex justify-content-center align-items-start pt-5 vh-50 bg_loadCategory">
                  <span class="loader mt-5"></span>
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




      <div className="d-flex justify-content-center">
        <ul className="pagination">

          <li
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            className={`page-item ${page === 1 ? 'disabled' : ''}`}
          >
            <a className="page-link" href="#">Previous</a>
          </li>

          {/* First page always */}
          <li onClick={() => setPage(1)} className={`page-item ${page === 1 ? 'active' : ''}`}>
            <a className="page-link" >1</a>
          </li>

          {/* Dots before current range */}
          {page > 3 && numPage.length > 5 && (
            <li
              className="page-item"
              style={{ cursor: 'pointer' }}
              onClick={() => setPage(Math.max(1, page - 2))}
            >
              <span className="page-link">...</span>
            </li>
          )}

          {/* Middle pages */}
          {numPage
            .filter(i => i !== 1 && i !== numPage.length)
            .filter(i => i >= page - 1 && i <= page + 1)
            .map(i => (
              <li key={i} onClick={() => setPage(i)} className={`page-item ${page === i ? 'active' : ''}`}>
                <a className="page-link" href="#">{i}</a>
              </li>
            ))
          }

          {/* Dots after current range */}
          {page < numPage.length - 2 && numPage.length > 5 && (
            <li
              className="page-item"
              style={{ cursor: 'pointer' }}
              onClick={() => setPage(Math.min(numPage.length, page + 2))}
            >
              <span className="page-link">...</span>
            </li>
          )}
          {/* Last page always */}
          {numPage.length > 1 && (
            <li onClick={() => setPage(numPage.length)} className={`page-item ${page === numPage.length ? 'active' : ''}`}>
              <a className="page-link" href="#">{numPage.length}</a>
            </li>
          )}

          <li
            onClick={() => setPage((old) => Math.min(old + 1, numPage.length))}
            className={`page-item ${page === numPage.length ? 'disabled' : ''}`}
          >
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </div>


    </>
  )
}
