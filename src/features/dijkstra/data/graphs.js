export const defaultGraph = {
    id: "custom-default",
    name: "Custom (Default)",
    nodes: [
        { id:"A", x: 120, y: 120 },
        { id:"B", x: 280, y: 70 },
        { id:"C", x: 280, y: 170 },
        { id:"D", x: 460, y: 110 },
        { id:"E", x: 620, y: 70 },
        { id:"F", x: 620, y: 170 },
    ],
    edges: [
        { id: "A-B", from: "A", to: "B", weight: 4 },
        { id: "A-C", from: "A", to: "C", weight: 2 },
        { id: "B-C", from: "B", to: "C", weight: 1 },
        { id: "B-D", from: "B", to: "D", weight: 5 },
        { id: "C-D", from: "C", to: "D", weight: 8 },
        { id: "C-E", from: "C", to: "E", weight: 10 },
        { id: "D-E", from: "D", to: "E", weight: 2 },
        { id: "D-F", from: "D", to: "F", weight: 6 },
        { id: "E-F", from: "E", to: "F", weight: 2 },
    ],
    startId: "A",
    endId: "F",
};

export const templates = [
    {
        id: "simple-1",
        category: "Simple",
        name: "Simple 1",
        nodes: [
            { id:"A", x: 120, y: 120 },
            { id:"B", x: 300, y: 70 },
            { id:"C", x: 300, y: 170 },
            { id:"D", x: 520, y: 120 },
            { id:"E", x: 700, y: 120 },
        ],
        edges:[
            { id: "A-B", from: "A", to: "B", weight: 3 },
            { id: "A-C", from: "A", to: "C", weight: 2 },
            { id: "B-D", from: "B", to: "D", weight: 4 },
            { id: "C-D", from: "C", to: "D", weight: 1 },
            { id: "D-E", from: "D", to: "E", weight: 2 },
        ],
        startId: "A",
        endId: "E",
    },
    {
        id: "simple-2",
        category: "Simple",
        name: "Simple 2",
        nodes: [
            { id:"A", x: 120, y: 80 },
            { id:"B", x: 120, y: 190 },
            { id:"C", x: 320, y: 80 },
            { id:"D", x: 320, y: 190 },
            { id:"E", x: 540, y: 135 },
        ],
        edges:[
            { id: "A-B", from: "A", to: "B", weight: 2 },
            { id: "A-C", from: "A", to: "C", weight: 5 },
            { id: "B-D", from: "B", to: "D", weight: 3 },
            { id: "C-D", from: "C", to: "D", weight: 1 },
            { id: "C-E", from: "C", to: "E", weight: 2 },
            { id: "D-E", from: "D", to: "E", weight: 4 },
        ],
        startId: "A",
        endId: "E",
    },
    {
        id: "simple-3",
        category: "Simple",
        name: "Simple 3",
        nodes: [
            { id:"A", x: 120, y: 135 },
            { id:"B", x: 300, y: 60 },
            { id:"C", x: 300, y: 210 },
            { id:"D", x: 520, y: 60 },
            { id:"E", x: 520, y: 210 },
            { id:"F", x: 720, y: 135 },
        ],
        edges:[
            { id: "A-B", from: "A", to: "B", weight: 4 },
            { id: "A-C", from: "A", to: "C", weight: 1 },
            { id: "B-D", from: "B", to: "D", weight: 2 },
            { id: "C-E", from: "C", to: "E", weight: 2 },
            { id: "D-F", from: "D", to: "F", weight: 5 },
            { id: "E-F", from: "E", to: "F", weight: 3 },
            { id: "B-C", from: "B", to: "C", weight: 2 },
        ],
        startId: "A",
        endId: "F",
    },
];

//helper to group templates later
export const templateCategories =  ["Simple", "Medium", "Dense"];