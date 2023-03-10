const ScoreCard = (props) => {
    return (
        <div className="w-1/2 grid grid-cols-2 border-[1px] justify-between rounded-lg shadow-md">
            <p className="text-white rounded-tl-lg rounded-bl-lg py-5 font-bold text-xl flex-1 text-center bg-blue-500">{props.sectionName}</p>
            <p className="flex-1 flex flex-col items-center justify-center border-[1px] text-3xl font-medium">{props.score}</p>
        </div>
    )
}

export default ScoreCard