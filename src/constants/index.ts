import type {
    NavLink,
    NavIcon,
    DockApp,
    BlogPost,
    TechCategory,
    Social,
    PhotoLink,
    GalleryItem,
    LocationFolder,
    Locations,
    WindowConfig,
} from "#types";

const navLinks: NavLink[] = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons: NavIcon[] = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps: DockApp[] = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: false,
    },
];

const blogPosts: BlogPost[] = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

const techStack: TechCategory[] = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript"],
    },
    {
        category: "Mobile",
        items: ["React Native", "Expo"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Sass", "CSS"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "NestJS", "Hono"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker"],
    },
];

const socials: Social[] = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/JavaScript-Mastery-Pro",
    },
    {
        id: 2,
        text: "Platform",
        icon: "/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://jsmastery.com/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: "/icons/twitter.svg",
        bg: "#ff866b",
        link: "https://x.com/jsmasterypro",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
    },
];

const photosLinks: PhotoLink[] = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery: GalleryItem[] = [
    {
        id: 1,
        img: "/images/placeholder-image.png",
        alt: "Desktop workspace showing dual monitors",
    },
    {
        id: 2,
        img: "/images/placeholder-image.png",
        alt: "Creative art poster setup",
    },
    {
        id: 3,
        img: "/images/placeholder-image.png",
        alt: "Macbook showing code editor",
    },
    {
        id: 4,
        img: "/images/placeholder-image.png",
        alt: "Mobile application interface on an iPhone",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION: LocationFolder = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Larasdyah: AI Virtual Assistant",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "Larasdyah Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        'Larasdyah combines the words "Laras" (harmony) and "Dyah" (noblewoman), symbolizing a noble princess who embodies balance. The name is deeply rooted in Javanese culture, reflecting the philosophy of the keris as a symbol of nobility and harmony.',
                        "As an AI-based virtual assistant, Larasdyah serves as an educational companion dedicated to preserving Indonesian keris culture. It provides in-depth explanations of history, craftsmanship, and spiritual values through voice interaction and an expressive digital human persona.",
                        "The system integrates Voice Generative AI for natural two-way conversation and Digital Human AI to present a lifelike 3D character. This technological synergy creates an immersive experience, similar to speaking directly with a cultural guide or a master bladesmith (empu).",
                    ],
                },
                {
                    id: 2,
                    name: "larasdyah.hcm-lab.id",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/NadR8KAh584",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "Larasdyah.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-1.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://www.figma.com/proto/StfuS9hOWfpju0QNoIQpTh/Larasdyah--Virtual-Assistant-AI?node-id=86-364&t=YXotOqpJSsxzAqMN-1",
                    position: "top-60 right-20",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "AR Industrial Equipment",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-52 right-80",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "AR Industrial Equipment Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "This application provides Augmented Reality visualization for industrial equipment, enabling technicians and trainees to view real-time SCADA data overlaid on 3D models of industrial systems.",
                        "Users can interact with virtual controls, monitor sensor readings, and receive step-by-step maintenance guidance all within a secure, browser-based AR environment.",
                        "It's built with Unity, AR Foundation, and MQTT for real-time data streaming.",
                    ],
                },
                {
                    id: 2,
                    name: "video-demo.mp4",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://www.youtube.com/watch?v=H9TvFkjY8oI",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "ar-industrial-equipment.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/project-2.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://www.figma.com/design/qDqANPkeGPUXqg8H6fIkLk/Efortech_APPS?node-id=1-45&t=tI1IcT30J0t26b4l-1",
                    position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "Blockchain and IoT Based ERP Platform",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-80",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Blockchain and IoT Based ERP Platform.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "ERP platform integrated with IoT devices and blockchain technology for improved security in outsourcing operations.",
                        "The platform successfully captures ERPNext transactions through Debezium and Kafka, storing them immutably in a Hyperledger Besu private blockchain.",
                        "This ensures data integrity and transparency across the supply chain, while IoT sensors provide real-time monitoring of production and logistics.",
                    ],
                },
                {
                    id: 2,
                    name: "video-demo.mp4",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/oma2RpGzkjw",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "blockchain-iot-erp.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-3.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://www.figma.com/design/ABFYWjAihjEqc0JmeEN4Wb/proyek-akhir?node-id=2-7696&t=tI1IcT30J0t26b4l-1",
                    position: "top-60 right-20",
                },
            ],
        },
    ],
};

const ABOUT_LOCATION: LocationFolder = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/danar-1.jpg",
        },
        {
            id: 2,
            name: "casual-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/images/danar-2.jpg",
        },
        {
            id: 3,
            name: "conference-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/placeholder-image.png",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer Behind the Code",
            image: "/images/danar-3.jpg",
            description: [
                "Hey! I'm Danar 👋, a Researcher, Innovator, and Tech Enthusiast with broad experience across multiple technology fields.",
                "I’m Expert at immersive technologies (VR, AR, MR), modern web2 & web3 development using TypeScript and Node.js, and integration with Docker for efficient deployment.",
                "I also try to explore how blockchain, IoT, and AI can connect with XR and web systems to create scalable and intelligent solutions.",
                "I’m not a robot, but I sometimes feel like I need a software update 😅",
            ],
        },
    ],
};

const RESUME_LOCATION: LocationFolder = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
        },
    ],
};

const TRASH_LOCATION: LocationFolder = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
    ],
};

export const locations: Locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG: WindowConfig = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
