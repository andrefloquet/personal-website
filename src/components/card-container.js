export default function CardContainer({ children }) {
    return (
        <div className="flex justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            {/* Gallery Container */}
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {children}
            </div>
        </div>
    );
}