
export default function CategoryData({id,name,Date}) {
  return (
    <>
      <div className="detaliesCate">
        <p><i class="fa-solid fa-image-portrait"></i> ID : <span>{id}</span></p>
        <p><i class="fa-solid fa-tag"></i> Name : <span>{name}</span></p>
        <p><i class="fa-solid fa-calendar-days"></i> Creation Date : <span>{Date}</span></p>
      </div>
    </>
  )
}
