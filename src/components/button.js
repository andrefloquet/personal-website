import Link from 'next/link'

export default function Button({ href, children, className }) {
    return (
        <Link href={href} className={`bg-sky-600 font-medium text-lg py-4 px-8 rounded-lg text-white transition hover:bg-sky-700 ${className}`}>
            {children}
        </Link>
    );
}