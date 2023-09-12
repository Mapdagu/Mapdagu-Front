import SignUp from "../components/SignUp";

const SignUpPage = ({getSignUpInf}) => {
    const onSubmit = (data) => {
        const { nickname, checkedEmail, password } = data;
        getSignUpInf(nickname, checkedEmail, password);
    }
    return (
        <div className="container">
            <div className="content">
                <SignUp onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

export default SignUpPage;