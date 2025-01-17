
const Header = ({title, leftChild, rightChild}) => {
    return(<>
        <div className="row   p-2">
            <div className="col-2">{leftChild}</div>
            <div className="col-8 text-center"><h4 className="m-0">{title}</h4></div>
            <div className="col-2 text-end">{rightChild}</div>
        </div>
    </>)
}

export default Header