import Hero from '@/components/hero';
import How from '@/components/how';
import WorkExperience from '@/components/work-experience';
import Education from '@/components/education';
import Certifications from '@/components/certifications';
import Clients from '@/components/clients';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <How />
      <WorkExperience />
      <Education />
      <Certifications />
      <Clients />
      <Contact />
    </>
  );
}
