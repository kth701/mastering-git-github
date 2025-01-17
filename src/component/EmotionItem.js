import React from "react"

const EmotionItem = ({id, img, name, onClick, isSelected}) => {
    console.log("EmotionItem Render...")
    
    const handleOnClick = () => {
        // 전달 받은 id값을 onClick의 인자값으로 사용
        onClick(id)
    }
    return (<>
    
        <div className={ [ "emotion_item_id", 
                            isSelected ? `EmotionItem_on_${id}`
                                       : `EmotionItem_off`].join(" ") 
                        }
            onClick={handleOnClick}>

            <img src={img} alt={`emotion${id}`} />
            <span>{name}</span>

            {/* <div>{id}</div> */}
            {/* <div>{isSelected}</div> */}
        </div>
    </>)
}

export default React.memo(EmotionItem)