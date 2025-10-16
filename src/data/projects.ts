export const projectData = {
  'freshly-picked': {
    title: 'Freshly Picked',
    logo: '/img/fp/fp_logo.png',
    subtitle: 'User Experience Analysis + Redesign',
    links: [
      {
        text: 'view user journey deliverable',
        url: 'https://www.figma.com/proto/XvLFCsFthnDVcZySF4VHLy/FP-Wireframe-(Copy)?node-id=56-4255&scaling=scale-down&page-id=0%3A1&starting-point-node-id=56%3A4255&show-proto-sidebar=1',
      },
      {
        text: 'view live site',
        url: 'https://freshlypicked.com/',
      },
    ],
    overview: [
      'Freshly Picked seeks to optimize their customers\' user experience (UX) on desktop and mobile devices in order to increase sale conversions.',
      'The key goal of this project was to identify the optimal user journey to allow first-time users to more easily navigate the site.',
    ],
    role: 'Project Lead',
    responsibilities:
      'Current-state + competitive analysis, UX interviews, user journey mapping, visual design + flow',
    date: 'February 2023',
    sections: [
      {
        title: 'Current State Site Analysis',
        description:
          'To best understand the company and its offerings, it was important to perform a current state analysis of their site on mobile and desktop to identify areas of improvement. A comprehensive bug list started as a foundation for the rest of the project.',
        image: '/img/fp/fp_sheets_one.png',
      },
      {
        title: 'User Experience Interviews',
        description:
          'The target demographic of Freshly Picked have unique priorities and behaviors. We met with nine people who fit this ideal market and conducted in-depth interviews to observe their experience with the site. The data collected shaped the improved user journey.',
        image: '/img/fp/fp_interviews.png',
      },
      {
        title: 'Whiteboard Wireframe Session',
        description:
          'Before diving into visual assets, it was necessary to create a solid foundation to ensure functionality. As a team, we brainstormed the optimal user flow for each of the main product categories. For each category, the goal was to enable the user to respond to a conversion CTA within three clicks.',
        image: '/img/fp/whiteboard.jpg',
      },
      {
        title: 'User Journey Flow Mockup',
        description:
          'With the flows defined for each category, I designed mockups and a sitemap that allows Freshly Picked to adapt to their wide range of product offerings. The links below lead to an interactive mock user journey, as well as the live site that incorporates our recommendations.',
        image: '/img/fp/fp_flows.png',
      },
    ],
  },
  'sams-club': {
    title: "Sam's Club",
    logo: '/img/sc/samsclub.png',
    subtitle: 'Campaign Strategy Development',
    links: [
      {
        text: 'view case study',
        url: '#',
      },
    ],
    overview: [
      "Sam's Club wanted to increase enrollment in their Plus membership tier through targeted marketing campaigns.",
      'The goal was to develop a comprehensive strategy that would resonate with their target demographic and drive conversions.',
    ],
    role: 'Marketing Strategist',
    responsibilities: 'Market research, campaign development, metrics analysis, presentation design',
    date: 'Spring 2023',
    sections: [
      {
        title: 'Market Research',
        description:
          "Conducted extensive research into Sam's Club's target demographics, analyzing shopping behaviors, preferences, and pain points to identify key opportunities for Plus membership growth.",
        image: '/img/sc/sc-index-demo.png',
      },
      {
        title: 'Campaign Strategy',
        description:
          'Developed a multi-channel marketing strategy that leveraged both digital and in-store touchpoints to maximize reach and engagement with potential Plus members.',
        image: '/img/sc/sc-index-demo.png',
      },
    ],
  },
  'byu-marriott': {
    title: 'BYU Marriott',
    logo: '/img/byu/byumarriottlogo.png',
    subtitle: 'Brand Management & Student Engagement',
    links: [
      {
        text: 'view portfolio',
        url: '#',
      },
    ],
    overview: [
      'BYU Marriott School of Business sought to strengthen their brand presence and create more engaging experiences for students.',
      'The project focused on developing both digital and physical touchpoints that would resonate with the student body.',
    ],
    role: 'Brand Manager',
    responsibilities:
      'Brand strategy, digital content creation, event planning, student engagement initiatives',
    date: '2022 - Present',
    sections: [
      {
        title: 'Digital Engagement',
        description:
          'Created compelling digital content and experiences that strengthened the connection between students and the Marriott School brand, increasing engagement across social media and digital platforms.',
        image: '/img/byu/byu-index-demo.png',
      },
      {
        title: 'Physical Experiences',
        description:
          'Designed and executed tangible brand experiences including events, installations, and materials that brought the Marriott School brand to life on campus.',
        image: '/img/byu/byu-index-demo.png',
      },
    ],
  },
};

export type ProjectSlug = keyof typeof projectData;
