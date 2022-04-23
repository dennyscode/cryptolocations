import ListItemComponent from "./ListItemComponent"

function ListComponent({inputList}) {
  return (
    <section className='content'>
        {inputList.length > 0 ? (
        <div className='inputList'>
            {inputList.map((cryptoshop) => (
                <ListItemComponent key={cryptoshop._id} cryptoshop={cryptoshop} />
            ))}
        </div>
        ) : (
        <h3>You have no shops created for this map</h3>
        )}
    </section>
  )
}
export default ListComponent
