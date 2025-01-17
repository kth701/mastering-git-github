import { useCallback, useEffect, useState } from "react";
import { emotionList, getFormattedDate } from "../uitl";
import Button from "./Button";
import "../component/EmotionItem.css"
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor = ({initDate, onSubmit}) => {
    


    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: ""
    })

    // Props에 받은 initDate를 의존성 배열에 저장
    // useEffect(콜백함수, 의존성배열)
    useEffect(()=>{
        // initDate가 falsy한 값: 부모 컴포넌트에서 정상적인 initDate받지 못 한 경우
        if (initDate){
            setState({
                ...initDate,
                // state.date속성은 타임 스탬프형식 -> Date객체 전환 -> yyyy-mm-dd형식으로 전환
                date: getFormattedDate(new Date(parseInt(initDate.date)))
            })
        }
    },[initDate])// initDate값이 변경될 때 마다 콜백함수 호출
    

    const navigate = useNavigate();// 웹페이지 히스토리 객체

    const handleChangeDate = (e) => {
        //console.log('change event  ...')
        // setter()통행 state값 변경하기
        setState({
            ...state,
            date: getFormattedDate(new Date())  //e.target.value
        })
        console.log(new Date())
        console.log('change date:', state.date)
    }
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value
        })
    }
    const handleSubmit = ()=>{
        onSubmit(state)
    }
    // 취소 버튼 => 이전 페이지 이동
    const handleOnGoBack = () => {
        navigate(-1)
    }
    // 감정 이미지 List
    const handleChangeEmotion = useCallback( (emotionId)=>           {
        console.log('감정 이미지 클릭:',emotionId)
        setState({
            ...state,
            emotionId
        })

    },[] ) // Editor컴포넌트의 마운트 시점 이후에는 다시 생성하지 않도록 메모제이션 설정


    return (<>
        <div className="mt-3 p-3 alert alert-primary">
            <h4>오늘의 날짜</h4>
            <div className="row">
                <div className="col-4">
                    <input className="form-control"  type="date" 
                            value={state.date}
                            onChange={handleChangeDate} />
                </div>
            </div>

        </div>
        <div className="mt-3 p-4 alert alert-warning">
            <h4>오늘의 감정</h4>
            {/* 개별 스타일 => xxx.css작성 => import */}
            <div className="d-flex justify-content-around emotion_item">
                {
                    emotionList.map( (it) => (

                        // <img key={it.id} 
                        //      src={it.img}
                        //     alt={`emotion${it.id}`} 
                        // />
                        <EmotionItem 
                            key={it.id}
                            {...it}

                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />

                    ))
                }
            </div>
        </div>
        <div className="mt-3 p-4 alert alert-light">
            <h4>오늘의 일기</h4>

             <div className="form-floating">
                <textarea className="form-control h-25" rows="10"
                            placeholder="오늘은 어땠나요?" 
                            id="content"

                            value={state.content}
                            onChange={handleChangeContent}
                            ></textarea>        
                                          
                <label for="content">Comments</label>
            </div>

        </div>
        <div className="d-flex justify-content-center  mt-3">
            <Button text={"취소하기"} 
                    onClick={handleOnGoBack}/>
            <Button text={"작성 완료"} 
                    type="secondary"
                    onClick={handleSubmit}/>
            {/* <button className="btn btn-primary" >작성 완료</button>
            <button className="btn btn-secondary">취소</button> */}
        </div>
    
    </>)
}
export default Editor;