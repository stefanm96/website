document.addEventListener('alpine:init', () => {
    Alpine.data('portfolioApp', () => ({
        resumeData: {},
        loading: true,
        error: null,

        async init() {
            try {
                console.log('Loading resume data...');
                const endpoints = {
                    main: '/data/main.json',
                    portfolio: '/data/portfolio.json',
                    testimonials: '/data/testimonials.json',
                    resumeMeta: '/data/resume/meta.json',
                    resumeEducation: '/data/resume/education.json',
                    resumeWork: '/data/resume/work.json',
                    resumeProjects: '/data/resume/projects.json',
                    resumeSkills: '/data/resume/skills.json'
                };

                const entries = await Promise.all(Object.entries(endpoints).map(async ([key, url]) => {
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status} while fetching ${url}`);
                    }

                    const payload = await response.json();
                    return [key, payload];
                }));

                const dataMap = entries.reduce((acc, [key, payload]) => {
                    acc[key] = payload;
                    return acc;
                }, {});

                this.resumeData = {
                    main: dataMap.main || {},
                    resume: {
                        skillmessage: dataMap.resumeMeta?.skillmessage ?? '',
                        education: dataMap.resumeEducation || [],
                        work: dataMap.resumeWork || [],
                        projects: dataMap.resumeProjects || [],
                        skills: dataMap.resumeSkills || []
                    },
                    portfolio: dataMap.portfolio || { projects: [] },
                    testimonials: dataMap.testimonials || { testimonials: [] }
                };
                console.log('Resume data loaded:', this.resumeData);
                this.loading = false;
            } catch (error) {
                console.error('Error loading resume data:', error);
                this.error = 'Failed to load resume data';
                this.loading = false;

                // Fallback data to prevent broken layout
                this.resumeData = {
                    main: {
                        name: "Stefan Michel",
                        description: "Ihr Partner in der Digitalisierung.",
                        image: "profilepic.png",
                        bio: "Loading...",
                        contactmessage: "Loading...",
                        email: "info@stefan-michel.com",
                        phone: "+49 1517 4338957",
                        address: {
                            city: "Lohne"
                        },
                        social: []
                    },
                    resume: {
                        work: [],
                        projects: [],
                        education: [],
                        skills: []
                    },
                    portfolio: {
                        projects: []
                    },
                    testimonials: {
                        testimonials: []
                    }
                };
            }
        }
    }));
});
