
import Button from "../component/Button";
import Header from "../component/Header";
// import { useSearchParams } from "react-router-dom";
// import Editor from "./Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from "../uitl";
import DiaryList from "../component/DiaryList";

const Home = () => {
    // 날짜에 따라 일기 필터링하기 위한 일기 내용 전체 data 공유
    const data =  useContext(DiaryStateContext)

    // 날짜에 따라 일기 필터링한 데이터만 저장
    const [filteredData, setFilteredData] = useState([])

    // Home 타이틀은 현재 시스템 날짜를 설정하기 위해 State객체에 값을 설정
    const [pivotDate, setPivotDate] = useState(new Date())
    // pivotDate가 변할 때마다 해당 월에 작성된 일기 필터링
    useEffect(()=>{
        if (data.length >= 1){ //  일기 내용이 있을 경우만 처리
            const { beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate)
            
            setFilteredData(
                data.filter( 
                     (it) => it.date >= beginTimeStamp  && it.date <= endTimeStamp)
            )
             console.log("sorted it",filteredData)
        } else {
            setFilteredData([]) // 비어 있는 배열 설정
        }
    }, [data, pivotDate])


    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`

    // 월을 1씩 증가, 감소하는 함수
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1))
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1))
    }

    
    // 2. URL에 쿼리 스트링 값 읽기
    // const [searchParams, setSearchParams] = useSearchParams();
    // // "http://localhost:3000/?sort=desc&name=hong"
    // console.log(searchParams.get("sort"))   // "desc" 값 출력
    // console.log(searchParams.get("name"))   // "hong"값 출력

    return (
    <div className="">
        
        <Header 
            title={headerTitle}
            leftChild={<Button 
                type="success"
                text={"  <  "}
                onClick={onDecreaseMonth}
            />}
            rightChild={<Button
                type="secondary"
                text={"  >  "}
                onClick={onIncreaseMonth}
            />}
        />
        {/* 해당 월에  일기 내용 목록 List */}
        <DiaryList data={filteredData} />

        {/* 테스트 */}
        {/* <Editor 
            initDate={{
                // 현재 날짜를 타임스탬프로 전달
               date: new Date().getTime(), 
               emotionId: 1,
               content: "이전에 작성했던 일기" 
            }}
            onSubmit={ ()=> alert("작성완료 클릭") }
        /> */}


        {/* Home페이지 Button
        <div className="p3 m-3 ">
            <Button 
                type={"success"}
                text={"버튼 텍스트"}
                onClick={ () => {alert('Hi')}  }
            />
            <Button 
                type={"danger"}
                text={"전송"}
                onClick={ () => {alert('send')}  }
            />
            <Button 
                text={"기타스타일"}
                onClick={ () => {alert('기타버튼')}  }
            />
        </div> */}
        

    </div>)
}
export default Home;