
export default function Header({ title, Descraption, ImgHeader,subTitle }) {
  return (
    <>
      <div className="container  all_ContantHead">
        <div className="row  d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="contantHeader ">
              <div className='p-4'>
                <h2>
                  {title} <span className="WelcomeUser">{subTitle}</span>
                </h2>
                <p >
               {Descraption}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-center">
            <img src={ImgHeader} className=" m-auto img_header" alt="" />
          </div>
        </div>

      </div>

    </>
  )
}
