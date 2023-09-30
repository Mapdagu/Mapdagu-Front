import Header from "../components/Header";
import Viewer from "../components/Viewer";
import { useNavigate, useParams } from "react-router-dom";
import icon_back from "../img/icon/header_back.png";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleOnBack = () => {
        navigate(-1);
    }
    const handleCreateEval = () => {
        navigate(`/create_evalution`);
    }
    return (
        <div className="container">
            <div className="header">
                <Header type={1} leftChild={<button onClick={handleOnBack}><img alt="back" src={icon_back}/></button>}/>                
            </div>
            <div className="content">
                <Viewer itemName="신라면" id={parseInt(id)+1}/>
            </div>
        </div>
    )
}

export default Details;