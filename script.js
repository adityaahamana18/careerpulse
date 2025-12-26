// ===== Configuration =====
const CONFIG = {
    currentStep: 1,
    totalSteps: 3,
    userData: {},
    skills: [
        { id: 'technical', name: 'Technical Skills', icon: 'fa-code', color: 'text-red-400' },
        { id: 'creative', name: 'Creative Thinking', icon: 'fa-palette', color: 'text-purple-400' },
        { id: 'analytical', name: 'Analytical Mind', icon: 'fa-chart-line', color: 'text-green-400' },
        { id: 'leadership', name: 'Leadership', icon: 'fa-users', color: 'text-blue-400' },
        { id: 'communication', name: 'Communication', icon: 'fa-comments', color: 'text-pink-400' },
        { id: 'problem-solving', name: 'Problem Solving', icon: 'fa-lightbulb', color: 'text-yellow-400' },
        { id: 'research', name: 'Research', icon: 'fa-search', color: 'text-teal-400' },
        { id: 'organizational', name: 'Organization', icon: 'fa-tasks', color: 'text-indigo-400' },
    ],
    careers: {
        technical: [
            {
                title: "Software Developer",
                description: "Design, develop, and maintain software applications using cutting-edge technologies.",
                match: 96,
                growth: "Very High Demand",
                skills: ["Programming", "Problem Solving", "Collaboration", "Continuous Learning"],
                icon: "fa-code",
                gradient: "from-blue-500 to-cyan-500"
            },
            {
                title: "Data Scientist",
                description: "Extract insights from complex data sets using statistical analysis and machine learning.",
                match: 92,
                growth: "Explosive Growth",
                skills: ["Statistics", "ML Algorithms", "Python", "Data Visualization"],
                icon: "fa-chart-bar",
                gradient: "from-purple-500 to-pink-500"
            }
        ],
        creative: [
            {
                title: "UX/UI Designer",
                description: "Create intuitive and beautiful digital experiences that users love.",
                match: 95,
                growth: "High Demand",
                skills: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
                icon: "fa-paint-brush",
                gradient: "from-pink-500 to-rose-500"
            },
            {
                title: "Digital Marketer",
                description: "Drive brand growth through strategic digital campaigns and content creation.",
                match: 90,
                growth: "Growing Field",
                skills: ["SEO", "Content Strategy", "Analytics", "Social Media"],
                icon: "fa-bullhorn",
                gradient: "from-orange-500 to-yellow-500"
            }
        ],
        analytical: [
            {
                title: "Financial Analyst",
                description: "Guide business decisions through detailed financial analysis and forecasting.",
                match: 93,
                growth: "Stable Demand",
                skills: ["Financial Modeling", "Excel", "Market Analysis", "Risk Assessment"],
                icon: "fa-chart-pie",
                gradient: "from-emerald-500 to-teal-500"
            },
            {
                title: "Business Consultant",
                description: "Help organizations optimize processes and achieve strategic goals.",
                match: 89,
                growth: "High Value",
                skills: ["Strategic Planning", "Process Improvement", "Client Relations", "Analysis"],
                icon: "fa-briefcase",
                gradient: "from-blue-600 to-indigo-600"
            }
        ],
        leadership: [
            {
                title: "Project Manager",
                description: "Lead teams to successfully deliver projects on time and within budget.",
                match: 94,
                growth: "Always in Demand",
                skills: ["Team Leadership", "Agile/Scrum", "Budgeting", "Stakeholder Management"],
                icon: "fa-tasks",
                gradient: "from-indigo-500 to-purple-500"
            }
        ],
        communication: [
            {
                title: "Content Strategist",
                description: "Craft compelling content strategies that engage audiences and drive results.",
                match: 92,
                growth: "Digital Focus",
                skills: ["Content Planning", "SEO Writing", "Audience Analysis", "Brand Voice"],
                icon: "fa-pen-nib",
                gradient: "from-rose-500 to-pink-500"
            }
        ]
    },
    stepTitles: [
        'Tell us about yourself',
        'Your Superpowers',
        'Your Preferences',
        'Complete!'
    ]
};

// ===== DOM Elements =====
const elements = {
    // Buttons
    resetBtn: document.getElementById('resetBtn'),
    nextBtn1: document.getElementById('nextBtn1'),
    nextBtn2: document.getElementById('nextBtn2'),
    prevBtn2: document.getElementById('prevBtn2'),
    prevBtn3: document.getElementById('prevBtn3'),
    showResultsBtn: document.getElementById('showResultsBtn'),
    restartBtn: document.getElementById('restartBtn'),
    scrollTopBtn: document.getElementById('scrollTopBtn'),
    
    // Steps
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
    results: document.getElementById('results'),
    
    // Progress
    progressRing: document.getElementById('progressRing'),
    progressText: document.getElementById('progressText'),
    stepTitle: document.getElementById('stepTitle'),
    
    // Form inputs
    education: document.getElementById('education'),
    experience: document.getElementById('experience'),
    workStyle: document.getElementById('workStyle'),
    
    // Results
    careerResults: document.getElementById('careerResults'),
    overallScore: document.getElementById('overallScore'),
    
    // Containers
    skillsContainer: document.getElementById('skillsContainer')
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    initializeSkills();
    initializeEventListeners();
    updateProgress();
    createParticles();
    initializeScrollAnimations();
});

// ===== Skills Initialization =====
function initializeSkills() {
    elements.skillsContainer.innerHTML = '';
    
    CONFIG.skills.forEach(skill => {
        const skillElement = createSkillElement(skill);
        elements.skillsContainer.appendChild(skillElement);
    });
}

function createSkillElement(skill) {
    const label = document.createElement('label');
    label.className = 'skill-option';
    label.innerHTML = `
        <input type="checkbox" value="${skill.id}">
        <div class="skill-card">
            <div class="skill-icon">
                <i class="fas ${skill.icon} ${skill.color}"></i>
            </div>
            <p class="skill-name">${skill.name}</p>
            <div class="card-overlay"></div>
        </div>
    `;
    
    const input = label.querySelector('input');
    input.addEventListener('change', function() {
        const card = this.parentElement.querySelector('.skill-card');
        if (this.checked) {
            card.classList.add('glow-effect');
            animateElement(card, 'pulse-glow');
        } else {
            card.classList.remove('glow-effect');
        }
    });
    
    return label;
}

// ===== Event Listeners =====
function initializeEventListeners() {
    // Navigation buttons
    elements.resetBtn.addEventListener('click', resetAssessment);
    elements.nextBtn1.addEventListener('click', () => nextStep(1));
    elements.nextBtn2.addEventListener('click', () => nextStep(2));
    elements.prevBtn2.addEventListener('click', () => prevStep(2));
    elements.prevBtn3.addEventListener('click', () => prevStep(3));
    elements.showResultsBtn.addEventListener('click', showResults);
    elements.restartBtn.addEventListener('click', resetAssessment);
    elements.scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Environment options
    document.querySelectorAll('.environment-option input').forEach(input => {
        input.addEventListener('change', function() {
            const card = this.parentElement.querySelector('.environment-card');
            animateElement(card, 'pulse-glow');
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleKeyboardNavigation(e) {
    if (e.key === 'Enter' && CONFIG.currentStep < 4) {
        if (CONFIG.currentStep === 3) {
            showResults();
        } else {
            nextStep(CONFIG.currentStep);
        }
    } else if (e.key === 'Escape') {
        resetAssessment();
    }
}

// ===== Step Management =====
function nextStep(current) {
    if (!validateStep(current)) return;
    
    saveStepData(current);
    
    const currentStepEl = elements[`step${current}`];
    animateStepOut(currentStepEl);
    
    setTimeout(() => {
        currentStepEl.classList.remove('active');
        currentStepEl.classList.remove('slide-up');
        
        CONFIG.currentStep = current + 1;
        const nextStepEl = elements[`step${CONFIG.currentStep}`];
        nextStepEl.classList.add('active');
        animateStepIn(nextStepEl);
        
        updateProgress();
    }, 300);
}

function prevStep(current) {
    const currentStepEl = elements[`step${current}`];
    animateStepOut(currentStepEl, true);
    
    setTimeout(() => {
        currentStepEl.classList.remove('active');
        currentStepEl.classList.remove('slide-down');
        
        CONFIG.currentStep = current - 1;
        const prevStepEl = elements[`step${CONFIG.currentStep}`];
        prevStepEl.classList.add('active');
        animateStepIn(prevStepEl, true);
        
        updateProgress();
    }, 300);
}

function animateStepOut(element, reverse = false) {
    element.style.animation = reverse ? 'slide-down 0.3s ease-out reverse' : 'slide-up 0.3s ease-out reverse';
}

function animateStepIn(element, reverse = false) {
    element.style.animation = reverse ? 'slide-up 0.3s ease-out' : 'slide-down 0.3s ease-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 300);
}

// ===== Validation =====
function validateStep(step) {
    switch(step) {
        case 1:
            if (!elements.education.value || !elements.experience.value) {
                showError('Please fill in all fields to continue');
                return false;
            }
            break;
            
        case 2:
            const selectedSkills = document.querySelectorAll('#skillsContainer input:checked');
            if (selectedSkills.length === 0) {
                showError('Please select at least one skill that describes you');
                return false;
            }
            break;
            
        case 3:
            const environment = document.querySelector('input[name="environment"]:checked');
            if (!environment || !elements.workStyle.value) {
                showError('Please make all preference selections');
                return false;
            }
            break;
    }
    return true;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.classList.add('hiding');
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// ===== Data Management =====
function saveStepData(step) {
    switch(step) {
        case 1:
            CONFIG.userData.education = elements.education.value;
            CONFIG.userData.experience = elements.experience.value;
            break;
            
        case 2:
            CONFIG.userData.skills = Array.from(
                document.querySelectorAll('#skillsContainer input:checked')
            ).map(input => input.value);
            break;
            
        case 3:
            CONFIG.userData.environment = document.querySelector(
                'input[name="environment"]:checked'
            ).value;
            CONFIG.userData.workStyle = elements.workStyle.value;
            break;
    }
}

// ===== Progress Management =====
function updateProgress() {
    const percent = ((CONFIG.currentStep - 1) / CONFIG.totalSteps) * 100;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percent / 100) * circumference;
    
    if (elements.progressRing) {
        elements.progressRing.style.strokeDashoffset = offset;
    }
    
    elements.progressText.textContent = Math.round(percent) + '%';
    elements.stepTitle.textContent = CONFIG.stepTitles[CONFIG.currentStep - 1] || 'Complete!';
}

// ===== Results =====
function showResults() {
    if (!validateStep(3)) return;
    saveStepData(3);
    
    const currentStepEl = elements.step3;
    animateStepOut(currentStepEl);
    
    setTimeout(() => {
        currentStepEl.classList.remove('active');
        
        const careerCategory = determineCareerCategory();
        const careers = CONFIG.careers[careerCategory] || CONFIG.careers.technical;
        
        const overallScore = calculateOverallScore(careers);
        elements.overallScore.textContent = overallScore + '%';
        
        displayCareers(careers);
        
        elements.results.style.display = 'block';
        animateElement(elements.results, 'fade-in');
        
        CONFIG.currentStep = 4;
        updateProgress();
        elements.progressText.textContent = '100%';
        
        setTimeout(() => {
            elements.results.style.animation = '';
        }, 800);
        
        // Scroll to results
        elements.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

function determineCareerCategory() {
    if (!CONFIG.userData.skills) return 'technical';
    
    const skillWeights = {
        'technical': 3,
        'creative': 2,
        'analytical': 2,
        'leadership': 1,
        'communication': 1,
        'problem-solving': 2,
        'research': 1,
        'organizational': 1
    };
    
    let maxScore = 0;
    let selectedCategory = 'technical';
    
    CONFIG.userData.skills.forEach(skill => {
        if (skillWeights[skill] > maxScore) {
            maxScore = skillWeights[skill];
            selectedCategory = skill;
        }
    });
    
    return selectedCategory;
}

function calculateOverallScore(careers) {
    let total = 0;
    careers.forEach(career => {
        total += career.match;
    });
    return Math.round(total / careers.length);
}

function displayCareers(careers) {
    elements.careerResults.innerHTML = '';
    
    careers.forEach((career, index) => {
        const card = createCareerCard(career, index);
        elements.careerResults.appendChild(card);
    });
}

function createCareerCard(career, index) {
    const card = document.createElement('div');
    card.className = 'career-card';
    card.style.animationDelay = (index * 0.1) + 's';
    
    card.innerHTML = `
        <div class="career-header">
            <div style="display: flex; align-items: flex-start;">
                <div class="career-icon" style="background: linear-gradient(to bottom right, ${career.gradient});">
                    <i class="fas ${career.icon}"></i>
                </div>
                <div>
                    <h3 class="career-title">${career.title}</h3>
                    <div style="display: flex; align-items: center;">
                        <div class="match-bar">
                            <div class="match-fill" style="width: ${career.match}%; background: linear-gradient(to right, ${career.gradient});"></div>
                        </div>
                        <span class="match-percentage gradient-text">${career.match}% Match</span>
                    </div>
                </div>
            </div>
            <span class="growth-badge">${career.growth}</span>
        </div>
        
        <p class="career-description">${career.description}</p>
        
        <div class="skills-list">
            ${career.skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('')}
        </div>
        
        <div class="career-actions">
            <button class="action-button secondary">
                <i class="fas fa-book-open"></i>
                Learn More
            </button>
            <button class="action-button primary">
                <i class="fas fa-rocket"></i>
                Explore Path
            </button>
        </div>
    `;
    
    return card;
}

// ===== Reset Assessment =====
function resetAssessment() {
    // Add reset animation
    document.body.style.animation = 'fade-in 0.3s ease-out reverse';
    
    setTimeout(() => {
        CONFIG.currentStep = 1;
        CONFIG.userData = {};
        
        // Reset all steps
        document.querySelectorAll('.step-card').forEach(step => {
            step.classList.remove('active');
            step.style.animation = '';
        });
        
        // Show first step
        elements.step1.classList.add('active');
        animateElement(elements.step1, 'slide-down');
        
        // Hide results
        elements.results.style.display = 'none';
        
        // Reset form
        elements.education.value = '';
        elements.experience.value = '';
        elements.workStyle.value = '';
        
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        
        // Remove glow effects
        document.querySelectorAll('.glow-effect').forEach(el => {
            el.classList.remove('glow-effect');
        });
        
        // Reset progress
        updateProgress();
        
        // Reset body animation
        document.body.style.animation = '';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
}

// ===== Animations =====
function createParticles() {
    const container = document.querySelector('.animated-bg');
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${i + 4}`;
        particle.style.width = Math.random() * 100 + 50 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animation = `blob ${Math.random() * 10 + 10}s infinite`;
        container.appendChild(particle);
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.step-card, .career-card, .action-card').forEach(el => {
        observer.observe(el);
    });
}

function animateElement(element, animation) {
    element.classList.add(animation);
    setTimeout(() => {
        element.classList.remove(animation);
    }, 1000);
}

// ===== Utility Functions =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add scroll event for FAB visibility
window.addEventListener('scroll', function() {
    const fabContainer = document.querySelector('.fab-container');
    if (window.scrollY > 300) {
        fabContainer.style.opacity = '1';
        fabContainer.style.visibility = 'visible';
    } else {
        fabContainer.style.opacity = '0';
        fabContainer.style.visibility = 'hidden';
    }
});

// Initialize FAB visibility
window.dispatchEvent(new Event('scroll'));
