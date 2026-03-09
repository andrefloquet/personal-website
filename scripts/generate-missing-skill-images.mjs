import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as si from 'simple-icons';

import { SKILL_CATEGORIES } from '../src/data/skills-data.js';

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'skills');

const EXISTING_MAPPED_SKILLS = new Set([
  'Python',
  'Django',
  'Flask',
  'PHP',
  'Laravel',
  'Zend',
  'Statamic',
  'WordPress',
  'Node.js',
  'Express.js',
  'Nest.js',
  'JavaScript',
  'React',
  'Next.js',
  'Vue.js',
  'Nuxt.js',
  'jQuery',
  'AlpineJS',
  'Laravel-Livewire',
  'React Native (iOS & Android)',
  'HTML5',
  'CSS3',
  'TailwindCSS',
  'BootstrapCSS',
  'SASS',
  'UX/UI',
  'SEO',
  'PostgreSQL',
  'MySQL',
  'Oracle',
  'SQL Server',
  'MongoDB',
  'AWS',
  'DynamoDB',
  'Docker',
  'Kubernetes',
  'Cisco & Juniper',
  'Cisco',
  'Juniper',
]);

const BRAND_ICON_BY_SKILL = {
  TypeScript: 'siTypescript',
  Serverless: 'siServerless',
  Vercel: 'siVercel',
  Terraform: 'siTerraform',
  'GitHub Actions': 'siGithubactions',
  Ansible: 'siAnsible',
  'Bash Scripting': 'siGnubash',
  Prometheus: 'siPrometheus',
  'ELK Stack': 'siElk',
  LangChain: 'siLangchain',
  'Vercel AI SDK': 'siVercel',
  n8n: 'siN8n',
  Cursor: 'siCursor',
  Claude: 'siClaude',
  v0: 'siV0',
  Git: 'siGit',
  GitHub: 'siGithub',
  GitKraken: 'siGitkraken',
  Bitbucket: 'siBitbucket',
  Jira: 'siJira',
  Asana: 'siAsana',
  'VS Code': 'siVisualstudiocode',
  Linux: 'siLinux',
  macOS: 'siMacos',
  ERP: 'siErpnext',
};

function toSkillSlug(skill) {
  return skill
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toAcronym(skill) {
  const cleaned = skill.replace(/\(.*?\)/g, '').trim();
  const parts = cleaned.split(/[\s/-]+/).filter(Boolean);

  if (parts.length === 0) return 'SKL';
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return parts.slice(0, 3).map((part) => part[0].toUpperCase()).join('');
}

function renderBrandSvg(skill, icon) {
  const safeLabel = escapeXml(skill);
  const fill = icon.hex ? `#${icon.hex}` : '#0F172A';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
  <rect width="1536" height="1024" fill="#E5E7EB"/>
  <g transform="translate(768 430)">
    <rect x="-360" y="-250" width="720" height="500" rx="40" fill="#FFFFFF"/>
    <g transform="translate(0 -35) scale(13)">
      <path d="${icon.path}" fill="${fill}" transform="translate(-12 -12)"/>
    </g>
    <text x="0" y="210" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="56" font-weight="700" fill="#0F172A">${safeLabel}</text>
  </g>
</svg>`;
}

function renderTextSvg(skill) {
  const safeLabel = escapeXml(skill);
  const acronym = escapeXml(toAcronym(skill));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
  <defs>
    <linearGradient id="bg" x1="220" y1="180" x2="1310" y2="860" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#4F46E5"/>
    </linearGradient>
  </defs>
  <rect width="1536" height="1024" fill="#E5E7EB"/>
  <g transform="translate(768 512)">
    <rect x="-500" y="-260" width="1000" height="520" rx="46" fill="url(#bg)"/>
    <text x="0" y="-20" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="188" font-weight="800" fill="#FFFFFF">${acronym}</text>
    <text x="0" y="140" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="52" font-weight="600" fill="#E2E8F0">${safeLabel}</text>
  </g>
</svg>`;
}

async function main() {
  const allSkills = [...new Set(SKILL_CATEGORIES.flatMap((category) => category.skills))];
  const missingSkills = allSkills.filter((skill) => !EXISTING_MAPPED_SKILLS.has(skill));

  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const skill of missingSkills) {
    const iconKey = BRAND_ICON_BY_SKILL[skill];
    const brandIcon = iconKey ? si[iconKey] : null;
    const svg = brandIcon ? renderBrandSvg(skill, brandIcon) : renderTextSvg(skill);
    const outputPath = path.join(OUTPUT_DIR, `${toSkillSlug(skill)}.svg`);
    await writeFile(outputPath, `${svg}\n`, 'utf8');
    console.log(`created ${path.relative(ROOT, outputPath)}`);
  }

  console.log(`done: ${missingSkills.length} image files created`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
