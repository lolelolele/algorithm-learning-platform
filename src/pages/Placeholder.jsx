import { useLocation } from "react-router-dom";

export default function Placeholder() {
    /* reads current route so the placeholder can diplay which page is under development */
    const location = useLocation();

    return (
        <div className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-2xl font-bold">Page under development</h1>

                <p className="mt-3 text-gray-700">
                    This feature is planned for a later phase of the project.
                </p>

                <div className="mt-6 rounded-md bg-gray-100 p-4 text-sm text-gray-600">
                    Route: <code>{location.pathname}</code>
                </div>

            </div>
        </div>
    );
}