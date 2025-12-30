import HowCard from '@/components/how-card';
import Button from '@/components/button';

export default function How() {
    return (
        <section className="mb-10">
            <div className="max-w-9/10 mx-auto mb-16 hidden items-center justify-between md:flex">
                <h2 className="text-4xl font-bold">How can I help you?</h2>
                <a href="/skills"
                    className="rounded-lg bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
                >View all skills</a>
            </div>
            <h2 className="max-w-9/10 mx-auto mb-16 text-center text-4xl font-bold md:hidden">
                How can I help you?
            </h2>
            <div className="grid grid-cols-1 gap-8 max-w-9/10 mx-auto md:grid-cols-3">
                <HowCard 
                    type="Server" 
                    title="Backend" 
                    text="Server side apps in PHP, NodeJs, Python and Frameworks. Modern and Legaly development." 
                    path="/skills/backend"
                />
                <HowCard 
                    type="Monitor" 
                    title="Frontend" 
                    text="Client side apps with HTML, CSS and Javascript. Frameworks like Tailwindcss, Bootstrap, Nextjs and Nuxtjs." 
                    path="/skills/frontend"
                />
                <HowCard 
                    type="CloudCog" 
                    title="DevOps"  
                    text="AWS Ecosystem"
                    path="/skills/devops"
                />
                <HowCard 
                    type="Smartphone" 
                    title="Mobile" 
                    text="Mobile apps for Android and IOS using React Native." 
                    path="/skills/mobile"
                />
                <HowCard 
                    type="Database" 
                    title="Database" 
                    text="Relational and nosql database administrator." 
                    path="/skills/database"
                />
                <HowCard 
                    type="Network" 
                    title="Network" 
                    text="Cisco and Juniper" 
                    path="/skills/network"
                />
            </div>  
            <div className="grid grid-cols-1 items-center text-center max-w-9/10 mx-auto mt-12 md:hidden">
                <div className='flex flex-col justify-center mx-20 md:flex-row md:justify-start md:mx-0'>
                    <Button href="/skills"
                        className="bg-sky-600 font-medium text-lg py-4 px-8 rounded-lg text-white transition hover:bg-sky-700"
                    >
                        View all skills
                    </Button>
                </div>
            </div>
        </section>
    );
}