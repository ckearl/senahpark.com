'use client';

import ProjectCard from './ProjectCard';

const Projects = () => {
  return (
    <div className="py-10">
      <ProjectCard
        title="Freshly Picked"
        category="ux/ui"
        description="Redesigning the user journey to improve shopping experience"
        imageSrc="/img/fp/fp-index-demo.png"
        logoSrc="/img/fp/fp_logo.png"
        href="/projects/freshly-picked"
        layout="left"
      />

      <ProjectCard
        title="Sam's Club"
        category="campaign strategy"
        description="Formulating new strategy to increase program enrollment"
        imageSrc="/img/sc/sc-index-demo.png"
        logoSrc="/img/sc/samsclub.png"
        href="/projects/sams-club"
        layout="right"
      />

      <ProjectCard
        title="BYU Marriott"
        category="brand management"
        description="Creating stellar digital + tangible experiences to better engage students"
        imageSrc="/img/byu/byu-index-demo.png"
        logoSrc="/img/byu/byumarriottlogo.png"
        href="/projects/byu-marriott"
        layout="left"
      />
    </div>
  );
};

export default Projects;
