import Header from "../components/Header";
import Button from "../components/Button";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { EvalDispatchContext } from "../App";
import { useContext } from "react";

const New = () => {    
    const {onCreate} = useContext(EvalDispatchContext);
    const navigate = useNavigate();
    const handleOnBack = () => {
        navigate(-1);
    }
    
    const onSubmit = (data) => {
        alert("작성이 완료되었습니다");
        const { date, itemName, selectionId } = data;
        onCreate(date, itemName, selectionId);
        navigate(`/evaluate`, {replace:true});
    }

    return (
        <div>
            <Header title="새로운 맵기 평가 작성하기"
                    leftChild={<Button text="<" onClick={handleOnBack}/>}
            />
            <div>1. 음식 선택하기</div>
            <Search />
            <div>2. 매운 정도 평가하기</div>
            <Editor onSubmit={onSubmit}/>
        </div>
    )
}

export default New;