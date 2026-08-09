function PageButton({clickFunc, icon, optional=false}) {
    return <>
        <button className={`w-[10%] m-[1vw] ${optional && "optional"}`} onClick={clickFunc}><i className={icon}></i></button>
    </>
}
export default PageButton