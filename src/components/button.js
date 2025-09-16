import Link from 'next/link'

export default function Button({ href, children, className }) {
    return (
        <Link href={href} className={`bg-sky-500 text-lg py-4 px-8 rounded-2xl ${className}`}>
            {children}
        </Link>
    );
}