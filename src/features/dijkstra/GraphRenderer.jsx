export default function GraphRenderer({ graph }) {
    const { nodes, edges } = graph;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="-30 0 800 300"
            className="bg-white"
        >
            {/*Edges*/}
            {edges.map((edge) => {
                const from = nodes.find((n) => n.id === edge.from);
                const to = nodes.find((n) => n.id === edge.to);
                
                if (!from || !to) return null;

                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;

                //moves weight label to the right for better viewability
                const isVertical = from.x === to.x;

                const labelX = isVertical ? midX + 15 : midX;
                const labelY = isVertical ? midY : midY - 10;

                return (
                    <g key={edge.id}>
                        <line
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="#9ca3af"
                            strokeWidth="3"
                        />
                        <text
                            x={labelX}
                            y={labelY}
                            fontSize="16"
                            textAnchor="middle"
                            fill="#374151"
                        >
                            {edge.weight}
                        </text>
                    </g>
                );
            })}

            {/*Nodes*/}
            {nodes.map((node) => (
                <g key={node.id}>
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r="28"
                        fill="#ffffff"
                        stroke="#111827"
                        strokeWidth="3"
                    />
                    <text
                        x={node.x}
                        y={node.y + 5}
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                        fill="#111827"
                    >
                    {node.id}
                    </text>
                </g>
            ))}
        </svg>
    );
}