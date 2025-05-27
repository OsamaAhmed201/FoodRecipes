import React, { useEffect, useState } from 'react'
import Header from './../../Shared/Header/Header';
import imgUser from '../../../assets/category.svg'
import NoDataFound from '../../Shared/NoDataFound/NoDataFound.jsx';
import defaultImg from '../../../assets/def_person.webp'
import { axiosInstance, baseIMG, USERS_URLS } from '../../Shared/baseUrl/baseUrl.js';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DeleteItim from '../../Shared/DeleteItim/DeleteItim.jsx';
import DetaliesView from '../DetaliesUser/DetaliesView.jsx';




export default function UserList() {
  const [page, setPage] = useState(1)
  const limit = 7

  let [lodingPage, setLodingPage] = useState(false)
  let [btnLoad, setBtnLoad] = useState(false)
  let [users, setUsers] = useState([])
  // deleteUser
  const [userId, setUserId] = useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [nameUser, setNameUser] = useState('')
  const handleShow = (id) => { setShow(true), setUserId(id) };
  //ViewUser
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (id) => { setShowView(true), setUserId(id), viewUser(id) };
  const [showDataView, setshowDataView] = useState("");

  // funGetUsers
  async function getAllUsers() {
    setLodingPage(true)
    try {
      let response = await axiosInstance.get(`${USERS_URLS.GET_ALL_USERS}?pageSize=${limit}&pageNumber=${page}`)
      setLodingPage(false)
      setUsers(response.data.data);
    } catch (error) {
      toast.error(error.data);
      setLodingPage(false)
    }
  }

  // funDelete
  async function deleteUser() {
    setBtnLoad(true);
    try {
      let response = await axiosInstance.delete(USERS_URLS.DELETE_USER(userId));
      setBtnLoad(false);
      getAllUsers();
      handleClose();
      toast.success(`User deleted successfully.`)
      if (response.message === 'unAuthorized') {
        toast.error('gwuio')
        handleClose();
      }
    } catch (error) {
      setBtnLoad(false);

      const errorMessage = error?.response?.data?.message || "Failed to delete user";

      if (errorMessage.toLowerCase().includes("admin")) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(errorMessage);
      }
    }
  }
  async function viewUser(id) {
    setshowDataView(null);
    setBtnLoad(true)
    try {
      let response = await axiosInstance.get(USERS_URLS.GET_USER_BY_ID(id))
      console.log(response.data);

      setBtnLoad(false)
      setshowDataView(response.data);

    } catch (error) {
      toast.error(error || "Something went wrong")
      setBtnLoad(false)
    }
  }


  useEffect(() => {
    getAllUsers()
  }, [page])
  return (
    <>
      <Modal show={showView} onHide={handleCloseView} animation={false}>
        <Modal.Header closeButton className='title_alart_Cate'>
          <i class="fa-solid fa-align-left me-3"></i> User Details
        </Modal.Header>
        <Modal.Body>
          {showDataView ? <DetaliesView userName={showDataView?.userName} email={showDataView?.email} country={showDataView?.country} phoneNumber={showDataView?.phoneNumber} role={showDataView?.group?.name} imguser={showDataView?.imagePath ? `${baseIMG}${showDataView.imagePath}` : defaultImg} /> : (
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
      {/* //delete */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>

        </Modal.Header>

        <Modal.Body>
          <DeleteItim deleteitem={`${nameUser}`} />
        </Modal.Body>
        <Modal.Footer>

          <Button className='icon_delete' variant=" btn-outline-danger" onClick={deleteUser}>
            {btnLoad ? <i className='fa fa-spinner fa-spin'></i> : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>


      <Header title={'User'} subTitle={'List'} Descraption={'You can now add your items that any user can order it from the Application and you can edit'} ImgHeader={imgUser} />
      <div className="container d-flex justify-content-between align-items-center  all_listCate my-3">
        <div className="Caegory_titel">
          <h3>Categories Table Details</h3>
          <p className='muted'>You can check all details</p>
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
            <tr className=''>
              <th scope="col">id</th>
              <th scope="col"> User Name </th>
              <th scope="col">Image</th>
              <th scope="col">Email</th>
              <th scope="col">country</th>
              <th scope="col">Phone</th>
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

            {users.length > 0 ? users.map((i) =>
              <tr>
                <th>{i.id}</th>
                <td>{i.userName}</td>
                <td>{i.imagePath ? <img className='img-productRecipe' src={`${baseIMG}/${i.imagePath}`} alt="img_Recipe" /> : <img className='img-productRecipe' src={defaultImg} alt="img_Recipe" />} </td>
                <td>{i.email}</td>
                <td>{i.country}</td>
                <td>{i.phoneNumber}</td>

                <td>
                  <div className="action">
                    <div className="dropdown">
                      <a className="btn fs-4 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">

                      </a>
                      <div className="actionBtn">

                        <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">
                          <li onClick={() => { handleShowView(i.id) }}><span className="dropdown-item" > <i className=" p-2 fa-solid fa-eye text-info"></i>View</span></li>
                          <li onClick={() => { handleShow(i.id), setNameUser(i.userName) }}><span className="dropdown-item " ><i className="p-2 fa-solid fa-trash text-danger"></i>Delete</span></li>
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
          className="px-4 py-1   rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={users.length < limit}
          className="px-4 py-1   rounded disabled:opacity-50"
        >
          Next
        </button>
        
      </div>
    </>
  )
}
