import Header from "../components/Header";
import Button from "../components/Button";
import Body from "../components/Body";
import { useNavigate } from "react-router-dom";

const TestMain = () => {
    const navigate = useNavigate();
    const goTest = () => {
        navigate(`/test/1`);
    }
    return (
        <div>
            <Header title={"테스트 시작 페이지"}/>
            {/* <Body>
                <Button text="테스트 시작하기" onClick={goTest}/>
            </Body> */}
            <Body 
                child={<Button text={"테스트 시작하기"} onClick={goTest}/>}
            />
        </div>
    )
}

export default TestMain;