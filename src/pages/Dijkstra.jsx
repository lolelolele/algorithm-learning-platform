import { useState, useEffect } from "react";
import AlgorithmLayout from "../components/AlgorithmLayout";
import GraphRenderer from "../features/dijkstra/GraphRenderer";
import { defaultGraph, templates } from "../features/dijkstra/data/graphs";
import { generateDijkstraSteps } from "../features/dijkstra/logic/dijkstraSteps";
import playIcon from "../assets/icons/play.png";
import pauseIcon from "../assets/icons/pause.png";
import stepForwardIcon from "../assets/icons/step_forward.png";
import stepBackwardIcon from "../assets/icons/step_backward.png";
import resetIcon from "../assets/icons/reset.png";


export default function Dijkstra() {

    const [graph, setGraph] = useState(defaultGraph);
    const [selectedTemplateId, setSelectedTemplateId] = useState("custom");

    const [startId, setStartId] = useState(graph.startId);
    const [endId, setEndId] = useState(graph.endId);
    const [stepIndex, setStepIndex] = useState(0);

    const steps = generateDijkstraSteps(graph, startId, endId);
    const safeStepIndex = Math.min(stepIndex, steps.length - 1);
    const currentStep = steps[safeStepIndex];

    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1)


    useEffect(() => {
        setIsPlaying(false);
        setStepIndex(0);
    }, [startId, endId]);

    useEffect(() => {
        if (!isPlaying) return;

        //stops autoplay when last step has been reached
        if (safeStepIndex >= steps.length - 1) {
            setIsPlaying(false);
            return;
        }

        const timer = setTimeout(() => {
            setStepIndex((i) => Math.min(i + 1, steps.length - 1));
        }, 700/speed);

        return () => clearTimeout(timer);
    }, [isPlaying, speed, safeStepIndex, steps.length]);

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
                        <label className="block font-medium mb-1">Graph Templates:</label>

                        <select 
                            className="w-full rounded-md border p-2" 
                            value={selectedTemplateId}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedTemplateId(value);

                                setIsPlaying(false);
                                setStepIndex(0);

                                if (value === "custom") {
                                    setGraph(defaultGraph);
                                    setStartId(defaultGraph.startId);
                                    setEndId(defaultGraph.endId);
                                } else {
                                    const selected = templates.find(t => t.id ===value);
                                    if (selected) {
                                        setGraph(selected);
                                        setStartId(selected.startId);
                                        setEndId(selected.endId);
                                    }
                                }
                            }}

                        >
                            <option value="custom">Custom (Default)</option>

                            <optgroup label="Simple">
                                {templates
                                    .filter(t => t.category === "Simple")
                                    .map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                            </optgroup>

                            <optgroup label="Medium">
                                {templates
                                    .filter(t => t.category === "Medium")
                                    .map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                            </optgroup>

                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Start Node:</label>
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
                        <label className="block font-medium mb-1">End Node:</label>
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

                <div className="flex items-center justify-between gap-4">
                    
                    {/*Left control panel buttons*/}
                    <div className="flex items-center gap-2">
                        {/*Step Backwards button*/}
                        <button
                            type="button"
                            title="Step Backward"
                            aria-label="Step Backward"
                            disabled={safeStepIndex === 0}
                            onClick={() => {
                                setIsPlaying(false);
                                setStepIndex((i) => Math.max(i - 1, 0));
                            }}
                            className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white text-lg"
                        >
                            <img 
                            src={stepBackwardIcon} 
                            alt="Step Back"
                            className="h-6 w-5"
                            />
                        </button>

                        {/*Play and pause button*/}
                        <button
                            type="button"
                            title={isPlaying ? "Pause" : "Play"}
                            aria-label={isPlaying ? "Pause" : "Play"}
                            disabled={steps.length <= 1}
                            onClick={() => setIsPlaying((p) => !p)}
                            className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white text-lg"
                        >
                            <img 
                            src={isPlaying ? pauseIcon : playIcon} 
                            alt={isPlaying ? "Pause" : "Play"} 
                            className="h-6 w-5"
                            />
                        </button>

                        {/*Step Forward button*/}
                        <button
                            type="button"
                            title="Step Forward"
                            aria-label="Step Back"
                            disabled={safeStepIndex >= steps.length - 1}
                            onClick={() => {
                                setIsPlaying(false);
                                setStepIndex((i) => Math.min(i + 1, steps.length - 1));
                            }}
                            className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white text-lg"
                        >
                            <img 
                            src={stepForwardIcon} 
                            alt="Step Forward"
                            className="h-6 w-5"
                            />
                        </button>

                        {/*Reset button*/}
                        <button
                            type="button"
                            title="Reset"
                            aria-label="Reset"
                            onClick={() => {
                                setIsPlaying(false);
                                setStepIndex(0);
                            }}
                            className="rounded-md border px-3 py-1 hover:bg-gray-100 text-lg"
                        >
                            <img 
                            src={resetIcon} 
                            alt="Reset"
                            className="h-6 w-5"
                            />
                        </button>
                    </div>

                    {/*Middle control panel: speed slider*/}
                    <div className="flex items-center gap-3">
                        <span>Speed: </span>

                        <input
                            type="range"
                            min="0.25"
                            max="2"
                            step="0.25"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-40"
                        />

                        <span className="text-xs text-gray-500">{speed}x</span>
                    </div>

                    {/*Right control panel: step counter*/}
                    <div className="text-gray-700">
                        Step: {safeStepIndex + 1} / {steps.length}
                    </div>
                </div>
                
            }
        />
    );
}