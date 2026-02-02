import AlgorithmLayout from "../components/AlgorithmLayout";

export default function Dijkstra() {
    return (
        <AlgorithmLayout
            title="Dijkstra's Shortest Path Algorithm"
            leftPanel={
                <div>
                    <p className="text-sm text-gray-600">
                        Information about Dijkstra's algorithm will go here.
                    </p>
                </div>
            }
            visualisation={
                <div className="flex h-full items-center justfify-centre text-gray-500">
                    Graph Visualisation Area
                </div>
            }
            rightPanel={
                <div>
                    <p className="text-sm text-gray-600">
                        Runtime metrics and step explanations will appear here.
                    </p>
                </div>
            }
            controls={
                <div className="flex items-center justify-between text-sm">
                    <span>Controls placeholder</span>
                    <span>Step: 0 / 0</span>
                </div>
            }
        />
    );
}