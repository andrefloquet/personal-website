import SkillsCategoryPage from '@/components/skills-category-page';
import { SKILL_CATEGORIES } from '@/data/skills-data';

export function generateStaticParams() {
    return SKILL_CATEGORIES.map((category) => ({
        slug: category.slug,
    }));
}

export default async function DynamicSkillPage({ params }) {
    const { slug } = await params;
    return <SkillsCategoryPage slug={slug} />;
}
