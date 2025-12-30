export default function CardContainer({ children }) {
    return (
        <div className="flex justify-center bg-white space-y-10 rounded-sm shadow-md md:p-10">
            {/* Gallery Container */}
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {children}
            </div>
        </div>
    );
}