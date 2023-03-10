import { useLocation } from "react-router-dom"
import ScoreCard from "../../components/ScoreCard/ScoreCard"
import { combineTwoElements, reduceDimensions } from "../../utils/REDUCE_ARR_DIM"

const Scores = () => {
    const { state } = useLocation()

    return (
        <div className="w-full flex gap-y-7 flex-col justify-center items-center h-[91vh]">
            <p className="font-bold text-4xl py-10">Your Result</p>
            {
                combineTwoElements(reduceDimensions(state.scoresArray)).map(score => {
                    return <ScoreCard
                        sectionName={score[0]}
                        score={score[1]}
                    />
                })
            }
        </div>
    )
}

export default Scores