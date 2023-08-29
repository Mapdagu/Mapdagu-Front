import Header from "../components/Header";
import Button from "../components/Button";
import Body from "../components/Body";
import { useNavigate } from "react-router-dom";
import React from "react";

const TestMain = ({role}) => {
    const navigate = useNavigate();
    const goTest = () => {
        if(role === ""){
            navigate(`/login`);
        } else if(role === "USER"){
            navigate(`/main`);
        } else if(role === "NOT_TEST_USER"){
            navigate(`/test`);
        } else {
            navigate(`/set_profile`);
        }
    }
    return (
        <div>
            <Header title={"테스트 시작 페이지"}/>
            <Body 
                child={<Button text={"테스트 시작하기"} onClick={goTest}/>}
            />
        </div>
    )
}

export default TestMain;