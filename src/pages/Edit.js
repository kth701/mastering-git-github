import { useNavigate, useParams } from "react-router-dom"
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Editor from "../component/Editor";
import Button from "../component/Button";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const Edit = () => {
    // App에서 생성한 메서드 공유
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext)
    // 수정할 일기 id값 받아오기
    const { id } = useParams()
    // 일기 데이터 읽어 오기
    const data = useDiary(id)
    const navigate = useNavigate()

    const goBack = () => {navigate(-1) }
    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요?")){
            onDelete(id)
            navigate("/", {replace: true})
        }
    }

    // 수정할 data값을 받아와서 수정 작업하는 함수호출하여 처리
    const onSubmit = (data) => {
        //console.log(data.content)
        if (window.confirm("일기를 정말 수정할까요?")){
            const { date, content, emotionId } = data
            //console.log(date, content, emotionId)
            onUpdate(id, date, content, emotionId)
            navigate("/", {replace: true})
        }
    }

    if (!data){
        return <div>일기를 불러오고 있습니다.</div>
    } else {
        return (<>
            <div>
                <Header title={"일기 수정하기"}
                        leftChild={<Button  text={" < 뒤로 가기"}   
                                            onClick={goBack} type={"secondary"} />}
                        rightChild={<Button text={"삭제하기"}       
                                            onClick={onClickDelete} type={"danger"} />}   
                        />
                </div>
            
            <div className="m-4 w-75 mx-auto">
                <Editor initDate={data} onSubmit={onSubmit} />
            </div>
        </>)
    }
}
export default Edit