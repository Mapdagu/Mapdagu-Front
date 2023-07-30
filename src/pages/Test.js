import Header from "../components/Header";
import Selection from "../components/Selection";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { EvalDispatchContext } from "../App";

const Test = ({maxTestNum}) => {
    const {onCreate} = useContext(EvalDispatchContext);
    const [ testNum, setTestNum ] = useState(0);
    const navigate = useNavigate();

    const goNext = (data) => {
        const { date, itemName, selectionId } = data;
        if(selectionId === 0){
            alert("하나를 선택해주세요");
        }
        else{
            onCreate( date, itemName, selectionId );
            if(testNum === maxTestNum){
                navigate(`/result`);
            }
            else{
                setTestNum(testNum + 1);
            }
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
            <Selection testNum={testNum} goNext={goNext} goBack={goBack}/>
        </div>
    )
}

export default Test;