import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useReducer, useEffect } from 'react';

import TestMain from './pages/TestMain';
import Test from './pages/Test';
import Result from './pages/Result';
import Main from './pages/Main';
import Friend from './pages/Friend';
import Evaluate from './pages/Evaluate';
import MyPage from './pages/MyPage';
import Details from './pages/Details';
import EditEval from './pages/EditEval';
import New from './pages/New'

import { getItemImgById } from './util';

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

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoaded(true);
  }, []);

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
  }
  const onUpdate = (targetId, date, itemName, selectionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        data: new Date(date).getTime(),
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
              <Route path = "/test" element ={<Test/>}/>
              <Route path = "/result" element ={<Result />}/>
              <Route path = "/main" element ={<Main />}/>
              <Route path = "/detail/:id" element ={<Details />}/>
              <Route path = "/friend" element ={<Friend />}/>
              <Route path = "/evaluate" element ={<Evaluate />}/>
              <Route path = "/new" element ={<New />}/>
              <Route path = "/edit/:id" element ={<EditEval data={mockData}/>}/>
              <Route path = "/mypage" element ={<MyPage />}/>
            </Routes>
          </div>
        </EvalDispatchContext.Provider>
      </EvalStateContext.Provider>
    );
  }
}

export default App;
