import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

// -------------------------------------------------------------------------------------------------//
// 커스텀 훅 = 사용자 정의 훅
// 여러 컴포넌트에서 동일하게 사용하는 기능을 별도 파일로 분리 해서 사용, 코드의 재사용
// 컴스텀 훅 기능 : URL로 부터 받은 id로 일기 데이터 불러오기, 데이터가 없으면 Home페이지 보내기 //
// -------------------------------------------------------------------------------------------------//
const useDiary = (id) => {
     console.log('Diary컴포넌트 인자값id:', id)

    // App컴포턴트에 선언 data객체 공유
    const data = useContext(DiaryStateContext)
    const [diary, setDiary] = useState()
    const navigate = useNavigate()


    // 변수의 상태변화에 따른 처리
    //useEffect(()=>{}, []) // 처음 마운트 할 때 한 번 콜백함수 수행
    //useEffect(()=>{}, [상태변수,..])// 상태변수 값이 변동이 있을 때 마다 콜백함수
    useEffect(()=>{
        // 파라미터로넘겨 받은 일기 id값으로 일기 데이터 가져오기
        const matchDiary = data.find( (it) => String(it.id) === String(id))

        console.log("== useDiary() ")
        console.log(id, matchDiary)
        
        if (matchDiary){
            setDiary(matchDiary)
        } else {
            alert("일기가 존재하지 않습니다.")
            // true이면 페이지 이동후 뒤로가 아이콘이 비활성화
            navigate("/", {replace: true}) 
        }

    }, [id, data])



    return diary; //  특정 일기 데이터를 반환
}

export default useDiary;