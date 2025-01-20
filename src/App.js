
import './App.css';
import { getEmotionImgById } from './uitl';
import Home   from "./pages/Home";
import New    from "./pages/New";
import Diary  from "./pages/Diary";
import Edit   from "./pages/Edit";

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useEffect, useReducer, useRef,useState } from 'react';

const oneDay = 1000*60*60*24 // 1일=>밀리초로 계산
// 목(Mock)데이터 설정
const mockData = [
  {
    id:"mock1",
    date: new Date().getTime()-(oneDay*1),
    content: "mock1 Irure anim in exercitation sint culpa ea culpa laboris cillum.",
    emotionId:1,
  },
  {
    id:"mock2",
    date: new Date().getTime()-(oneDay*2),
    content: "mock2",
    emotionId:2,
  },
  {
    id:"mock3",
    date: new Date().getTime()-(oneDay*3),
    content: "mock3",
    emotionId:3,
  },
]

// 일기 데이터 관리 기능을 처리하는 함수를 컴포넌트 밖에 정의하여 사용
// state: 상태관리 객체인 State, 
// action은 전달받은 매개변수 객체(type, data)
function reducer(state, action){
  switch (action.type){
    case "INIT":
      return action.data;
    case "CREATE": {
      console.log("create", action.data)
      return [action.data, ...state] // [데이터, 스프레드연산자(기존배열)] => 병합
    }
    case "UPDATE": {
      // 기존 data.id와 수정 data.id가 같은면 action.data에 있는 값으로 state반환
      // 그렇지 않으면 기존 data그대로 state에 반환
      return state.map((it) => { 
        console.log("===== update action =====")
        console.log( action.data.content)
        console.log( it.id,  action.data.id, String(it.id) !== String(action.data.id) )

        return String(it.id) === String(action.data.id) ? {...action.data}:it})
    }
    case "DELETE": {
      //console.log("delete action:", action.targetId)
      // 기존 data.id와 삭제 data.targetId가 일치하지 않은  action.data에 값을 반환
      return state.filter((it) => {
          // console.log("=================")
          // console.log( it.id,  action.targetId, String(it.id) !== String(action.targetId) )

          return String(it.id) !== String(action.targetId)
        })
    }
    default: return state;

  } 
}

// 컴포넌트에서 공통으로 사용할 있게 하는 객체 생성
export const DiaryStateContext      = React.createContext()// 객체
export const DiaryDispatchContext   = React.createContext()// 함수

// ----------------------------------------------------------------------------------------- //

function App() {
  // 데이터 로딩 상태 구현
   const [isDataLoaded, setIsDataLoaded ] = useState(false)

  // 일기 데이터 관리 State 객체
  // State객체 데이터 업데이트하는 함수는 컴포넌트 외부 함수 사용 =>  useReducer()
  // data변수 초기값은 빈어있는 배열 설정
   const [data, dispatch] = useReducer(reducer, []); 
   const idRef = useRef(0) // DOM 참조형(식별자역할), 변수 역할, 초기값 0 설정

   // 목 데이터는 컴포넌트의 라이프 사이클과 관련없고, 컴포턴트가 리렌터할 때 다시 생성할 필요가 없는 값이나
   // 함수는 반드시 컴포너늩 외에 선언
   // 초기치 설정
   // useEffect에서 콜백함수는 마운트 시점에 1번만 호출되어 콜백함수인 dispacth()를 호출
   useEffect(()=>{
      dispatch({
        type:"INIT",
        data: mockData,
      })
      // false -> true
      setIsDataLoaded(true)
    }, [])

   // 기능별 함수 정의
   // 1. 일기 내용 추가
   const onCreate = (date, content, emotionId) => {
      dispatch({
        type: "CREATE",
        data: {
          id: idRef.current,
          date: new Date(date).getTime(), // 현재 시스템 날짜를 타임스탬프 형식
          content,
          emotionId
        }
      }) // end dispatch()
      idRef.current += 1; // 일기 관리 데이터 고유 식별자(ID역할)

   }
   // 2. 일기 내용 수정
   // 일기 데이터 구분하는 고유식별자 : targetId
   const onUpdate = (targetId, date, content, emotionId) => {
      dispatch({
        type: "UPDATE",
        data: {
          id: targetId,
          date: new Date(date).getTime(),
          content,
          emotionId
        }
      })
   }
   // 3. 일기 내용 삭제
   const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    })
   }


  
  if (!isDataLoaded){
    return < div>데이터를 불러오느 중입니다.</div>
  }
  else {
    return (

      <DiaryStateContext.Provider  value={data}>
      <DiaryDispatchContext.Provider    value={{
        onCreate,
        onUpdate,
        onDelete
      }}>
      <div className="mt-4" >
        <div className='container'>

          {/* 하이퍼링크 기능 => 네비케이션 : 메뉴 링크 기능  */}
          <div className="d-flex fs-4">
            <div className="mx-1"><Link to={"/"}>Home </Link></div>
            <div className="mx-1"><Link to={"/new"}>New </Link></div>
            <div className="mx-1"><Link to={"/diary"}>Diary </Link></div>
            <div className="mx-1"><Link to={"/edit"}>Edit </Link></div>
          </div>



          <h4 className="myfont_title text-center fs-2">감정 일기장: 운영팀 웹 어드민 시스템 v2</h4>

          {/* 1. 컴포넌트 연결(마운트) 하기 */}
          <div className="w-75 mx-auto">

          {/*  Rountes, Route컴포넌트
            => URL Controller 역할 : URL을 분석하여 페이지 연결
            => 특정 경로 요청시 특정 컴포넌트 마운트 */}
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/new"        element={<New />} /> 
            {/* // path에 매개변수를 선언하여 인자값 전달: /diary/1  */}
            <Route path="/diary/:id"  element={<Diary />} />
            <Route path="/edit/:id"   element={<Edit />} />
          </Routes>

          </div>

          


          <hr />
          {/* 스타일 적용 : class-> className에서 클래스명 사용 */}
          {/* <div>
            <button type="button" className="btn btn-primary">Primary</button>
            <button type="button" className="btn btn-secondary">Secondary</button>
            <button type="button" className="btn btn-success">Success</button>
          </div> */}

         
          

          
        </div>
      </div>
      </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>

    );
  }// end if 
}

export default App;

/*
페이지 라우팅: 요청에 따라ㅐ 적절한 페이지를 반환하는 일련의 과정
ex) https://myprject.com/blog 요청 -> blog.html 반환
 1. 서버 사이드렌더리(url방식)와 클라이언트 사이드 렌더링(url)

 리액트 라우터 : 페이지 라우팅 전용라이브러리



일기 관리 기능 만들기
 1. 일기 데이터 State는 최상위 컴포넌트인 App생성
 2. useReduce로 App컴포턴트에 일기 데이터를 관리하기 위한 State

*/
