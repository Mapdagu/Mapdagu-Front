import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useReducer, useEffect } from 'react';
// import dummy from "./db/dummy.json";
import axios  from 'axios';

/*pages*/
import TestMain from './pages/TestMain';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import KakaoRedirect from './components/login/KakaoRedirect';
import NaverRedirect from './components/login/NaverRedirect';
import SetProfilePage from './pages/SetProfilePage';
import Test from './pages/Test';
import Result from './pages/Result';
import Main from './pages/Main';
import Friend from './pages/Friend';
import Evaluate from './pages/Evaluate';
import MyPage from './pages/MyPage';
import EditProfile from './pages/EditProfile';
import Details from './pages/Details';
import EditEval from './pages/EditEval';
import New from './pages/New'

import { getItemImgById } from './util';

const SERVER_URL = 'https://mapdagu.site/api/sign-up';

export const EvalStateContext = React.createContext();
export const EvalDispatchContext = React.createContext();

const mockData = [
  {
    id: 0,
    date: new Date().getTime()-1,
    itemName: "신라면",
    selectionId: 1,
    img: getItemImgById(0),   
  },
  {
    id: 1,
    date: new Date().getTime()-2,
    itemName: "불닭볶음면",
    selectionId: 2,
    img: getItemImgById(1),  
  },
  {
    id: 2,
    date: new Date().getTime()-3,
    itemName: "엽기떡볶이 오리지널",
    selectionId: 3,
    img: getItemImgById(2),  
  }
]

function reducer(state, action) {
  switch(action.type){
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) => 
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case "INIT": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

const maxTestNum = 2;

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [userInf, setUserInf] = useState({
    nickname: "",
    email: "",
    password: "",
    userName: "",
    imageNum: 0,
    intro: ""
})

  const {nickname, email, password, userName, imageNum, intro} = userInf;  

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoaded(true);
  }, []);

  const getSignUpInf = (nickname, email, password) => {
    setUserInf({ 
      ...userInf,
      nickname,
      email,
      password
    });
    navigate(`/set_profile`);
  }

  const getProfileInf = (userName, imageNum, intro) => {
    setUserInf({ 
      ...userInf,
      userName,
      imageNum,
      intro
    });
    signUpHandler();
  }

  const signUpHandler = async (e) => {
    await axios.post(SERVER_URL, {nickname, email, password, userName, imageNum, intro});
    alert("회원가입이 완료되었습니다!");
    navigate(`/test`);
  }

  const onCreate = (date, itemName, selectionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        itemName,
        selectionId,
      }
    })
    idRef.current += 1;
  }
  const onUpdate = (targetId, date, itemName, selectionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        itemName,
        selectionId,
      },
    });
  };
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  const changePage = () => {
    navigate(`/`);
  }
  if(!isDataLoaded)
    return <div>데이터를 불러오는 중입니다</div>
  else {
    return (
      <EvalStateContext.Provider value={data}>
        <EvalDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
              <div className='project_name'>
                <button onClick={changePage}>처음으로</button>
                내가맵다했지</div>
              <Routes>
                <Route path = "/" element ={<TestMain />}/>
                <Route path = "/login" element ={<LoginPage />}/>
                <Route path = "/sign_up" element ={<SignUpPage getSignUpInf={getSignUpInf}/>}/>
                <Route path = "/set_profile" element ={<SetProfilePage getProfileInf={getProfileInf}/>}/>
                <Route path = "/oauth2/code/kakao" element ={<KakaoRedirect />}/>
                <Route path = "/oauth2/code/naver" element ={<NaverRedirect />}/>
                <Route path = "/test" element ={<Test maxTestNum={maxTestNum} />}/>
                <Route path = "/result" element ={<Result />}/>
                <Route path = "/main" element ={<Main />}/>
                <Route path = "/detail/:id" element ={<Details />}/>
                <Route path = "/friend" element ={<Friend />}/>
                <Route path = "/evaluate" element ={<Evaluate />}/>
                <Route path = "/new" element ={<New />}/>
                <Route path = "/edit/:id" element ={<EditEval />}/>
                <Route path = "/mypage" element ={<MyPage />}/>
                <Route path = "/edit_profile" element ={<EditProfile />}/>
              </Routes>
          </div>
        </EvalDispatchContext.Provider>
      </EvalStateContext.Provider>
    );
  }
}

export default App;
