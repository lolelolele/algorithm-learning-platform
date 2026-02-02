export function generateDijkstraSteps(graph, startId, endId) {
    const steps = [];

    const nodes = graph.nodes.map((n) => n.id);
    const edges = graph.edges;

    const dist = {};
    const prev = {};
    const visited = new Set();
    const counters = {
        nodeVisits: 0,
        relaxAttempts: 0,
        successfulRelaxations: 0,
    };

    //initialise distances
    nodes.forEach((id) => {
        dist[id] = Infinity;
        prev[id] = null;
    });
    dist[startId] = 0;

    //priority queue (simple array)
    let pq = [{ id: startId, dist: 0}];

    //initial step
    steps.push({
        phase: "init",
        currentNode: null,
        visited: [],
        frontier: [startId],
        dist: { ...dist },
        prev: { ...prev },
        activeEdge: null,
        explanation: `Initialise all distances to infinity except start node ${startId}, which is set to 0.`,
        counters: { ...counters },
    });

    while (pq.length > 0) {
        //pick node with smallest distance
        pq.sort((a, b) => a.dist - b.dist);
        const { id: current } = pq.shift();

        if (visited.has(current)) continue;

        visited.add(current);
        counters.nodeVisits++;

        steps.push({
            phase: "select-node",
            currentNode: current,
            visited: Array.from(visited),
            frontier: pq.map((n) => n.id),
            dist: { ...dist },
            prev: { ...prev },
            activeEdge: null,
            explanation: `Select node ${current} as it has the smallest tentative distance.`,
            counters: { ...counters },
        });

        if (current === endId) break;

        //relax outgoing edges
        const outgoing = edges.filter(
            (e) => e.from === current || e.to === current
        );

        for(const edge of outgoing) {
            const neighbour =
                edge.from === current ? edge.to : edge.from;
            
            if (visited.has(neighbour)) continue;
        
            counters.relaxAttempts++;

            steps.push({
                phase: "relax-edge",
                currentNode: current,
                visited: Array.from(visited),
                frontier: pq.map((n) => n.id),
                dist: { ...dist },
                prev: { ...prev },
                activeEdge: edge.id,
                explanation: `Check edge ${current} -> ${neighbour} with weight ${edge.weight}.`,
                counters: { ...counters },
            });

            const newDist = dist[current] + edge.weight;

            if (newDist < dist[neighbour]) {
                dist[neighbour] = newDist;
                prev[neighbour] = current;
                pq.push({ id: neighbour, dist: newDist});
                counters.successfulRelaxations++;

                steps.push({
                    phase: "update-distance",
                    currentNode: current,
                    visited: Array.from(visited),
                    frontier: pq.map((n) => n.id),
                    dist: { ...dist },
                    prev: { ...prev },
                    activeEdge: edge.id,
                    explanation: `Update distance of ${neighbour} to ${newDist} via ${current}.`,
                    counters: { ...counters },
                });
            }
        }
    }

    //final step
    steps.push({
        phase: "final",
        currentNode: endId,
        visited: Array.from(visited),
        frontier: [],
        dist: { ...dist },
        prev: { ...prev },
        activeEdge: null,
        explanation: `Dijkstra's algorithm has completed. The shortest path to ${endId} has been found`,
        counters: { ...counters },
    });

    return steps;
}