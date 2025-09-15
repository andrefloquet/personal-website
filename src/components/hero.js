import Image from 'next/image'
import Link from 'next/link'
import profile from '@/../public/sitting-removebg-preview.png'


export default function Hero() {
    return (
        <section className="bg-sky-100 h-auto mb-40 pt-10">
            <div className="bg-sky-100 grid grid-cols-1 items-center text-center md:h-screen max-w-9/10 mx-auto md:grid-cols-2 md:gap-4 md:text-left">
                <div className="">
                    <h1 className="text-6xl font-bold mb-10">The Software Engineer your Team Needs</h1>
                    <p className="text-lg mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus tellus, placerat in consequat bibendum, porttitor in tellus. Maecenas nec ante luctus, vulputate mi in, porta nulla.</p>
                    <div className='flex gap-4 justify-center md:justify-start'>
                        <Link href='#' className='bg-sky-500 text-lg text-white py-4 px-8 rounded-2xl'>See all Skills</Link>
                        <Link href='#' className='bg-white text-lg text-gray-800 py-4 px-8 rounded-2xl'>Work Experience &darr;</Link>
                    </div>
                </div>
                <div className="mx-4 md:mx-0 self-end">
                    <Image 
                        src={profile} 
                        alt="Picture of Andre Floquet. The author." 
                        className="max-h-screen w-full"
                    />
                </div>
            </div>
        </section>
    );
}