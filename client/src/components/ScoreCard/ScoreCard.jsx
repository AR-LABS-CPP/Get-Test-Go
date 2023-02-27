const ScoreCard = (props) => {
    return (
        <div className="w-96 border-[1px] flex justify-between rounded-lg shadow-md">
            <p className="text-white rounded-tl-lg rounded-bl-lg py-5 font-bold text-xl flex-1 text-center bg-blue-500">{props.sectionName}</p>
            <p className="flex-1 flex flex-col items-center justify-center border-[1px] text-3xl">{props.score}</p>
            <p className={`text-white text-xl rounded-tr-lg rounded-br-lg flex-1 flex flex-col items-center justify-center ${props.status === "Passed" ? "bg-green-500" : "bg-red-600"}`}>{props.status}</p>
        </div>
    )
}

export default ScoreCard