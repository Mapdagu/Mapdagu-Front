import SetProfile from "../components/profile/SetProfile";

const SetProfilePage = ({getProfileInf}) => {
    const onSubmit = (data) => {
        const { userName, imageNum, intro } = data;
        getProfileInf(userName, imageNum, intro);
    }
    
    return (
        <div className="container">
            <SetProfile title="프로필 정보 입력" onSubmit={onSubmit}/>
        </div>
    );
}

export default SetProfilePage;