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

function formatFrontier(pq) {
    if (!pq || pq.length === 0) return "∅";
    
    const copy = [...pq].sort((a, b) => a.dist - b.dist);
    return copy.map((n) => `${n.id}(${n.dist})`).join(", ");
}

function snapshotPQ(pq) {
    return[...pq]
        .sort((a, b) => a.dist - b.dist)
        .map((x) => ({ id: x.id, dist:x.dist }));
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
        frontier: pq.map((n) => n.id),
        frontierWithDist: formatFrontier(pq),
        dist: { ...dist },
        prev: { ...prev },
        activeEdge: null,
        explanationParts:{
            rule: "Initialise tentative distances",
            reason: "At the start, we assume all nodes are unreachable (∞) until proven otherwise.",
            effect: `Set dist [${startId}] = 0 because the start node is distance 0 from itself.`, 
        },
        counters: { ...counters },
        pq: snapshotPQ(pq),
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
            frontierWithDist: formatFrontier(pq),
            dist: { ...dist },
            prev: { ...prev },
            activeEdge: null,
            explanationParts:{
                rule: "Pick the frontier node with the smallest tentative distance",
                reason: "With non-negative weights, the smallest tentative distance is guaranteed to be final (greedy choice).",
                effect: `Node ${current} becomes 'visited' (finalised). We now relax its outgoing edges.`, 
            },
            counters: { ...counters },
            pq: snapshotPQ(pq),
        });

        //early exit if we reached end
        if (current === endId) break;

        //relax outgoing edges
        const outgoing = edges.filter(
            (e) => e.from === current || e.to === current
        );

        for(const edge of outgoing) {
            const neighbour = edge.from === current ? edge.to : edge.from;
            
            if (visited.has(neighbour)) continue;
        
            counters.relaxAttempts++;

            const oldDist = dist[neighbour];
            const newDist = dist[current] + edge.weight;

            steps.push({
                phase: "relax-edge",
                currentNode: current,
                visited: Array.from(visited),
                frontier: pq.map((n) => n.id),
                frontierWithDist: formatFrontier(pq),
                dist: { ...dist },
                prev: { ...prev },
                activeEdge: edge.id,
                explanationParts:{
                    rule: "Relaxation check",
                    reason: "Try to improve the best known distance to a neighbour using the current node.",
                    effect: `Try ${current} -> ${neighbour}: ${dist[current]} + ${edge.weight} = ${newDist} (current best: ${oldDist === Infinity ? "∞" : oldDist}).`, 
                },
                counters: { ...counters },
                pq: snapshotPQ(pq),
            });

            //push neighbours into queue when a better distance is found
            if (newDist < dist[neighbour]) {

                //successful relaxation
                dist[neighbour] = newDist;
                prev[neighbour] = current;
                pq.push({ id: neighbour, dist: newDist});
                counters.successfulRelaxations++;

                steps.push({
                    phase: "update-distance",
                    currentNode: current,
                    visited: Array.from(visited),
                    frontier: pq.map((n) => n.id),
                    frontierWithDist: formatFrontier(pq),
                    dist: { ...dist },
                    prev: { ...prev },
                    activeEdge: edge.id,
                    explanationParts:{
                        rule: "Update distance (successful relaxation)",
                        reason: "We found a shorter path to the neighbour through the current node.",
                        effect: `Accept the new path. ${neighbour} now has distance ${newDist} via ${current}.`, 
                    },
                    counters: { ...counters },
                    pq: snapshotPQ(pq),
                });
            } else {
                //explicit step for failed relaxation
                steps.push({
                    phase: "no-update",
                    currentNode: current,
                    visited: Array.from(visited),
                    frontier: pq.map((n) => n.id),
                    frontierWithDist: formatFrontier(pq),
                    dist: { ...dist },
                    prev: { ...prev },
                    activeEdge: edge.id,
                    explanationParts:{
                        rule: "No update (failed relaxation)",
                        reason: "The alternative path is not better than the best-known distance.",
                        effect: `Reject the new path.  ${newDist} is not better than the current distance ${oldDist}.`, 
                    },
                    counters: { ...counters },
                    pq: snapshotPQ(pq),
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
        frontierWithDist: "∅",
        dist: { ...dist },
        prev: { ...prev },
        activeEdge: null, shortestPathNodes, shortestPathEdges,
        explanationParts: 
            shortestPathNodes.length > 0
                ? {
                    rule: "Reconstruct the shortest path",
                    reason: "We stored predecessors (prev during relaxations, so we can backtrack from the end  node.",
                    effect: `Highlight path ${shortestPathNodes.join("->")}.`,
                }
                : {
                    rule: "Terminate",
                    reason: "All reachable nodes have been finalised, but the end node was not reachable.",
                    effect: `No path exists from ${startId} to ${endId}.`,
                },
        counters: { ...counters },
        pq: snapshotPQ(pq),
    });

    return steps;
}