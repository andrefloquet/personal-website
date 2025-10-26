import { CircleCheck } from "lucide-react";

export default function About() {
    return (
        <main>
            <section className="max-w-9/10 mx-auto my-20">
                <h2 className="text-center text-4xl mb-16 md:text-left">About me</h2>
                <p className="text-center mb-6 md:text-left">Hi there! My name is Andre Floquet, I have a bachelor's degree of science in computer science and I have been working as a Software Engineer for over 18 years. I worked on web development (backend and frontend), Desktop systems, ERP systems, Mobile apps and so on. Hosting and deploying the apps on premises and cloud environments.</p>
                <p className="text-center md:text-left">My interests are web and mobile app development, DevOps, Network and AI. My hobbies are surfing, skating, skydiving and studying. I am a forever student :) </p>
            </section>
            <section className="max-w-9/10 mx-auto my-20">
                <h2 className="text-center text-4xl mb-16 md:text-left">About The Website</h2>
                <p className="text-center mb-6 md:text-left">This Website is built using Nextjs and TailwindCss. It is hosted on a Serverless environment on Vercel. It will have the sections below:</p>
                <ul className="flex flex-col justify-center rounded-sm shadow-md list-disc py-6 pl-10">
                    <li>Header / Main Navigation <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li>Hero Section <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li>How Can I help you section <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li>Skills</li>
                    <li>Work Experience</li>
                    <li>Education</li>
                    <li>Certifications</li>
                    <li>About Page <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li className="">Footer <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                </ul>
            </section>
        </main>
    )
}