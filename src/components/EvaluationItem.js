import "./EvaluationItem.css";
import { useNavigate } from "react-router-dom";
import { getItemImgById, getSelectionTextById } from "../util";
import icon_edit from "../img/icon/evaluate_edit.png";
import icon_delete from "../img/icon/evaluate_delete.png";
import axios from "axios";
import { getCookie } from "../cookie";

const SERVER_URL = `https://mapdagu.site/api/evaluations`;

const EvaluationItem = ({id, name, imageNum, score, maxTestNum}) => {
    const accessToken = getCookie("accessToken");
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/detail/${id}`);
    }
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }
    const onClickDelete = async() => {
        if(window.confirm("평가를 정말 삭제할까요?")){
            if(imageNum >= 1 && imageNum <= maxTestNum+1 ){
                alert("테스트 결과는 삭제할 수 없습니다.");
            } else {
                try{
                    await axios.delete([SERVER_URL, id].join("/"), {headers: {Authorization: accessToken}});
                    navigate(`/evaluate`, {replace:true});
                    window.location.reload();
                } catch(error){
                    alert(error.response.data.message);
                }
            }
        }
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
                <button onClick={onClickDelete}><img alt="delete" src={icon_delete}/></button>
            </div>
        </div>
    );
}

export default EvaluationItem;