import { Monitor, Server, Database, CloudCog, Network, Smartphone } from "lucide-react";

// Map string keys to actual components
const icons = {
    Monitor,
    Server,
    Database,
    CloudCog,
    Network,
    Smartphone,
};

export default function HowCard({ type, title, text, path }) {

    const Icon = icons[type]; 

    return (
        <a href={path} className="block flex flex-col items-center p-6 rounded-sm shadow-md 
            transition-transform duration-300 ease-out hover:-translate-y-2 cursor-pointer 
            focus:outline-none focus-visible:-translate-y-2 focus-visible:shadow-xl
            hover:scale-[1.02] hover:shadow-xl md:items-start">
            <Icon className="w-10 h-10 text-sky-600 mb-4" />
            <h2 className="mt-2 text-lg font-bold mb-3">{title}</h2>
            <p>{text}</p>
        </a>
    );
}