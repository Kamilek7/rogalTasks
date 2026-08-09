const FancyLabel = ({children}) => {
    return <>
        <label className="relative left-[1rem] top-[-1rem] px-[0.5vw] bg-[var(--backdrop)] rounded-[0.5vw]">{children}</label>
    </>
}

export default FancyLabel