// Theme and Color Management
const themeToggle = document.getElementById('themeToggle');
const colorMenuToggle = document.getElementById('colorMenuToggle');
const colorOptions = document.getElementById('colorOptions');
const colorOptionButtons = document.querySelectorAll('.color-option');
const html = document.documentElement;

// Initialize theme and color from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
const savedColor = localStorage.getItem('colorTheme') || 'blue';

// Apply saved settings on page load
if (savedTheme === 'dark') {
    html.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

html.classList.add(`theme-${savedColor}`);

// Set active color option on load
colorOptionButtons.forEach(btn => {
    if (btn.dataset.color === savedColor) {
        btn.classList.add('active');
    }
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    const isDarkMode = html.classList.contains('dark-mode');
    
    // Update button icon
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Color menu toggle
colorMenuToggle.addEventListener('click', () => {
    colorOptions.classList.toggle('active');
});

// Close color menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.color-menu')) {
        colorOptions.classList.remove('active');
    }
});

// Color option selection
colorOptionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedColor = btn.dataset.color;
        
        // Remove all color theme classes
        html.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-red', 'theme-orange', 'theme-pink');
        
        // Add new color theme class
        html.classList.add(`theme-${selectedColor}`);
        
        // Update active state
        colorOptionButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Close menu
        colorOptions.classList.remove('active');
        
        // Save preference
        localStorage.setItem('colorTheme', selectedColor);
    });
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".menu-overlay");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");   // ⭐ THIS was missing
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
});

// Skills Animation
const skillBars = document.querySelectorAll('.progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Animate skills when they come into view
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const checkSkills = () => {
    if (!skillsAnimated) {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            animateSkills();
            skillsAnimated = true;
        }
    }
};

window.addEventListener('scroll', checkSkills);

// Form Submission
// const contactForm = document.querySelector('.contact-form');
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

    // Get form data
    // const formData = new FormData(contactForm);
    // const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    // console.log('Form submitted:', data);

    // Show success message
    // alert('Thank you for your message! I will get back to you soon.');
    // contactForm.reset();
// });



// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});


// for name

let text = "Bibhash Yadav";
let i = 0;
let speed = 100;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("msg").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = typeWriter;


// Typing Animation for Hero Section
const typeText = () => {
    const text = "Computer Science Student";
    const typingText = document.querySelector('.hero-text h2');
    let i = 0;

    const typing = setInterval(() => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    checkSkills();
    checkStats();
});

// Statistics Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
};

const checkStats = () => {
    if (!statsAnimated) {
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                animateStats();
                statsAnimated = true;
            }
        }
    }
};

window.addEventListener('scroll', checkStats);

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'slideInUp 0.6s ease-out';
            entry.target.style.animationFillMode = 'both';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-category, .project-card, .service-card, .testimonial-card, .contact-item').forEach(el => {
    observer.observe(el);
}); 


// Stat card click -> show details modal
const statCards = document.querySelectorAll('.stat-card');
const statModal = document.getElementById('statModal');
const modalClose = document.getElementById('statModalClose');
const modalLabel = document.getElementById('modalLabel');
const modalNumber = document.getElementById('modalNumber');
const modalDetail = document.getElementById('modalDetail');

function openStatModal(card) {
    const labelEl = card.querySelector('.stat-label');
    const numberEl = card.querySelector('.stat-number');
    const label = labelEl ? labelEl.textContent : '';
    // read target value from data attribute so it's accurate even before animation ends
    const number = numberEl ? (numberEl.getAttribute('data-target') || numberEl.textContent) : '';
    const type = card.dataset.type || '';

    modalLabel.textContent = label;
    // show with plus suffix
    modalNumber.textContent = number ? (number + '+') : '';

    if (type === 'projects') {
        const tpl = document.getElementById('projectsTemplate');
        if (tpl) modalDetail.innerHTML = tpl.innerHTML;
        else modalDetail.textContent = card.dataset.detail || 'No details available.';
    } else if (type === 'clients') {
        const tpl = document.getElementById('clientsTemplate');
        if (tpl) modalDetail.innerHTML = tpl.innerHTML;
        else modalDetail.textContent = card.dataset.detail || 'No details available.';
    } else {
        const detail = card.dataset.detail || 'No details available.';
        modalDetail.textContent = detail;
    }

    statModal.classList.add('open');
    document.body.classList.add('modal-open');
    statModal.setAttribute('aria-hidden', 'false');
}

function closeStatModal() {
    statModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    statModal.setAttribute('aria-hidden', 'true');
}

statCards.forEach(card => {
    card.addEventListener('click', () => openStatModal(card));
});

if (modalClose) modalClose.addEventListener('click', closeStatModal);
if (statModal) {
    statModal.addEventListener('click', (e) => {
        if (e.target === statModal) closeStatModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && statModal.classList.contains('open')) {
        closeStatModal();
    }
});


document.getElementById("year").textContent = new Date().getFullYear();

function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}



document.querySelectorAll(".gallery-item img").forEach(img=>{
    img.onclick=()=>{
        document.getElementById("imagePreview").classList.add("show");
        document.getElementById("previewImg").src=img.src;
    };
});

document.querySelector(".close-btn").onclick=()=>{
    document.getElementById("imagePreview").classList.remove("show");
};

document.getElementById("imagePreview").onclick=(e)=>{
    if(e.target.id==="imagePreview")
        document.getElementById("imagePreview").classList.remove("show");
};



const viewBtns = document.querySelectorAll(".view-btn");
const certModal = document.getElementById("certModal");
const certPreview = document.getElementById("certPreview");
const certClose = document.querySelector(".cert-close");

viewBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        const img = btn.closest(".certificate-card").querySelector("img");
        certPreview.src = img.src;
        certModal.classList.add("show");
    });
});

certClose.onclick = ()=> certModal.classList.remove("show");
certModal.onclick = e => {
    if(e.target === certModal) certModal.classList.remove("show");
};


const icons = document.querySelectorAll(".tech");
const area = document.getElementById("techArea");

const particles = [];

icons.forEach(icon=>{
    const particle = {
        el: icon,
        x: Math.random()*area.clientWidth,
        y: Math.random()*area.clientHeight,
        dx: (Math.random()-0.5)*1.8,
        dy: (Math.random()-0.5)*1.8
    };
    particles.push(particle);
});

function animate(){
    particles.forEach(p=>{
        p.x += p.dx;
        p.y += p.dy;

        // bounce inside box
        if(p.x <=0 || p.x >= area.clientWidth-50) p.dx *= -1;
        if(p.y <=0 || p.y >= area.clientHeight-50) p.dy *= -1;

        p.el.style.transform = `translate(${p.x}px,${p.y}px)`;
    });

    requestAnimationFrame(animate);
}

animate();



document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("submitFeedback");
    const grid = document.getElementById("testimonialsGrid");

    btn.addEventListener("click", () => {

        const name = document.getElementById("username").value.trim();
        const role = document.getElementById("userrole").value.trim();
        const feedback = document.getElementById("userfeedback").value.trim();
        const rating = document.getElementById("userrating").value;

        if (!name || !role || !feedback) {
            alert("Please fill all fields");
            return;
        }

        // create stars
        let stars = "";
        for (let i = 0; i < rating; i++) {
            stars += `<i class="fas fa-star"></i>`;
        }
        for (let i = rating; i < 5; i++) {
            stars += `<i class="far fa-star"></i>`;
        }

        // create card
        const card = document.createElement("div");
        card.className = "testimonial-card";
        card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-stars">${stars}</div>
            </div>
            <p class="testimonial-text">"${feedback}"</p>
            <div class="testimonial-author">
                <h4>${name}</h4>
                <p>${role}</p>
            </div>
        `;

        // add on top
        grid.prepend(card);

        // clear fields
        document.getElementById("username").value = "";
        document.getElementById("userrole").value = "";
        document.getElementById("userfeedback").value = "";
        document.getElementById("userrating").value = "5";
    });

});



const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

form.addEventListener("submit", async function(e){
    e.preventDefault();

    const name = document.getElementById("username").value;
    const role = document.getElementById("userrole").value;
    const feedback = document.getElementById("userfeedback").value;
    const rating = document.getElementById("userrating").value;

    // -------- SHOW ON WEBSITE ----------
    const feedbackItem = document.createElement("div");
    feedbackItem.classList.add("feedback-item");

    feedbackItem.innerHTML = `
        <h4>${name} (${role})</h4>
        <p>${feedback}</p>
        <p>Rating: ${"★".repeat(rating)}</p>
    `;

    feedbackList.prepend(feedbackItem);

    // -------- SEND TO GMAIL ----------
    await fetch("https://formspree.io/f/moqbyrga", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            role: role,
            feedback: feedback,
            rating: rating
        })
    });

    form.reset();
});
