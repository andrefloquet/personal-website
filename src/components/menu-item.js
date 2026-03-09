import Link from "next/link";

export default function MenuItem({ href, name}) {
    return (
        <li>
            <Link
                href={href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-sky-100 hover:text-sky-700"
            >
                {name}
            </Link>
        </li>
    )
}