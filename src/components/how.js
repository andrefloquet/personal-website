import HowCard from '@/components/how-card';

export default function How() {
    return (
        <section className="mb-40">
            <h2 className="max-w-9/10 mx-auto text-center text-4xl font-bold mb-16 md:text-left">How can I help you?</h2>
            <div className="grid grid-cols-1 gap-8 max-w-9/10 mx-auto md:grid-cols-3">
                <HowCard type="Server" title="Backend" text="Server side apps in PHP, NodeJs, Python and Frameworks. Modern and Legaly development." />
                <HowCard type="Monitor" title="Frontend" text="Client side apps with HTML, CSS and Javascript. Frameworks like Tailwindcss, Bootstrap, Nextjs and Nuxtjs." />
                <HowCard type="CloudCog" title="DevOps"  text="AWS Ecosystem" />
                <HowCard type="Smartphone" title="Mobile" text="Mobile apps for Android and IOS using React Native." />
                <HowCard type="Database" title="Database" text="Relational and nosql database administrator." />
                <HowCard type="Network" title="Network" text="Cisco and Juniper" />
            </div> 
        </section>
    );
}