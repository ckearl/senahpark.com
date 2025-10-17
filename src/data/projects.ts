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
    subtitle: 'Campaign Strategy Formulation',
    links: [],
    overview: [
      "Sam's Club seeks to find innovative ways to provide additional value to their members.",
      'The key goal of this project was to identify additional entry points to their members-exclusive rewards platform. Please note this strategy has not yet been implemented.',
    ],
    role: 'Membership Intern',
    responsibilities: 'Affinity analysis, campaign placement strategy, analytics (SQL) result forecasting, visual design + flow',
    date: 'May - August 2023',
    sections: [
      {
        title: 'Current State + Competitive Analysis',
        description:
          "To best understand the platform and its features, I conducted a current state analysis of the Sam's Club reward platform as well as similar competitor platforms. Features and pain points of each site were documented.",
        image: '/img/sc/competitive_state.png',
      },
      {
        title: 'Member Affinity Analysis',
        description:
          "The target demographic of Sam's Club have a unique set of characteristics and behaviors. I identified valuable current and future platform partners by leveraging affinity data of member spending and forecasted their added utility. These partners acted as a foundation for the next step in the process.",
        image: '/img/sc/member_affinity.png',
      },
      {
        title: 'Collection Ideation',
        description:
          "With everything in mind, I worked with my manager to decide which collection types would be most beneficial to Sam's club members. Offers were curated surrounding each collection and strategically determined where to insert them on the native samsclub.com site to provide additional entry points to the platform.",
        image: '/img/sc/collection_ideation.png',
      },
      {
        title: 'Entry Point and Site Mockup',
        description:
          'With collection types and placements defined, I worked with my team to wireframe the user journey and flow. The wireframe enabled me to create visual mockups for various collections and access locations on the samsclub.com site.',
        image: '/img/sc/entry_point.png',
      },
    ],
  },
  'byu-marriott': {
    title: 'BYU Marriott',
    logo: '/img/byu/byumarriottlogo.png',
    subtitle: 'Brand Management Strategy + Implementation',
    links: [
      {
        text: 'visit @byumarriottlife on instagram',
        url: 'https://www.instagram.com/byumarriottlife/',
      },
    ],
    overview: [
      'BYU Marriott seeks to develop their students into leaders of faith, intellect, and character.',
      'The key focus of my initiatives is to better align the online and offline experiences of BYU Marriott students with the vision, mission, and values.',
    ],
    role: 'Marketing Strategist',
    responsibilities:
      'Engagement and campaign strategy, social media strategy, graphic design, event logistics, videography',
    date: 'April 2021 - present',
    sections: [
      {
        title: 'Initiative Ideation',
        description:
          'BYU Marriott seeks to develop their students into leaders of faith, intellect, and character. The key focus of my initiatives is to better align the online and offline experiences of BYU Marriott students with the vision, mission, and values.',
        image: '/img/byu/iniative_ideation.png',
      },
      {
        title: 'Cross-functional Collaboration',
        description:
          "To ensure smooth sailing across all marketing efforts, I collaborated across several teams, including the BYU Marriott marketing & communications department, dean's office events team, and the student council.",
        image: '/img/byu/collaboration.png',
      },
      {
        title: 'Communication Strategy',
        description:
          'Consistency and clarity was a priority across all marketing channels. All visual assets for BYU Marriott efforts were designed by me, including social media posts, digital signage, and physical flyers.',
        image: '/img/byu/communication.png',
      },
      {
        title: 'Execution',
        description:
          'With the support of my team, I have successfully executed and supported large-scale events and social media campaigns for BYU Marriott. My attention to detail and creativity resulted in increased engagement and a positive impact on the BYU Marriott brand.',
        image: '/img/byu/execution.png',
      },
    ],
  },
};

export type ProjectSlug = keyof typeof projectData;
