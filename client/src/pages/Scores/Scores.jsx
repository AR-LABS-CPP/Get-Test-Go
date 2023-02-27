import { useLocation } from "react-router-dom"
import ScoreCard from "../../components/ScoreCard/ScoreCard"

const Scores = () => {
    const { state } = useLocation()

    return (
        <div className="w-full flex gap-y-7 flex-col justify-center items-center h-[91vh]">
            {
                state.scoresArray.map(s => {
                    return <ScoreCard
                        key={s}
                        sectionName={s[0]}
                        score={s[1]}
                        status={s[2]}
                    />
                })
            }
        </div>
    )
}

export default Scores