import { useEffect, useState } from 'react';
import imgCategory from '../../../assets/category.svg'
import Header from './../../Shared/Header/Header';
import NoDataFound from '../../Shared/NoDataFound/NoDataFound.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteItim from '../../Shared/DeleteItim/DeleteItim.jsx';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify'
import CategoryData from '../CategoryData/CategoryData.jsx';
import { axiosInstance, CATEGORIES_URLS } from '../../Shared/baseUrl/baseUrl.js';


export default function CategoryList() {
  //pagination
  const [page, setPage] = useState(1)
  const limit = 6
  //
  let { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  let [btnLoad, setBtnLoad] = useState(false)
  let [lodingPage, setLodingPage] = useState(false)
  const [cateId, setCateId] = useState(0)
  const [numPage, setNumPage] = useState([])
  const [nameValue, setNameValue] = useState('');


  // delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => { setShow(true), setCateId(id) };
  //addCategory
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => { setShowAdd(true) };
  //EidtCategory
  const [typeModle, setTypeModle] = useState('')
  const [editId, setEditId] = useState(null);

  //ViewCategory
  const [showDataView, setshowDataView] = useState("");
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (id) => { setShowView(true), setCateId(id), viewCategory(id), setshowDataView(null) };

  let [categoryLis, setCategoryLis] = useState([])
  //Fun getAllCate
  async function getAllCategories(searchText = '') {
    setLodingPage(true)
    try {
      let response = await axiosInstance.get(`${CATEGORIES_URLS.GET_ALL_CATEGORIES}?pageSize=${limit}&pageNumber=${page}&name=${searchText}`)
      setLodingPage(false)
      setNumPage(Array(response.data.totalNumberOfPages).fill().map((_, index) => index + 1))
      setCategoryLis(response.data.data);
    } catch (error) {
      toast.error(error.data);
      setLodingPage(false)
    }
  }
  //delete Cate
  async function deleteCategory() {
    setBtnLoad(true);
    try {
      let response = await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(cateId));
      setBtnLoad(false);
      getAllCategories();
      handleClose();
      toast.success(`Category deleted successfully.`)
    } catch (error) {
      toast.error(error)
      setBtnLoad(false);
    }
  }
  // AddCategory
  async function addCategory(data) {
    setBtnLoad(true)
    try {
      let respons = await axiosInstance.post(CATEGORIES_URLS.ADD_CATEGORY, data)
      setBtnLoad(false)
      getAllCategories()
      handleCloseAdd()
      reset()
      toast.success(respons?.data?.message || `Category added successfully.`)

    }
    catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBtnLoad(false)
    }

  }
  // ViewCategory
  async function viewCategory(id) {
    let response = await axiosInstance.get(CATEGORIES_URLS.GET_CATEGORY_BY_ID(id))
    setshowDataView(response.data);
  }
  //editCategory
  async function editCategory(data) {
    setBtnLoad(true)
    try {
      let response = await axiosInstance.put(CATEGORIES_URLS.UPDATE_CATEGORY(editId), data)
      setBtnLoad(false)

      getAllCategories()
      reset()
      handleCloseAdd()
      toast.success(response?.data?.message || `Category updeted successfully.`)
    }

    catch (errer) {
      toast.error(errer.response?.data?.message || "Something went wrong");
      setBtnLoad(false)
    }
  }
  // search
  async function setSearch(data) {
    setNameValue(data);
    setPage(1);
  }

  useEffect(() => {
    getAllCategories(nameValue)


  }, [page,nameValue])
  return (
    <>

      <Header title={'Categories'} subTitle={'Item'} Descraption={'You can now add your items that any user can order it from the Application and you can edit'} ImgHeader={imgCategory} />
      {/* /delete Model/ */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>

        </Modal.Header>

        <Modal.Body>
          <DeleteItim deleteitem={' Category '} />
        </Modal.Body>
        <Modal.Footer>

          <Button className='icon_delete' variant=" btn-outline-danger" onClick={deleteCategory}>
            {btnLoad ? <i className='fa fa-spinner fa-spin'></i> : 'Delete this item'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* /View Model/ */}
      <Modal show={showView} onHide={handleCloseView} animation={false}>
        <Modal.Header closeButton className='title_alart_Cate'>
          <i class="fa-solid fa-align-left me-3"></i> Category Details
        </Modal.Header>
        <Modal.Body>
          {showDataView ? <CategoryData id={showDataView?.id} name={showDataView?.name} Date={<span>{showDataView?.creationDate ? showDataView.creationDate.split("T")[0] : "No date"}</span>} /> :
            (<div className=" d-flex justify-content-center">
              <i className='fa fa-spinner fa-spin'></i>
            </div>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='icon_delete btn-outline-danger' onClick={handleCloseView}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      {/* /Add Model/ */}
      <Modal show={showAdd} onHide={handleCloseAdd} animation={false}>
        <Modal.Header closeButton className='title_alart_Cate'>
          {typeModle === 'edit' ? 'Edit Category' : 'Add Category'}
        </Modal.Header>
        <Modal.Body>
          <form className='p-4 py-5' onSubmit={handleSubmit(typeModle === 'edit' ? editCategory : addCategory)}>
            <div className="input-group mt-4 ">
              <input {...register('name', {
                required: 'Category is require',
              })} type="text" name='name' className="form-control input_email" placeholder="Category Name " aria-label="name" aria-describedby="basic-addon1" />

            </div>
            {errors.name && <span className='text-danger p-3  '>{errors.name.message}</span>}
            <Button type='submit' className='icon_Add_Cate float-end' variant=" btn-success">
              {btnLoad ? <i className='fa fa-spinner fa-spin'></i> : (typeModle === 'edit' ? 'Update' : 'Save')}
            </Button>
          </form>
        </Modal.Body>

      </Modal>



      <div className="container d-flex justify-content-between align-items-center  all_listCate my-3">
        <div className="Caegory_titel">
          <h3>Categories Table Details</h3>
          <p className='muted'>You can check all details</p>
        </div>
        <div>
          <button onClick={() => {
            setTypeModle('add');
            setShowAdd(true);
          }} className='btnAdd_cate'>Add New Category</button>
        </div>
      </div>
      <div className="">
        <input className='form-control w-50 ms-5 my-4' type="text" placeholder='Search by name' onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="container table-responsive">
        <table className="table table-striped table-hover ">
          <thead className='text-center'>
            <tr>
              <th scope="col">id</th>
              <th scope="col"> Category Name </th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>

          </thead>

          <tr>
            <td colSpan="4">
              {lodingPage && (
                <div className="d-flex justify-content-center align-items-start pt-5 vh-50 bg_loadCategory">
                  <span class="loader mt-5"></span>
                </div>
              )}
            </td>
          </tr>
          <tbody className='text-center' >

            {categoryLis.length > 0 ? categoryLis.map((i) =>
              <tr>
                <th>{i.id}</th>
                <td>{i.name}</td>
                <td>{i.creationDate.split("T")[0]}</td>
                <td>
                  <div className="action">
                    <div className="dropdown">
                      <a className="btn fs-4 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">

                      </a>
                      <div className="actionBtn">

                        <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">
                          <li onClick={() => handleShowView(i.id)} ><span className="dropdown-item" > <i className=" p-2 fa-solid fa-eye"></i>View</span></li>
                          <li onClick={() => {
                            setEditId(i.id)
                            setTypeModle('edit');
                            setShowAdd(true);
                            setValue('name', i.name)

                          }}
                          ><span className="dropdown-item" ><i className=" p-2 fa-solid fa-pen-to-square"></i>Edit</span></li>
                          <li onClick={() => handleShow(i.id)}><span className="dropdown-item " ><i className="p-2 fa-solid fa-trash"></i>Delete</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ) :
              <tr>
                <td colSpan="4">
                  <NoDataFound />
                </td>
              </tr>
            }


          </tbody>
        </table>
      </div>

      {/* pagination */}
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
