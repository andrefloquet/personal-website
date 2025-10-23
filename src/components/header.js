import Image from 'next/image'
import Link from "next/link";

import MenuItem from '@/components/menu-item'
import logo from '@/../public/logo.png'

export default function Header() {
    return (
        <header className="bg-sky-100">
            <div className="flex flex-row justify-between items-center max-w-9/10 mx-auto bg-sky-100 pt-4">
                <div className="flex-none">
                    <Link href="/">
                        <Image 
                            src={logo} 
                            alt="Website logo" 
                            className="w-25 h-25"
                        />
                    </Link>
                </div>
                <nav className="flex-1">
                    <ul className="flex flex-row gap-6 items-center justify-center font-poppins">
                        <MenuItem name="About" href="/about" />
                    </ul>
                </nav>
            </div>
        </header>
    )
}