import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dijkstra from "./pages/Dijkstra";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Graph Pathfinding */}
        <Route path="/dijkstra" element={<Dijkstra />} />
        <Route path="/a-star" element={<Placeholder />} />
        <Route path="/bfs" element={<Placeholder />} />
        <Route path="/dfs" element={<Placeholder />} />

        {/* Sorting */}
        <Route path="/sorting/bubble" element={<Placeholder />} />
        <Route path="/sorting/merge" element={<Placeholder />} />
        <Route path="/sorting/quick" element={<Placeholder />} />
        <Route path="/sorting/heap" element={<Placeholder />} />

        {/* BST */}
        <Route path="/bst/search" element={<Placeholder />} />
        <Route path="/bst/insert" element={<Placeholder />} />
        <Route path="/bst/delete" element={<Placeholder />} />
      
      </Routes>
    </BrowserRouter>
  );
}
