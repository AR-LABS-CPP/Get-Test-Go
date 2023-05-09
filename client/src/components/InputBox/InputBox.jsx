const InputBox = props => {
    return (
        <div className="mb-2">
            <label
                htmlFor={props.labelFor}
                className="block text-sm font-semibold text-gray-800"
            >
                {props.placeholder}
            </label>
            <input
                id={props.labelFor}
                name={props.labelFor}
                type={props.inputType}
                className="block w-full py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={props.inputValue}
                onChange={props.onInputChange}
            />
        </div>
    );
}

export default InputBox