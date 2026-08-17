const TaskButton = ({type, fun, icon, style=undefined}) => {
    const colorsBase = {
        "finished": "bg-[var(--task-finished-base)]",
        "removed" : "bg-[var(--task-removed-base)]",
        "edit": "bg-[var(--task-edit-base)]",
        "unwrap" : "bg-[var(--task-unwrap-base)]",
    }
    const colorsHover = {
        "finished": "hover:border-[var(--task-finished-hover)]",
        "removed" : "hover:border-[var(--task-removed-hover)]",
        "edit": "hover:border-[var(--task-edit-hover)]",
        "unwrap" : "hover:border-[var(--task-unwrap-hover)]",
    }
    return (<>
         <div className={`border-transparent border-2 ${colorsBase[type]} ${colorsHover[type]} hover:cursor-pointer`} onClick={fun}> 
            <i className={icon} style={style}></i> 
        </div>
    </>)
}
export default TaskButton