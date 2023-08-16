import Header from "../components/Header";
import SignUp from "../components/SignUp";

const SignUpPage = ({getSignUpInf}) => {
    const onSubmit = (data) => {
        const { nickname, checkedEmail, password } = data;
        getSignUpInf(nickname, checkedEmail, password);
    }
    return (
        <div>
            <Header title="sign up page"/>
            <SignUp onSubmit={onSubmit}/>
        </div>
    );
}

export default SignUpPage;