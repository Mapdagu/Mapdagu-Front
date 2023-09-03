import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SetProfile from "../components/SetProfile";
import axios from "axios";
import { useEffect } from "react";

const SERVER_URL = `https://mapdagu.site/api/members/me/info`

const EditProfile = ({accessToken}) => {
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        try{
            axios.get(SERVER_URL, {headers: {Authorization: accessToken}})
                .then(res =>{
                    setData({
                        ...res.data,
                    })
                })
        } catch (error){
            alert(error.response.data.message);
        }
    }, [])

    const onSubmit = (data) => {
        const { userName, imageNum, intro } = data;
        try{
            axios.patch(SERVER_URL, {userName, imageNum, intro}, {headers: {Authorization: accessToken}})
                .then(() => {
                    navigate(`/mypage`, {replace: true});
                })
        } catch (error){
            alert(error.response.data.message);
        }   
    }
    return (
        <div>
            {/* <Header title="edit profile"
                    leftChild={<Button text="취소" onClick={goBack}/>}
                    rightChild={<Button text="완료" onClick={onSubmit}/>}
            />             */}
            <SetProfile title="회원정보 수정" initData={data} onSubmit={onSubmit}/>
        </div>
    );
}

export default EditProfile;