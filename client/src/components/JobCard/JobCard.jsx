const JobCard = (props) => {
    return (
        <div>
            <p className="w-full text-center text-white font-bold bg-emerald-500 rounded-tl-lg rounded-tr-lg">{props.badgeText}</p>
            <div className={`w-full h-72 flex flex-col justify-around border-[1px] border-gray-300 shadow-lg h-92 rounded-bl-lg rounded-br-lg overflow-hidden ${props.additionalStyling}`}>
                <p className="p-2 text-center text-2xl font-bold text-gray-600">
                    {props.cardTitle}
                </p>
                <p className="p-2 h-24 text-center overflow-ellipsis">{props.cardDescription}</p>
                <div className="flex justify-center items-center">
                    <button className="w-1/2 bg-emerald-600 hover:bg-emerald-500 py-2 text-white rounded-md" onClick={props.viewClickHandler}>View</button>
                </div>
            </div>
        </div>
    )
}

export default JobCard