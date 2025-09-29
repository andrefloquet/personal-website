import Image from 'next/image'
import logo from '@/../public/logo.png'

import { SiLinkedin, SiGithub, SiInstagram, SiFacebook } from "react-icons/si";

export default function Footer() {

    const size = 20;

    return (
        <section className='bg-sky-100'>
            <div className="flex flex-col gap-10 justify-center md:justify-between items-center max-w-9/10 mx-auto md:flex-row py-6">
                <div className="flex flex-col gap-6 justify-center items-center md:flex-row">
                    <div>
                        <Image 
                            src={logo} 
                            alt="Website logo" 
                            className="w-25 h-25 "
                        />
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <nav>
                            <ul className="flex flex-col gap-4 md:flex-row">
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                                <li>Link 4</li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-4">
                        <SiLinkedin className="text-sky-600 mb-4" size={size} />
                        <SiGithub className="text-sky-600 mb-4" size={size} />
                        <SiInstagram className="text-sky-600 mb-4" size={size} />
                        <SiFacebook className="text-sky-600 mb-4" size={size} />
                    </div>
                    <div>
                        <p className="text-sm">&copy; 2025 Andre Floquet. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}