import { useLocation } from "react-router-dom"
import ScoreCard from "../../components/ScoreCard/ScoreCard"

const Scores = () => {
    const { state } = useLocation()

    return (
        <div className="w-full flex gap-y-7 flex-col justify-center items-center h-[91vh]">
            <p className="font-bold text-4xl py-10">Your Result</p>
            {
                state.scoresArray.map(s => {
                    return Array.isArray(s[1]) ? 
                        s[1].map(assessment_score => {
                            return <ScoreCard 
                                key={assessment_score}
                                sectionName={assessment_score[0]}
                                score={assessment_score[1]}
                            />
                        })
                        :
                        <ScoreCard
                            key={s}
                            sectionName={s[0]}
                            score={s[1]}
                        />
                })
            }
        </div>
    )
}

export default Scores