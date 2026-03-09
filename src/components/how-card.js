import {
    Bot,
    BriefcaseBusiness,
    CloudCog,
    Cog,
    Database,
    Languages,
    Monitor,
    Network,
    Palette,
    PlugZap,
    Server,
    Smartphone,
    Wrench,
} from 'lucide-react';

// Map string keys to actual components
const icons = {
    Monitor,
    Server,
    Database,
    CloudCog,
    Network,
    Smartphone,
    Palette,
    Bot,
    Cog,
    Wrench,
    PlugZap,
    BriefcaseBusiness,
    Languages,
};

export default function HowCard({ type, title, text, path }) {

    const Icon = icons[type] || Server; 

    return (
        <a
            href={path}
            className="group mx-auto block w-full max-w-sm cursor-pointer rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl focus:outline-none focus-visible:-translate-y-1 focus-visible:border-sky-300 focus-visible:shadow-xl sm:mx-0 sm:max-w-none sm:text-left"
        >
            <div className="mb-4 inline-flex rounded-lg bg-sky-50 p-3 transition-colors duration-300 group-hover:bg-sky-100">
                <Icon className="h-7 w-7 text-sky-600 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">{title}</h2>
            <p className="text-sm leading-6 text-slate-600">{text}</p>
        </a>
    );
}