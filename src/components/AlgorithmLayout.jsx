export default function AlgorithmLayout({
    title,
    leftPanel,
    visualisation,
    rightPanel,
    controls,
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/*Algorithm page header*/}
            <header className="border-b bg-white px-6 py-4">
                <h1 className="text-xl font-bold">{title}</h1>
            </header>

            {/*Main content area*/}
            <main className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-6 py-6">
                {/*Left panel*/}
                <aside className="col-span-3 rounded-md border bg-white p-4">
                    {leftPanel}
                </aside>

                {/*Visualisation area*/}
                <section className="col-span-6 rounded-md border bg-white p-4">
                    {visualisation}
                </section>

                {/*Right Panel*/}
                <section className="col-span-3 rounded-md border bg-white p-4">
                    {rightPanel}
                </section>
            </main>

            {/*Bottom control bar*/}
            <footer className="border-t bg-white px-6 py-4">
                {controls}
            </footer>
        </div>
    );
}