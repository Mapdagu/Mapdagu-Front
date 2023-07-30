import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import useDetail from "../hooks/useDetail";
import { useNavigate, useParams } from "react-router-dom";
import { EvalDispatchContext } from "../App";
import { useContext } from "react";

const EditEval = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const data = useDetail(id);
    const {onUpdate, onDelete} = useContext(EvalDispatchContext);

    const handleOnBack = () => {
        navigate(-1);
    }

    const onSubmit = (data) => {
      if(window.confirm("평가를 정말 수정할까요?")){
            const { itemName, date, selectionId } = data;
            onUpdate(id, itemName, date, selectionId);
            navigate(`/evaluate`, {replace:true});
        }
    }

    const onClickDelete = () => {
        if(window.confirm("평가를 정말 삭제할까요?")){
            onDelete(id);
            navigate(`/evaluate`, {replace:true});
        }
    }
    
    if(!data){
        return (<div>항목을 불러오고 있습니다...</div>)
    }else{
        return(
            <div>
                <Header
                    title="edit page"
                    leftChild={<Button text="←" onClick={handleOnBack}/>}
                    rightChild={<Button text="삭제하기" onClick={onClickDelete}/>}
                />
                <Editor initData={data} onSubmit={onSubmit}/>
            </div>
        );
    }
    
}

export default EditEval;