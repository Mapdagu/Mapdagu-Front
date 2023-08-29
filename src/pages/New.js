import Header from "../components/Header";
import Button from "../components/Button";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import axios from "axios";

const ADD_EVAL = 'https://mapdagu.site/api/evaluations';
const UPDATE_LEVEL = 'https://mapdagu.site/api/evaluations/info';

const New = ({accessToken}) => {    
    const navigate = useNavigate();
    const handleOnBack = () => {
        navigate(-1);
    }
    
    const onSubmit = async(data) => {
        const {name, score} = data;
        // const name1 = name[0];
        //임시 데이터
        const schoville = 1000;
        const level = 1;
        try {
            await axios.post(ADD_EVAL, {name, score}, {headers: {Authorization: accessToken}});
            await axios.patch(UPDATE_LEVEL, {schoville, level}, {headers: {Authorization: accessToken}});
            alert("작성이 완료되었습니다");
            navigate(`/evaluate`, {replace:true});
        } catch (error) {
            alert(error.response.data.message);
        }
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