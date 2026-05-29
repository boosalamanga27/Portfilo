document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        // Toggle icon pattern between bars and 'X' close indicator
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu whenever a regular links is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Evaluates where the scroll point currently sits
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- Contact Form Client-Side Validation ---
    const form = document.getElementById('portfolioContactForm');
    const successBox = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop standard form reloading behavior
        
        // Target inputs and errors
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        let isValid = true;

        // 1. Name Check
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            nameInput.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            nameError.style.display = 'none';
            nameInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }

        // 2. Email Validation with Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            emailError.style.display = 'none';
            emailInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }

        // 3. Message Body Check
        if (messageInput.value.trim() === '') {
            messageError.style.display = 'block';
            messageInput.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            messageError.style.display = 'none';
            messageInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }

        // If everything checks out cleanly, handle final presentation actions
        if (isValid) {
            successBox.style.display = 'block';
            form.reset(); // Wipe inputs
            
            // Auto hide confirmation banner alert after 4 seconds
            setTimeout(() => {
                successBox.style.display = 'none';
            }, 4000);
        }
    });
});