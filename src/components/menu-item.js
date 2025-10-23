import Link from "next/link";

export default function MenuItem({ href, name}) {
    return (
        <li className="group">
            <Link href={href}>{name}</Link>
            <div className="mx-2 group-hover:border-b"></div>
        </li>
    )
}