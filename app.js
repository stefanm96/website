// Alpine.js Portfolio App
document.addEventListener('alpine:init', () => {
    Alpine.data('portfolioApp', () => ({
        resumeData: {},
        loading: true,
        error: null,

        async init() {
            try {
                console.log('Loading resume data...');
                const response = await fetch('/resumeData.json');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                this.resumeData = await response.json();
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
                    }
                };
            }
        }
    }));
});