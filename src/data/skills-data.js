export const SKILL_CATEGORIES = [
    {
        slug: 'backend',
        title: 'Backend',
        icon: 'Server',
        description: 'Designing and delivering reliable APIs, business logic, and scalable server-side systems.',
        skills: ['Python', 'Django', 'Flask', 'PHP', 'Laravel', 'Zend', 'Statamic', 'WordPress', 'Node.js', 'Express.js', 'Nest.js'],
    },
    {
        slug: 'frontend',
        title: 'Frontend',
        icon: 'Monitor',
        description: 'Building responsive, performant interfaces focused on usability, accessibility, and clean architecture.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Nuxt.js', 'jQuery', 'AlpineJS', 'Laravel-Livewire'],
    },
    {
        slug: 'mobile',
        title: 'Mobile',
        icon: 'Smartphone',
        description: 'Creating cross-platform mobile applications with native-quality experience and maintainable code.',
        skills: ['React Native (iOS & Android)'],
    },
    {
        slug: 'styling-ui',
        title: 'Styling & UI',
        icon: 'Palette',
        description: 'Crafting modern interfaces with consistent design systems, strong visual polish, and user-centered layouts.',
        skills: ['HTML5', 'CSS3', 'TailwindCSS', 'BootstrapCSS', 'SASS', 'SPA', 'UX/UI', 'SEO'],
    },
    {
        slug: 'databases',
        title: 'Databases',
        icon: 'Database',
        description: 'Modeling, querying, and optimizing relational and NoSQL data stores for performance and reliability.',
        skills: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL Server', 'MongoDB', 'DynamoDB'],
    },
    {
        slug: 'cloud-devops',
        title: 'Cloud & DevOps',
        icon: 'CloudCog',
        description: 'Automating delivery pipelines and managing cloud infrastructure for secure, resilient production environments.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Serverless', 'Vercel', 'Terraform', 'GitHub Actions', 'Ansible', 'Bash Scripting', 'Prometheus', 'ELK Stack', 'CI/CD'],
    },
    {
        slug: 'ai-automation',
        title: 'AI & Automation',
        icon: 'Bot',
        description: 'Integrating AI capabilities and workflow automation to accelerate product value and operational efficiency.',
        skills: ['LangChain', 'Vercel AI SDK', 'n8n', 'AI/LLM Integrations', 'Voice AI', 'Cursor', 'Claude', 'v0'],
    },
    {
        slug: 'networking',
        title: 'Networking',
        icon: 'Network',
        description: 'Supporting secure network operations, infrastructure stability, and enterprise connectivity standards.',
        skills: ['Linux Server Administration', 'Network Management', 'Cisco & Juniper', 'Cybersecurity'],
    },
    {
        slug: 'engineering',
        title: 'Engineering',
        icon: 'Cog',
        description: 'Applying strong engineering practices to deliver maintainable systems and high-quality software outcomes.',
        skills: ['System Architecture', 'Code Review', 'Agile/Scrum', 'Kanban', 'Sprint Management', 'TDD'],
    },
    {
        slug: 'tools',
        title: 'Tools',
        icon: 'Wrench',
        description: 'Using proven development and collaboration tools to streamline delivery and team productivity.',
        skills: ['Git', 'GitHub', 'GitKraken', 'Bitbucket', 'Jira', 'Asana', 'VS Code', 'Cursor', 'Linux', 'macOS'],
    },
    {
        slug: 'integrations',
        title: 'Integrations',
        icon: 'PlugZap',
        description: 'Connecting platforms and external services through robust API integrations and data workflows.',
        skills: ['RESTful APIs', 'CRM', 'AI/LLM/Voice AI', 'Any Third-party APIs'],
    },
    {
        slug: 'business',
        title: 'Business',
        icon: 'BriefcaseBusiness',
        description: 'Aligning technical delivery with business operations, reporting, and stakeholder priorities.',
        skills: ['ERP', 'Financial', 'Accounting', 'Payments', 'Stock Management', 'Reporting', 'Team Leadership', 'Stakeholder Communication'],
    },
    {
        slug: 'languages',
        title: 'Languages',
        icon: 'Languages',
        description: 'Communicating clearly across technical and business contexts in multilingual environments.',
        skills: ['Fluent English', 'Portuguese (Native)'],
    },
];

export function getSkillCategory(slug) {
    return SKILL_CATEGORIES.find((category) => category.slug === slug);
}
