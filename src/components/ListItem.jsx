
function ListItem(props) {
    debugger;
    return (
        <>
        {props.list && props.list.map((item) => {
            return <label key={item.id} className="list-group-item">

                <input style={{ float: "left" }} onChange={props.handleCheck} defaultChecked={item.isDone} className="form-check-input me-1" type="checkbox" value={item.id} />
                {item.title}

                <input style={{ float: "right" }} className="btn btn-danger" onClick={(e)=>props.handleRemove(e,item.id)} type="button" value="Delete" />
            </label>

        })}
        </>
    )
}


export default ListItem;