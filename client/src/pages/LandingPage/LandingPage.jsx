import HEADING_IMAGE from "../../assets/Main-Image.png"
import CANDIDATE_IMAGE from "../../assets/CANDIDATE_ICON.png"
import RECRUITER_IMAGE from "../../assets/RECRUITER_ICON.png"

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* NavBar */}
            <div className="flex justify-between items-center border-b-[1px] border-gray-200 shadow-md py-3 px-4">
                <p className="text-blue-500 text-5xl font-bold">GTG</p>
                <button className="bg-blue-500 hover:bg-blue-400 hover:shadow-md text-white w-44 rounded-md h-10">Sign In</button>
            </div>

            {/* Heading and image */}
            <div className="flex justify-center items-center space-x-14 mt-24">
                <p className="w-72 text-justify leading-loose text-gray-700 text-lg">A platform where recruiters and candidates meet together. Get Test Go allows you to showcase your skills and get the right job that you deserve, so why not. Get started right now.</p>
                <img className="w-[600px]" src={HEADING_IMAGE} alt="Heading_Image" />
            </div>

            {/* Types of users */}
            <div className="flex flex-col items-center">
                <div className="py-10 px-9 bg-blue-500 my-24 rounded-3xl mx-10 flex flex-col justify-center items-center space-y-10 lg:w-1/2">
                    <div className="flex space-x-7 mr-auto">
                        <img src={CANDIDATE_IMAGE} alt="Candidate_Image" className="w-44" />
                        <div className="w-96">
                            <p className="text-white text-4xl">Join as a candidate</p>
                            <p className="text-justify mt-5 text-gray-100">Are you looking for that comfortable and right job? well, you can join this platform as a candidate and prove yourself to the recruiters.</p>
                        </div>
                    </div>

                    <div className="flex space-x-7 ml-auto">
                        <div className="w-96">
                            <p className="text-white text-4xl">Join as a recruiter</p>
                            <p className="text-justify mt-5 text-gray-100">Are you looking for a platform where you can find worthy employees? well, Get Test Go ensures that only the best and deserving get the job by passing the candidates through a series of assessments that checks their abilities.</p>
                        </div>
                        <img src={RECRUITER_IMAGE} alt="Candidate_Image" className="w-44" />
                    </div>
                </div>
            </div>

            {/* User comparision */}
            <div className="flex flex-col items-center mb-20">
                <div className="p-10 bg-blue-500 rounded-3xl mx-10 flex justify-center items-center space-x-10 lg:w-1/2">
                    <div className="flex flex-col">
                        <p className="text-2xl text-white">What do you get as a recruiter</p>
                        <span className="py-2"></span>
                        <ol className="flex flex-col space-y-4 text-gray-100">
                            <li>1. Create custom assessment</li>
                            <li>2. Post unlimited number of jobs</li>
                            <li>3. See results and screen candidates</li>
                        </ol>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-2xl text-white">What do you get as a candidate</p>
                        <span className="py-2"></span>
                        <ol className="flex flex-col space-y-4 text-gray-100">
                            <li>1. Search for the right job</li>
                            <li>2. Take assessments and showcase your talent</li>
                            <li>3. Get the job that you deserve</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center my-5">
                <p className="text-3xl font-bold mb-3">Ready to explore?</p>
                <button className="bg-blue-500 hover:bg-blue-400 hover:shadow-md text-white w-44 rounded-md h-10">Sign In</button>
            </div>
        </div>
    )
}

export default LandingPage