import { emotionList, getEmotionImgById } from "../uitl"
import "./Viewer.css"

const Viewer = ({content, emotionId}) => {
    const emotionItem = emotionList.find( (it) => it.id === emotionId)

    return (<>
        <div>
            <h4 className="fs-5 text-danger-emphasis text-center">오늘의 감정</h4>
        </div>
        <div className="w-25 mx-auto m-3">
            {/* 감정 이모션 배경색 설정 */}
            <div className={ [ "emotion_item_id ",
                    `EmotionItem_on_${emotionId}`].join(" ")   }>

                <img src={getEmotionImgById(emotionId)} />
                <div>{emotionItem.name}</div>
            </div>
        </div>
        <div>
            <h4 className="fs-5 text-primary text-center">오늘의 일기</h4>
        </div>
        <div className="w-75 mx-auto m-4 text-danger alert alert-danger  ">
            <div className="content_box" >{content}</div>
        </div>

    </>)
}

export default Viewer