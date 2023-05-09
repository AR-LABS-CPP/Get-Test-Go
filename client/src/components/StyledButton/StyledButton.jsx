const StyledButton = props => {
    return (
        <div className="mt-6">
            <button className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform ${props.background} rounded-md ${props.hoverColor} focus:outline-none ${props.focusColor}`}>
                {props.buttonText}
            </button>
        </div>
    )
}

export default StyledButton