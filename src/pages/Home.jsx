import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold">Interactive Algorithm Learning Platform</h1>

                <p className="mt-3 text-gray-700">
                    Prototype for IPD: navifation + Dijkstra's shortest path visualisation.
                </p>

                <div className="mt-6">
                    <Link
                        to="dijkstra"
                        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white">
                        Open Dijkstra Visualisation
                    </Link>
                </div>
            </div>
        </div>
    );
}