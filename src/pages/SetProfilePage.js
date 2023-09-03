import SetProfile from "../components/SetProfile";

const SetProfilePage = ({getProfileInf}) => {
    const onSubmit = (data) => {
        const { userName, imageNum, intro } = data;
        getProfileInf(userName, imageNum, intro);
    }
    return (
        <div>
            <SetProfile title="프로필 정보 입력" onSubmit={onSubmit}/>
        </div>
    );
}

export default SetProfilePage;