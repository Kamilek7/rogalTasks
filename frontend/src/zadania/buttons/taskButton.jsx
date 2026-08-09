const TaskButton = ({type, fun, icon, style=undefined}) => {
    return (<>
         <div className={`border-transparent border-2 bg-[var(--task-${type}-base)] hover:border-[var(--task-${type}-hover)] hover:cursor-pointer`} onClick={fun}> 
            <i className={icon} style={style}></i> 
        </div>
    </>)
}
export default TaskButton