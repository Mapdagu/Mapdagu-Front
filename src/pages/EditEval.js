import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import OptionItem from "../components/OptionItem";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { selectionList, getItemImgById } from "../util";

const EditEval = ({data}) => {
    // const [ id, setId ] = useState(0);
    console.log("0000");
    const navigate = useNavigate();
    const { id } = useParams();
    const initData = data.filter(it => (it.id === id));
    // const [state, setState] = useState({
    //     selectionId: 0,
    // });

    const goBack = () => {
        navigate(-1);
    }
    // const handleCreateEval = () => {
    //     navigate(`/edit`);
    // }
    const onSubmit = () => {
        if(window.confirm("평가를 정말 수정할까요?")){
            console.log("제출");
        }
    }

    const onClickDelete = () => {
        if(window.confirm("평가를 정말 삭제할까요?")){
            console.log("삭제");
        }
    }
    // const handleChangeSelection = (selectionId) => {
    //     setState({
    //         ...state,
    //         selectionId,
    //     });
    // };
    
    return(
        <div>
            <Header
                title="edit page"
                leftChild={<Button text="←" onClick={goBack}/>}
                rightChild={<Button text="삭제하기" onClick={onClickDelete}/>}
            />
            <Editor initData={initData} id={id} onSubmit={onSubmit}/>
        </div>
    );
}

export default EditEval;