import Image from 'next/image'
import profile from '@/../public/sitting.png'

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-slate-50 h-auto pt-12 pb-14 md:pb-10">
            <div className="grid grid-cols-1 items-center text-center max-w-9/10 mx-auto md:min-h-[80vh] md:grid-cols-2 md:gap-8 md:text-left">
                <div className="">
                    <h1 className="mb-8 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
                        Andre Floquet, a Software Engineer with over 18 years of experience.
                    </h1>
                    <p className="mb-10 text-lg text-slate-600">
                        Building production-ready systems across backend, frontend, cloud, mobile, and AI integrations.
                    </p>
                    <div className='flex flex-col gap-4 justify-center mx-20 md:flex-row md:justify-start md:mx-0'>
                        <a className='rounded-lg bg-sky-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-sky-700' href="/Andre_Floquet_Resume.pdf" download>
                            Resume  &darr;
                        </a>
                        <a className='rounded-lg border border-slate-200 bg-white px-8 py-4 text-lg text-slate-700 transition hover:bg-slate-100' href="/Andre_Floquet_Letter.pdf" download>
                            Cover Letter &darr;
                        </a>
                    </div>
                </div>
                <div className="mt-10 mx-4 self-end md:mx-0 md:mt-0">
                    <Image 
                        src={profile} 
                        alt="Picture of Andre Floquet. The author." 
                        className="max-h-screen w-full drop-shadow-xl"
                    />
                </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-white/70" />
        </section>
    );
}