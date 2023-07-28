import Header from "../components/Header";
import Button from "../components/Button";
import Selection from "../components/Selection";
import Bottom from "../components/Bottom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const maxTestNum = 2;

const Test = () => {
    const [ testNum, setTestNum ] = useState(0);
    const isSelected = true;
    const navigate = useNavigate();

    const goNext = () => {
        if(isSelected){
            if(testNum === maxTestNum){
                navigate(`/result`);
            }
            else{
                setTestNum(testNum + 1);
            }
        }
        else{
            alert("하나를 선택해주세요");
        }
    }
    const goBack = () => {
        if(testNum === 0){
            navigate(`/`);
        }
        else{
            setTestNum(testNum - 1);
        }
    }

    return (
        <div>
            <Header title={`테스트 페이지`}/>
            {testNum+1}/{maxTestNum+1}
            <Selection testNum={testNum} />
            <Bottom 
            leftChild={<Button text={"< 이전"} onClick={goBack}/>}
            rightChild={<Button text={"다음 >"} onClick={goNext}/>} 
            />
        </div>
    )
}

export default Test;