import Selection from "../components/Selection";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { EvalDispatchContext, EvalStateContext } from "../App";

const Test = ({maxTestNum}) => {        
    const testData = useContext(EvalStateContext);
    const {onCreate, onUpdate} = useContext(EvalDispatchContext);
    const [ testNum, setTestNum ] = useState(0);
    const [ idRefTest, setIdRefTest ] = useState(3);
    const navigate = useNavigate();
    const matchItem = testData.find((it)=> String(it.id) === String(idRefTest));

    const goBack = () => {
        if(testNum === 0){
            navigate(-1);
        }
        else{
            setTestNum(testNum - 1);
            setIdRefTest(idRefTest-1);
        }
    }
    const goNext = (itemName, selectionId) => {
        if(!matchItem){
            onCreate( itemName, selectionId );
            setIdRefTest(idRefTest+1);
        }
        else{
            onUpdate( idRefTest, itemName, selectionId );
            setIdRefTest(idRefTest+1);
        }
        if(testNum === maxTestNum){
            submitHandler();
        }
        else{
            setTestNum(testNum + 1);
        }
    }
    const submitHandler = async (e) => {
        navigate(`/result`);
    }
    return (
        <div className="container">
            <div className="content">
                <Selection testNum={testNum} maxTestNum={maxTestNum} goNext={goNext} goBack={goBack}/>
            </div>
        </div>
    )
}

export default Test;