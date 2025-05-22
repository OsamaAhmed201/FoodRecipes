import imgNoDATA from '../../../assets/nodata.png'
export default function NoDataFound() {
  return (
    <>

      <div className='d-flex justify-content-center align-items-center py-5'>
        <div className="">
          <img src={imgNoDATA} alt="doData" />

        </div>
      </div>
    </>
  )
}
