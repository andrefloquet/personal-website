import HowCard from '@/components/how-card';
import Button from '@/components/button';
import { SKILL_CATEGORIES } from '@/data/skills-data';

export default function How() {
    return (
        <section className="relative bg-sky-50/60 pb-10 pt-8">
            <div className="max-w-9/10 mx-auto mb-16 hidden items-center justify-between md:flex">
                <div>
                    <h2 className="mb-3 text-4xl font-bold">Skills</h2>
                    <p className="text-slate-600">
                        Click a category to view the skills and related technologies.
                    </p>
                </div>
                <a href="/skills"
                    className="rounded-lg bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
                >View all skills</a>
            </div>
            <h2 className="max-w-9/10 mx-auto mb-16 text-center text-4xl font-bold md:hidden">
                Skills
            </h2>
            <p className="max-w-9/10 mx-auto -mt-10 mb-12 text-center text-slate-600 md:hidden">
                Click a category to view the skills and related technologies.
            </p>
            <div className="grid max-w-9/10 mx-auto grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3 xl:grid-cols-4">
                {SKILL_CATEGORIES.map((category) => (
                    <HowCard
                        key={category.slug}
                        type={category.icon}
                        title={category.title}
                        text={category.skills.slice(0, 3).join(', ')}
                        path={`/skills/${category.slug}`}
                    />
                ))}
            </div>  
            <div className="grid grid-cols-1 items-center text-center max-w-9/10 mx-auto mt-12 md:hidden">
                <div className='mx-auto w-full max-w-sm'>
                    <Button href="/skills"
                        className="w-full bg-sky-600 font-medium text-lg py-4 px-8 rounded-lg text-white transition hover:bg-sky-700"
                    >
                        View all skills
                    </Button>
                </div>
            </div>
        </section>
    );
}