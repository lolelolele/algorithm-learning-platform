function reconstructPathNodes(prev, startId, endId) {
    //return empty path if the end is unreachable
    if (endId !== startId && prev[endId] == null) return [];

    const path = [];
    let current = endId;

    //walk backwards using previous pointers
    while (current != null) {
        path.push(current);
        if (current === startId) break;
        current = prev[current];
    }

    //if start is never reached, it is unreachable
    if (path[path.length - 1] !== startId) return [];

    return path.reverse();
}

function pathNodesToEdgeIds(pathNodes, edges) {
    const edgeIds = [];

    for (let i = 0; i < pathNodes.length - 1; i++) {
        const a = pathNodes[i];
        const b = pathNodes[i + 1];

        const e = edges.find(
            (edge) =>
                (edge.from === a && edge.to === b) || (edge.from === b && edge.to === a)
        );

        if (e) edgeIds.push(e.id);
    }
    return edgeIds;
}

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

    const shortestPathNodes = reconstructPathNodes(prev, startId, endId);
    const shortestPathEdges = pathNodesToEdgeIds(shortestPathNodes, edges);

    //final step
    steps.push({
        phase: "final",
        currentNode: endId,
        visited: Array.from(visited),
        frontier: [],
        dist: { ...dist },
        prev: { ...prev },
        activeEdge: null, shortestPathNodes, shortestPathEdges,
        explanation: 
            shortestPathNodes.length > 0
                ? `Dijkstra's algorithm has completed. Highlighting the shortest path from ${startId} to ${endId}.`
                : `Dijkstra's algorithm has completed. No path exists from ${startId} to ${endId}.`,
        counters: { ...counters },
    });

    return steps;
}