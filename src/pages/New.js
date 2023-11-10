import Header from "../components/Header";
import Editor from "../components/evaluate/Editor";

import icon_back from "../assets/icon/header_back.png";

import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie";
import axios from "axios";

const ADD_EVAL = 'https://mapdagu.site/api/evaluations';
const UPDATE_LEVEL = 'https://mapdagu.site/api/evaluations/info';

const New = () => {    
    const accessToken = getCookie("accessToken");
    const navigate = useNavigate();
    
    const handleOnBack = () => {
        navigate(-1);
    }
    
    const onSubmit = async(data) => {
        const {name, score} = data;
        // const name1 = name[0];
        //임시 데이터
        const scoville = 1000;
        const level = 1;
        try {
            await axios.post(ADD_EVAL, {name, score}, {headers: {Authorization: accessToken}});
            await axios.patch(UPDATE_LEVEL, {scoville, level}, {headers: {Authorization: accessToken}});
            alert("작성이 완료되었습니다");
            navigate(`/evaluate`, {replace:true});
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="container">
            <div className="header">
                <Header 
                    type={1}
                    leftChild={<button onClick={handleOnBack}>
                        <img alt="back" src={icon_back}/>
                    </button>}
                />
            </div>
            <div className="content">
                <Editor onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default New;