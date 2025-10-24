import { CircleCheck } from "lucide-react";

export default function About() {
    return (
        <main>
            <section className="max-w-9/10 mx-auto my-20">
                <h2 className="text-center text-4xl mb-16 md:text-left">About me</h2>
                <p className="text-center mb-6 md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id neque a justo pulvinar faucibus. Morbi eu interdum odio, eget iaculis risus. Proin id tempus ante. Cras vitae tincidunt mi, non venenatis tellus. Curabitur elementum sem a tortor porta vestibulum. Nulla placerat dolor non nisl hendrerit iaculis. Quisque risus tortor, sagittis at tincidunt vulputate, posuere et sem. Maecenas dictum mattis massa et hendrerit. Aliquam imperdiet mauris eget ornare eleifend. Phasellus id elit interdum, aliquam massa ac, lacinia libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc non sapien ullamcorper, blandit neque at, maximus velit. Praesent at justo eu purus tincidunt rhoncus. Maecenas tellus lorem, tempus sit amet pulvinar vel, lacinia nec sapien. Mauris vitae aliquam tortor. Sed dignissim, mauris in viverra hendrerit, sem mauris iaculis enim, eget imperdiet urna odio consectetur purus.</p>
                <p className="text-center md:text-left">Curabitur gravida pharetra lacus ut ullamcorper. Nunc aliquam, magna egestas vestibulum rhoncus, lacus lorem gravida lacus, eget bibendum lorem enim et lectus. Curabitur eleifend sollicitudin maximus. Suspendisse consequat metus eget massa mattis, ut tincidunt purus cursus. Vivamus ac egestas dolor. Integer vitae porta odio, vel porta lectus. In malesuada luctus dui. Curabitur pretium lacus id ipsum dictum viverra. Nunc mattis velit sit amet augue cursus fermentum et ut dolor.</p>
            </section>
            <section className="max-w-9/10 mx-auto my-20">
                <h2 className="text-center text-4xl mb-16 md:text-left">About The Website</h2>
                <p className="text-center mb-6 md:text-left">This Website is built using Nextjs and TailwindCss. It is hosted on a Serverless environment on Vercel. It will have the sections below:</p>
                <ul className="flex flex-col justify-center rounded-sm shadow-md list-disc py-6 pl-10">
                    <li>Header / Main Navigation <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li>Hero Section <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li>How Can I help you section <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li>Skills</li>
                    <li>Word Experience</li>
                    <li>Education</li>
                    <li>Certifications</li>
                    <li>About Page <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                    <li className="">Footer <CircleCheck className="w-4 h-4 text-green-600 inline" /></li>
                </ul>
            </section>
        </main>
    )
}