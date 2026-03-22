 'use client'

import { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Menu, X } from "lucide-react";

import MenuItem from '@/components/menu-item'
import logo from '@/../public/logo.png'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuLinks = [
        { name: "Home", href: "/" },
        { name: "Skills", href: "/skills" },
        { name: "Experience", href: "/#experience" },
        { name: "Education", href: "/#education" },
        { name: "Certifications", href: "/#certifications" },
        { name: "Contact", href: "/#contact" },
        { name: "About", href: "/about" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-sky-100 bg-slate-50/95 backdrop-blur">
            <div className="flex flex-row justify-between items-center max-w-9/10 mx-auto py-3">
                <div className="flex-none">
                    <Link href="/">
                        <Image 
                            src={logo} 
                            alt="Website logo" 
                            className="h-16 w-16 md:h-20 md:w-20"
                        />
                    </Link>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 transition hover:bg-sky-100 md:hidden"
                    aria-label="Toggle navigation menu"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                <nav className="hidden flex-1 md:block">
                    <ul className="flex flex-row gap-2 items-center justify-center">
                        <MenuItem name="Home" href="/" />
                        <MenuItem name="Skills" href="/skills" />
                        <MenuItem name="Experience" href="/#experience" />
                        <MenuItem name="Education" href="/#education" />
                        <MenuItem name="Certifications" href="/#certifications" />
                        <MenuItem name="Contact" href="/#contact" />
                        <MenuItem name="About" href="/about" />
                    </ul>
                </nav>
            </div>

            {isOpen && (
                <nav className="border-t border-slate-200 bg-white md:hidden">
                    <ul className="mx-auto max-w-9/10 py-3">
                        {menuLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block rounded-md px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-sky-100 hover:text-sky-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    )
}