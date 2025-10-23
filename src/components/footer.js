import Image from 'next/image'
import Link from "next/link";

import MenuItem from '@/components/menu-item'
import logo from '@/../public/logo.png'

import { SiLinkedin, SiGithub, SiInstagram, SiFacebook } from "react-icons/si";

export default function Footer() {

    const size = 20;

    return (
        <footer className='bg-sky-100'>
            <div className="flex flex-col gap-10 justify-center md:justify-between items-center max-w-9/10 mx-auto md:flex-row py-6">
                <div className="flex flex-col gap-6 justify-center items-center md:flex-row">
                    <div>
                        <Link href="/">
                            <Image 
                                src={logo} 
                                alt="Website logo" 
                                className="w-25 h-25"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <nav>
                            <ul className="flex flex-col gap-4 md:flex-row">
                                <MenuItem name="About" href="/about" />
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-4">
                        <a href='https://www.linkedin.com/in/andre-floquet/' target='_blank'>
                            <SiLinkedin className="text-sky-600 mb-4 duration-200 hover:text-sky-900" size={size} />
                        </a>
                        <a href='https://github.com/andrefloquet' target='_blank'>
                            <SiGithub className="text-sky-600 mb-4 duration-200 hover:text-sky-900" size={size} />
                        </a>
                        <a href='https://www.instagram.com/andrefloquet/' target='_blank'>
                            <SiInstagram className="text-sky-600 mb-4 duration-200 hover:text-sky-900" size={size} />
                        </a>
                        <a href='https://www.facebook.com/andre.floquet' target='_blank'>
                            <SiFacebook className="text-sky-600 mb-4 duration-200 hover:text-sky-900" size={size} />
                        </a>
                    </div>
                    <div>
                        <p className="text-sm">&copy; 2025 Andre Floquet. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}