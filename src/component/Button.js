
const Button = ({text, type, onClick}) => {

    const btnType = ["success", "danger","secondary", "outline-danger","info"].includes(type) ? type : "primary"


    return (
    <button className={["btn", `btn-${btnType}`,"mx-1" ].join(" ")}
            onClick={onClick}>
        {text}
    </button>
    )
}

// 매개변수있고 전달값이 없을 경우 기본값으로 설정
Button.defaultProps = {
    type: "default"
}
export default Button;