import Header from "../components/Header";
import Button from "../components/Button";
import useDetail from "../hooks/useDetail";
import Viewer from "../components/Viewer";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams();
    const data = useDetail(id);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    const handleCreateEval = () => {
        navigate(`/create_evalution`);
    }

    if(!data){
        return <div>정보를 불러오고 있습니다...</div>
    }
    else {
        const { itemName } = data;
        return (
            <div>
                <Header
                    title="detail page"
                    leftChild={<Button text="←" onClick={goBack}/>}
                    rightChild={<Button text="평가작성" onClick={handleCreateEval}/>}
                />
                <Viewer itemName={itemName} id={id}/>
            </div>
        )
    }
}

export default Details;