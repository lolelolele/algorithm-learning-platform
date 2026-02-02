import { Link, NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          "rounded-md px-3 py-2 text-sm font-medium",
          isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
        )
      }
    >
      {children}
    </NavLink>
  );
}

function Dropdown({ label, items }) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        {label} <span className="ml-1">▾</span>
      </button>

      <div className="absolute left-0 z-50 mt-0 hidden w-48 rounded-md border bg-white p-1 shadow-lg group-hover:block">
        {items.map((item) => (
            <Link
                key={item.label}
                to={item.to}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
            {item.label}
            </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const graphItems = [
    { label: "Dijkstra’s", to: "/dijkstra" },
    { label: "A*", to: "/a-star" },
    { label: "BFS", to: "/bfs" },
    { label: "DFS", to: "/dfs" },
  ];

  const sortingItems = [
    { label: "Bubble", to: "/sorting/bubble" },
    { label: "Merge", to: "/sorting/merge" },
    { label: "Quick", to: "/sorting/quick" },
    { label: "Heap", to: "/sorting/heap" },
  ];

  const bstItems = [
    { label: "Search", to: "/bst/search" },
    { label: "Insert", to: "/bst/insert" },
    { label: "Delete", to: "/bst/delete" },
  ];

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-full items-center justify-between px-20 py-4">

        <Link to="/" className="flex items-center gap-8 text-xl font-bold">
          <span>AlgoLearn</span>
        </Link>

        <nav className="flex items-center gap-10">
          <NavItem to="/">Home</NavItem>
          <Dropdown label="Graph Pathfinding" items={graphItems} />
          <Dropdown label="Sorting" items={sortingItems} />
          <Dropdown label="BST Operations" items={bstItems} />
        </nav>

      </div>
    </header>
  );
}
