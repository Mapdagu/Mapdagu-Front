import Header from "../components/Header";
import SetProfile from "../components/SetProfile";

const SetProfilePage = ({getProfileInf}) => {
    const onSubmit = (data) => {
        const { userName, imageNum, intro } = data;
        getProfileInf(userName, imageNum, intro);
    }
    return (
        <div>
            <Header title="profile set page"/>
            <SetProfile onSubmit={onSubmit}/>
        </div>
    );
}

export default SetProfilePage;