import { useEffect, useState } from "react"
import Button from "./Button"
import DiaryItem from "./DiaryItem"
import { useNavigate } from "react-router-dom"


const sortOptionList = [
    {value:"latest", name:"최신순"},
    {value:"oldest", name:"오래된 순"}
]

const DiaryList = ({data}) => {
    

    const [sortType, setSortType]       = useState("latest")
    const [sortedData, setSortedData]   = useState([])
    const navigate = useNavigate() // 하이퍼링크 기능 

    useEffect(()=>{
        // javascript 정렬 처리하는 함수 정의
        const compare = (a,b) => {
                if (sortType==="latest"){
                    // 내림차순  b(새로바뀌는) - a(초기))
                    return Number(b.date) - Number(a.date) 
                }
                else {// 오름차순 a(초기) - b(새로바뀌는)
                    return Number(a.date) - Number(b.date);
                }
        }
        // 배열 복사
        const copyList = JSON.parse(JSON.stringify(data)) 
        // 정렬 처리
        copyList.sort(compare)
        setSortedData(copyList)


    },[data, sortType])

    // 정렬 옵션 선택시
    const onChangeSortType = (e) => {
        setSortType(e.target.value)
                
        console.log("soredData", sortedData)

        sortedData.forEach( (it) => console.log(it.date))
    }
    // 새 일기 쓰기 버튼 클릭
    const onClickNew = () => {
        navigate("/new") // 태그 <a href="/new" > 유사 기능
    }

    return(<>
        <div className="row mt-3 p-2">
            <div className="row">
                <div className="col-2">
                    <select className="form-select"
                            value={sortType} onChange={onChangeSortType} >
                        {
                            sortOptionList.map((it,idx) => (
                                <option key={idx} value={it.value}>{it.name}</option>
                            ))
                           
                        }
                    </select>
                </div>
                <div className="col-10">
                    <div className="d-grid">
                        <Button type={"outline-danger"} 
                                text={"새 일기 쓰기"} 
                                onClick={onClickNew} />
                    </div>
                </div>
                {/* Diary List 출력: 정렬기준 변경시
                    DiaryItem컴포넌트: 데이터를 받거나 Props로 함수나 배열 같은 참조형 값을
                    받지 않아도  렌더링 작업수행 */}
                <div className="mt-3">
                    {
                        sortedData.map((it) => (
                            <DiaryItem key={it.id} {...it} />
                        ))
                    }
                </div>

            </div>
            
        </div>
    </>)
}

export default DiaryList