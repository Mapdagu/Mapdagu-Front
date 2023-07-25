import Header from "../components/Header";
import Button from "../components/Button";
import Selection from "../components/Selection";
import Bottom from "../components/Bottom"
import { useNavigate } from "react-router-dom";

const Test = ({data}) => {
    const itemName = "나에게 신라면은";
    const isSelected = true;
    const navigate = useNavigate();
    const goNext = () => {
        if(isSelected){
            navigate(`/result`);
        }
        else{
            alert("하나를 선택해주세요");
        }
    }
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div>
            <Header title={`${itemName}`}/>
            <Selection data={data}/>
            <Bottom 
            leftChild={<Button text={"< 이전"} onClick={goBack}/>}
            rightChild={<Button text={"다음 >"} onClick={goNext}/>} 
            />
        </div>
    )
}

export default Test;