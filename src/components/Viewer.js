import "./Viewer.css";
import { getItemImgById } from "../util";
import { useNavigate } from "react-router-dom";

const Viewer = ({itemName, id}) => {
    const navigate = useNavigate();

    const goEvaluate = () => {
        navigate(`/edit/${id}`);
    }

    return(
        <div className="Viewer">
            <div className="viewer_container">
                <div className="text_wrapper"> 
                    <h2> 스코빌지수 3600</h2>
                    <h3>난이도: ☆☆☆☆☆</h3>
                </div>
                <div className="buttons">
                    <button >친구랑 같이 먹기</button>
                    <button onClick={goEvaluate}>평가하기</button>
                </div>                
            </div>
            <div className="image_wrapper">
                <img alt="img_food" src={getItemImgById(id)}/> 
                <div>
                    <h2>{itemName}</h2>
                </div>
            </div>
        </div>
    )
}

export default Viewer;