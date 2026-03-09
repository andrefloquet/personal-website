import Image from 'next/image'
import Link from "next/link";

import MenuItem from '@/components/menu-item'
import logo from '@/../public/logo.png'

export default function Header() {
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
                <nav className="flex-1">
                    <ul className="flex flex-row gap-2 items-center justify-center">
                        <MenuItem name="Home" href="/" />
                        <MenuItem name="Skills" href="/skills" />                        
                        <MenuItem name="About" href="/about" />
                    </ul>
                </nav>
            </div>
        </header>
    )
}