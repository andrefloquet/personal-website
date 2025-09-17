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

export default function HowCard({ type, title, text }) {

    const Icon = icons[type]; 

    return (
        <div className="flex flex-col items-center p-6 rounded-sm shadow-md md:items-start">
            <Icon className="w-10 h-10 text-sky-600 mb-4" />
            <h2 className="mt-2 text-lg font-bold mb-3">{title}</h2>
            <p>{text}</p>
        </div>
    );
}