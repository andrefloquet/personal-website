import Image from 'next/image';
import alpinejs from '@/../public/images/alpinejs.png';
import aws from '@/../public/images/aws.png';
import bootstrap from '@/../public/images/bootstrap.png';
import cisco from '@/../public/images/cisco.png';
import css from '@/../public/images/css.png';
import django from '@/../public/images/django.png';
import docker from '@/../public/images/docker.png';
import dynamodb from '@/../public/images/dynamodb.png';
import expressjs from '@/../public/images/expressjs.png';
import flask from '@/../public/images/flask.png';
import html from '@/../public/images/html.png';
import javascript from '@/../public/images/javascript.png';
import jquery from '@/../public/images/jquery.png';
import juniper from '@/../public/images/juniper.png';
import kubernetes from '@/../public/images/kubernetes.png';
import laravel from '@/../public/images/laravel.png';
import livewire from '@/../public/images/livewire.png';
import mongodb from '@/../public/images/mongodb.png';
import mysql from '@/../public/images/mysql.png';
import nestjs from '@/../public/images/nestjs.png';
import nextjs from '@/../public/images/nextjs.png';
import nodejs from '@/../public/images/nodejs.png';
import nuxtjs from '@/../public/images/nuxtjs.png';
import oracle from '@/../public/images/oracle.png';
import php from '@/../public/images/php.png';
import postgresql from '@/../public/images/postgresql.png';
import python from '@/../public/images/python.png';
import reactjs from '@/../public/images/reactjs.png';
import reactnative from '@/../public/images/reactnative.png';
import sass from '@/../public/images/sass.png';
import seo from '@/../public/images/seo.png';
import sqlserver from '@/../public/images/sqlserver.png';
import statamic from '@/../public/images/statamic.jpg';
import tailwindcss from '@/../public/images/tailwindcss.png';
import uiux from '@/../public/images/uiux.png';
import vuejs from '@/../public/images/vuejs.png';
import wordpress from '@/../public/images/wordpress.png';
import zend from '@/../public/images/zend.png';

const skillImages = {
    'Python': python,
    'Django': django,
    'Flask': flask,
    'PHP': php,
    'Laravel': laravel,
    'Zend': zend,
    'Statamic': statamic,
    'WordPress': wordpress,
    'Node.js': nodejs,
    'Express.js': expressjs,
    'Nest.js': nestjs,
    'JavaScript': javascript,
    'React': reactjs,
    'Next.js': nextjs,
    'Vue.js': vuejs,
    'Nuxt.js': nuxtjs,
    'jQuery': jquery,
    'AlpineJS': alpinejs,
    'Laravel-Livewire': livewire,
    'React Native (iOS & Android)': reactnative,
    'HTML5': html,
    'CSS3': css,
    'TailwindCSS': tailwindcss,
    'BootstrapCSS': bootstrap,
    'SASS': sass,
    'UX/UI': uiux,
    'SEO': seo,
    'PostgreSQL': postgresql,
    'MySQL': mysql,
    'Oracle': oracle,
    'SQL Server': sqlserver,
    'MongoDB': mongodb,
    'AWS': aws,
    'DynamoDB': dynamodb,
    'Docker': docker,
    'Kubernetes': kubernetes,
    'Cisco & Juniper': cisco,
    'Cisco': cisco,
    'Juniper': juniper,
};

function toSkillSlug(skill) {
    return skill
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function SkillsGrid({ skills }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill) => {
                const skillImage = skillImages[skill] || `/images/skills/${toSkillSlug(skill)}.svg`;

                return (
                    <div
                        key={skill}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 to-sky-100/0 transition-all duration-300 group-hover:from-sky-50/80 group-hover:to-indigo-50/60" />
                        <div className="relative">
                            <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-slate-50 p-4">
                                <Image
                                    src={skillImage}
                                    alt={`${skill} logo`}
                                    width={160}
                                    height={160}
                                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-center text-sm font-semibold text-slate-800">{skill}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
