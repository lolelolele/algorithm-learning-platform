import { useState, useEffect } from "react";
import AlgorithmLayout from "../components/AlgorithmLayout";
import GraphRenderer from "../features/dijkstra/GraphRenderer";
import { defaultGraph } from "../features/dijkstra/data/graphs";
import { generateDijkstraSteps } from "../features/dijkstra/logic/dijkstraSteps";

export default function Dijkstra() {

    const [graph] = useState(defaultGraph);
    const [startId, setStartId] = useState(graph.startId);
    const [endId, setEndId] = useState(graph.endId);
    const [stepIndex, setStepIndex] = useState(0);

    const steps = generateDijkstraSteps(graph, startId, endId);
    const safeStepIndex = Math.min(stepIndex, steps.length - 1);
    const currentStep = steps[safeStepIndex];

    useEffect(() => {
        setStepIndex(0);
    }, [startId, endId]);

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
                    step={currentStep}
                />
            }

            metrics={
                <div className="space-y-4 text-sm text-gray-700">
                    <div>
                        <h3 className="font-medium">Complexity</h3>
                        <ul className="mt-2 space-y-1 text-gray-600">
                            <li>Time: O((V + E) log V)</li>
                            <li>Space: O(V+E)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium">Live Counters</h3>
                        <ul className="mt-2 space-y-1 text-gray-600">
                            <li>Node visits: {currentStep?.counters?.nodeVisits ?? 0}</li>
                            <li>Relax attempts: {currentStep?.counters?.relaxAttempts ?? 0}</li>
                            <li>Successful relaxations: {currentStep?.counters?.successfulRelaxations ?? 0}</li>
                        </ul>
                    </div>
                </div>
            }

            whyThisStep={
                <div className="text-sm text-gray-700 space-y-2">
                    <div className="text-xs text-gray-500">
                        Phase: {currentStep?.phase ?? "-"}
                    </div>

                    <p className="leading-relaxed">
                        {currentStep?.explanation ?? "No explanation available for this step yet."}
                    </p>
                </div>
            }

            controls={
                <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                setStepIndex((i) => Math.max(i - 1, 0))
                            }
                            className="rounded-md border px-3 py-1 hover:bg-gray-100"
                        >
                            Back
                        </button>

                        <button
                            onClick={() =>
                                setStepIndex((i) => Math.min(i + 1, steps.length - 1))
                            }
                            className="rounded-md border px-3 py-1 hover:bg-gray-100"
                        >
                            Next
                        </button>
                    </div>

                    <span>
                        Step: {safeStepIndex + 1} / {steps.length}
                    </span>
                </div>
            }
        />
    );
}