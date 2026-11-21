import { projectsData } from '@/utils/data/projects-data';
import Reveal from '../../helper/reveal';
import SectionTitle from '../../helper/section-title';
import ProjectCard from './project-card';

const Projects = () => {
  return (
    <section id="projects" className="relative py-20 lg:py-28">
      <SectionTitle label="Portfolio" title="Featured" highlight="Projects" />

      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        {projectsData.map((project, index) => (
          <Reveal key={project.id} delay={index * 100}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
