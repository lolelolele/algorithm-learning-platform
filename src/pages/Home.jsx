import { Link } from "react-router-dom"

export default function Home() {
    return (
        // home page provides an overview and shows the project scope
        <div className="h-[calc(100vh-80px)] bg-gray-50 flex flex-col overflow-hidden">
            <main className="flex-1 w-full max-w-full px-8 py-6 flex flex-col gap-6 min-h-0">

                <section className="h-80 rounded-md border bg-white p-8 flex-shrink-0 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-center">Interactive Learning Platform</h1>
                    <p className="mt-3 text-gray-600 text-center">
                        Master algorithms through visualisation & interaction.
                    </p>
                </section>

                <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">

                    <section className="rounded-md border bg-white p-6 overflow-auto flex flex-col">
                        <h2 className="text-xl font-semibold mb-4">Graph Pathfinding:</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>Dijkstra's Algorithm</li>
                            <li>A* Search</li>
                            <li>BFS</li>
                            <li>DFS</li>
                        </ul>
                    </section>

                    <section className="rounded-md border bg-white p-6 overflow-auto">
                        <h2 className="text-xl font-semibold mb-4">Sorting Algorithms</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>Bubble Sort</li>
                            <li>Merge Sort</li>
                            <li>Quick Sort</li>
                            <li>Heap Sort</li>
                        </ul>
                    </section>

                    <section className="rounded-md border bg-white p-6 overflow-auto">
                        <h2 className="text-xl font-semibold mb-4">BST Operations:</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>Search</li>
                            <li>Insert</li>
                            <li>Delete</li>
                        </ul>
                    </section>
                </div>

                <section className="rounded-md border bg-white p-6 flex-shrink-0">
                    <div className="flex gap-40 text-gray-700">
                        <h2 className="text-lg font-semibold mb-3">Features:</h2>
                        <span>• Step-by-step visualisation</span>
                        <span>• Challenge Mode</span>
                        <span>• Real-time metrics</span>
                    </div>
                </section>
            </main>
        </div>
    );
}