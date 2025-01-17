import { useNavigate } from "react-router-dom"
import { getEmotionImgById } from "../uitl"
import Button from "./Button"
import "./EmotionItem.css"
import React from "react"


const DiaryItem = ({id, emotionId, content, date}) => {
    console.log("DiaryItem Render...")

    const navigate = useNavigate()


    // 수정 버튼 이벤트 함수
    const goEdit = () => {
        // 링크
        navigate(`/diary/${id}`)

    }

    return (<>
        <div className="row border m-2 p-3">
            {/* 이미지 및 배경색 */}
            <div className="col-3 d-flex justify-content-center align-items-center">
                {/* 감정 이모션 배경색 설정 */}
                <div className={ [ "emotion_item_id ",
                                   `EmotionItem_on_${emotionId}`].join(" ")   }>
                    <img src={getEmotionImgById(emotionId)} />
                </div>
            </div>

            {/* 날짜, 내용 */} 
            <div className="col-6 p-3">
                <div className="fs-2">
                    <span className="mx-3">{new Date(parseInt(date)).toLocaleDateString()}</span>
                </div>
                <div className="fs-4 text-body-secondary">
                    {/* 내용이 긴 경우 25자이내 */}
                    {content.slice(0,25)}
                </div>
            </div>

            {/* 작업 버튼 */}
            <div className="col-3 p-3 d-flex justify-content-end align-items-start">
                <Button type={"info"} 
                        text={"수정하기"}
                        onClick={goEdit} />
            </div>
        </div>
    </>)
}

/* Diary List 출력: 정렬기준 변경시
    DiaryItem컴포넌트: 데이터를 받거나 Props로 함수나 배열 같은 참조형 값을
    받지 않아도  렌더링 작업수행하지 않게 최적화 작업 설정
 */
export default React.memo(DiaryItem)