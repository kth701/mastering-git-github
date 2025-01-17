import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import { getFormattedDate } from "../uitl";
import Button from "../component/Button";
import Viewer from "../component/Viewer";



// --------------------------------------------------- //
// Diary페이지 구현 
// 특정 일기를 상세 조회하는 페이지
// --------------------------------------------------- //
const Diary = () => {

    // 1. URL path에서 설정된 매개변수 값 읽기
    // "/dary/id=값" 
    const {id} = useParams();

    /* const params = useParams();
    console.log(id)
    console.log(params, params.id) */

    const data = useDiary(id)

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    // 일기 데이터 없을 경우
    if (!data){
        return <div className="alert alert-warning">일기를 불러오고 있습니다..</div>

    }else { // 일기 데이터 있을 경우
        const { date, emotionId, content } = data
        // 일기 날짜형식 설정
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`


        return (
        <div>
           
            <Header 
                title={title}
                leftChild={<Button text={"< 뒤로 가기"} type="secondary"  onClick={goBack} />}
                rightChild={<Button text={"수정하기"} type="danger" onClick={goEdit} />}
            />
            <div className="m-3 p-3 alert alert-light ">
                <Viewer
                    content={content}
                    emotionId={emotionId} />
            </div>
        </div>)
        }
}
export default Diary;