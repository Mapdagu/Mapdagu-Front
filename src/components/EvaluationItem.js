import "./EvaluationItem.css";
import { useNavigate } from "react-router-dom";
import { getItemImgById, getSelectionTextById } from "../util";
import icon_edit from "../img/icon/evaluate_edit.png";

const EvaluationItem = ({id, name, imageNum, score}) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/detail/${id}`);
    }
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }
    return (
        <div className="EvaluationItem">
            <div onClick={goDetail} className="img_section">
                <img alt="" src={getItemImgById(imageNum)}/>
            </div>    
            <div onClick={goDetail} className="info_section">
                <div className="item_wrapper">
                    {name}
                </div>
                <div className="schoville_wrapper">
                    스코빌지수 3500
                </div>
                <div className="content_wrapper">
                    {getSelectionTextById(score)}
                </div>
            </div>
            <div className="button_section">
                <button onClick={goEdit}><img alt="edit" src={icon_edit}/></button>
            </div>
        </div>
    );
}

export default EvaluationItem;