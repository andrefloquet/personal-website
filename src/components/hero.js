import Image from 'next/image'
import profile from '@/../public/sitting.png'

export default function Hero() {
    return (
        <section className="bg-sky-100 h-auto mb-30 pt-10">
            <div className="grid grid-cols-1 items-center text-center max-w-9/10 mx-auto md:h-screen md:grid-cols-2 md:gap-4 md:text-left">
                <div className="">
                    <h1 className="text-6xl text-sky-900 font-bold mb-10">Andre Floquet, The Software Engineer your Team Needs</h1>
                    <p className="text-lg mb-10">Would you rather have an average Permanent Resident developer or a Senior Engineer who is currently holding a student visa?</p>
                    <div className='flex flex-col gap-4 justify-center mx-20 md:flex-row md:justify-start md:mx-0'>
                        <a className='bg-sky-600 font-medium text-lg py-4 px-8 rounded-lg text-white transition hover:bg-sky-700' href="/Andre_Floquet_Resume.pdf" download>
                            Resume  &darr;
                        </a>
                        <a className='bg-white text-lg py-4 px-8 rounded-lg text-gray-800 transition hover:bg-gray-100' href="/Andre_Floquet_Letter.pdf" download>
                            Cover Letter &darr;
                        </a>
                    </div>
                </div>
                <div className="mt-10 mx-4 self-end md:mx-0 md:mt-0">
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