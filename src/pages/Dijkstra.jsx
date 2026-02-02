import { useState } from "react";
import AlgorithmLayout from "../components/AlgorithmLayout";
import GraphRenderer from "../features/dijkstra/GraphRenderer";
import { defaultGraph } from "../features/dijkstra/data/graphs";

export default function Dijkstra() {

    const [graph] = useState(defaultGraph);
    const [startId, setStartId] = useState(graph.startId);
    const [endId, setEndId] = useState(graph.endId);

    return (
        <AlgorithmLayout
            title="Dijkstra's Shortest Path Algorithm"

            algoInfo={
                <div>
                    <p className="text-sm text-gray-600">
                        Information about Dijkstra's algorithm will go here.
                    </p>
                </div>
            }

            graphEditor={
                <div className="space-y-4 text-sm">
                    <div>
                        <label className="block font-medium mb-1">Start Node</label>
                        <select
                            className="w-full rounded-md border p-2"
                            value={startId}
                            onChange={(e) => setStartId(e.target.value)}
                        >
                            {graph.nodes.map((node) => (
                                <option key={node.id} value={node.id} disabled={node.id === endId}>
                                {node.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">End Node</label>
                        <select
                            className="w-full rounded-md border p-2"
                            value={endId}
                            onChange={(e) => setEndId(e.target.value)}
                        >
                            {graph.nodes.map((node) => (
                                <option key={node.id} value={node.id} disabled={node.id === startId}>
                                {node.id}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            }

            visualisation={
                <GraphRenderer 
                    graph={graph} 
                    startId={startId}
                    endId={endId}
                />
            }

            metrics={
                <div>
                    <p className="text-sm text-gray-600">
                        Runtime metrics and step explanations will appear here.
                    </p>
                </div>
            }

            whyThisStep={
                <div>
                    <p className="text-sm text-gray-600">
                        Explanations of each step will be displayed here.
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