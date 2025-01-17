
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
    const { onCreate } = useContext(DiaryDispatchContext)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const { date, content, emotionId} = data
        console.log("Diary input 후 :", content)
        onCreate(date, content, emotionId)
        navigate("/", {replace: true})
    }


    const goBack = () => {
        navigate(-1)
    }

    return (<>
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button text={"<뒤로 가기"} 
                                    type="secondary" 
                                    onClick={goBack} />}
                />

            <div className="m-2 w-75 p-5 mx-auto border  ">
                <Editor onSubmit={onSubmit} />
            </div>
        </div>
    </>)
}
export default New;
