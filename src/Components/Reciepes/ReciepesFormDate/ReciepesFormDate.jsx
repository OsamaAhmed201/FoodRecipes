import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { axiosInstance, CATEGORIES_URLS, RECIPES_URLS, TAGS_URLS } from '../../Shared/baseUrl/baseUrl.js';
import { toast } from 'react-toastify';

export default function ReciepesFormDate() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  let [tag, setTag] = useState([])
  let [categoryLis, setCategoryLis] = useState([])
  let [btnLoad, setBtnLoad] = useState(false)
  let navigate = useNavigate()
  const location = useLocation()
  const data = location.state
  const isEdit = !!data;
  const recipeId = data?.id;



  const appendFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('tagId', data.tagId);
    formData.append('categoriesIds', data.categoriesIds);
    formData.append('recipeImage', data.recipeImage[0]);
    return formData
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

  //GetAllTag
  async function getTag() {
    try {
      let response = await axiosInstance.get(TAGS_URLS.GET_ALL_TAGS)
      setTag(response.data);
    } catch (error) {
      toast.error(error.data);
    }
  }
  //onSubmitADDRecipe
  async function onSubmit(data) {
    setBtnLoad(true)
    try {
      let recpectRecipe = appendFormData(data)
      if (isEdit) {
        let response = await axiosInstance.put(RECIPES_URLS.UPDATE_RECIPE(recipeId), recpectRecipe)
        setBtnLoad(false)
        toast.success('recipe updated successfully.')

      } else {
        let response = await axiosInstance.post(`${RECIPES_URLS.ADD_RECIPE}`, recpectRecipe)
        setBtnLoad(false)
        toast.success(response?.data?.message||"recipe added successfully.")
      }
      navigate('/dashboard/recipes')
    }
    catch (error) {
      toast.error(error?.response?.data?.message || "Error");
      setBtnLoad(false)
    }

  }
  useEffect(() => {
    getTag()
    getAllCategories()
    if (isEdit) {
      setValue("name", data.name);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("tagId", data.tag?.id);
      setValue("categoriesIds", data.category?.[0]?.id);
    }
  }, [])
  return (
    <>

      <div className="container  all_FormData">
        <div className="row mx-4 d-flex justify-content-center align-items-center py-2">
          <div className="col-md-8">
            <div className="contantForm_Reciepes ">
              <div className='p-4'>
                <h2>
                  Fill the <span className="WelcomeUser">Recipes </span>!
                </h2>
                <p >
                  you can now fill the meals easily using the table and form , click here and sill it with the table !
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-end">
            <Link to="/dashboard/recipes" className="btn link_fillRecipes">
              All Recipes  <i className="fa-solid fa-right-long ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="container w-75 m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className='my-3'>
          {/* //name */}
          <input {...register("name", { required: 'field is required' })} type="text" className='form-control input_FormRecipes my-3' placeholder='Recipe Name' />
          {errors.name && <span className='text-danger p-3  '>{errors.name.message}</span>}
          {/* //Tag */}
          <select  {...register("tagId", { required: 'field is required' })} type="text" className='form-control input_FormRecipes my-3 ' placeholder='Tag' >
            {tag.map((item) => <option value={item.id}>{item.name}</option>)}
          </select>
          {errors.tagId && <span className='text-danger p-3  '>{errors.tagId.message}</span>}
          {/* //price */}

          <input {...register("price", { required: 'field is required' })} min={0} type="number" className='form-control input_FormRecipes my-3' placeholder='Price' />
          {errors.price && <span className='text-danger p-3  '>{errors.price.message}</span>}
          {/* //categoriesIds */}
          <select {...register("categoriesIds", { required: 'field is required' })} type="text" className='form-control input_FormRecipes my-3' placeholder='category' >
            {categoryLis.map((cate) => <option value={cate.id}>{cate.name}</option>)}
          </select>
          {errors.categoriesIds && <span className='text-danger p-3  '>{errors.categoriesIds.message}</span>}
          {/* //description */}
          <textarea {...register("description", { required: 'field is required' })} type="text" className='form-control input_FormRecipes my-3' placeholder='Description *' />
          {errors.description && <span className='text-danger p-3  '>{errors.description.message}</span>}
          {/* //upload Img */}
          <div class="upload-box">
            <input type="file" id="fileUpload" hidden className='w-100' {...register("recipeImage")} />
            <label for="fileUpload" class="upload-label">
              <div class="upload-content">
                <div class="upload-icon"><i class="fa-solid fa-circle-up"></i></div>
                <div>
                  Drag & Drop or <span class="highlight">Choose a Item Image</span> to Upload
                </div>
              </div>
            </label>
          </div>
          <div className=" d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              {btnLoad ? <i className="fa-solid fa-spinner fa-spin mx-3"></i> : isEdit ? "Update" : "Save"}
            </button>

            <button className='btn btn-outline-success px-4 mx-3' onClick={() => navigate('/dashboard/recipes')} >Cancel</button>
          </div>
        </form>
      </div>

    </>
  )
}
