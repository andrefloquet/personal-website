import { CircleCheck } from "lucide-react";

export default function About() {
    return (
        <main className="mx-auto my-16 max-w-9/10">
            <section className="mb-12 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
                <h1 className="mb-4 text-4xl font-bold">About Me</h1>
                <p className="mb-4 text-sky-100">
                    Hi there! My name is Andre Floquet. I am Brazilian, hold a Bachelor of Science in Computer Science,
                    and have worked as a Software Engineer for over 18 years.
                </p>
                <p className="text-sky-100">
                    My background includes backend and frontend engineering, desktop and ERP systems, mobile apps, and
                    cloud/on-premises deployments. I am especially interested in web/mobile development, DevOps,
                    networking, and AI. Outside of work, I enjoy skydiving, surfing, skateboarding, and jiu-jitsu.
                </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-3xl font-bold text-slate-900">About The Website</h2>
                <p className="mb-6 text-slate-600">
                    This website is built with Next.js and Tailwind CSS, hosted on a serverless environment on Vercel.
                    The project roadmap includes:
                </p>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-lg bg-slate-50 p-6">
                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">Header / Main Navigation</div>

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">Hero Section</div>

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">How Can I Help You Section</div>

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">Skills</div>

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">Work Experience</div>   

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">Education</div>

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">Certifications</div>    

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">About Page</div>      

                    <div><CircleCheck className="w-4 h-4 text-green-600" /></div>
                    <div className="line-through">Footer</div>                                                                          
                </div>
            </section>
        </main>
    )
}