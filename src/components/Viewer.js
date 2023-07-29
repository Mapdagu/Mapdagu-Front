import "./Viewer.css";
import { getItemImgById } from "../util";

const Viewer = ({itemName, id}) => {
    return(
        <div className="Viewer">
            <h4>{itemName}</h4>
            <img alt="" src={getItemImgById(id)}/> 
        </div>
    )
}

export default Viewer;