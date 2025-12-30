import Link from "next/link";

export default function MenuItem({ href, name}) {
    return (
        <li className="group">
            <Link href={href}>{name}</Link>
            <div className="mx-2 mt-2 duration-500 border-b-2 opacity-0 border-black group-hover:opacity-100"></div>
        </li>
    )
}