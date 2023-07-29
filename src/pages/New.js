import Header from "../components/Header";
import Button from "../components/Button";
import Bottom from "../components/Bottom";
import Search from "../components/Search";
import OptionItem from "../components/OptionItem";
import { selectionList } from "../util";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const New = () => {    
    const [state, setState] = useState({
        selectionId: 0,
    });
    const navigate = useNavigate();

    const handleOnBack = () => {
        navigate(-1);
    }
    const handleOnSubmit = () => {
        alert("작성이 완료되었습니다");
        navigate(`/evaluate`);
    }
    const handleChangeSelection = (selectionId) => {
        setState({
            ...state,
            selectionId,
        });
    };

    return (
        <div>
            <Header title="새로운 맵기 평가 작성하기"
                    leftChild={<Button text="<" onClick={handleOnBack}/>}
            />
            <div>1. 음식 선택하기</div>
            <Search />
            <div>2. 매운 정도 평가하기</div>
            {selectionList.map((it) => (
                    <OptionItem
                        key={it.id}
                        {...it}
                        onClick={handleChangeSelection}
                        isSelected={state.selectionId === it.id}
                    />
                ))}
            <Bottom leftChild={<Button text="취소하기" onClick={handleOnBack}/>}
                    rightChild={<Button text="작성완료" onClick={handleOnSubmit}/>}
            />
        </div>
    )
}

export default New;