function Button({clickFunc, children, customColor=null}) {
    return <>
        <button style={customColor!=null?{backgroundColor:customColor}:undefined} className={'block w-[40%] my-[2vw] mx-auto'} onClick={clickFunc}>{children}</button>
    </>
}
export default Button