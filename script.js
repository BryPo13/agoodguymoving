'use strict';

// Constants
const CONFIG = {
    LOGO_PATHS: [
        'logos/Black logo - no background.svg',
        'logos/Color logo - no background.svg',
        'logos/Color logo with background.svg',
        'logos/White logo - no background.svg'
    ],
    EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    FORM_ENDPOINT: '/',
    ERROR_MESSAGES: {
        REQUIRED_FIELDS: 'Please fill in all required fields correctly.',
        TIME_SELECTION: 'Please select at least one preferred move time (Morning or Afternoon).',
        FORM_ERROR: 'There was an error submitting the form. Please try again later.',
        EMAIL_INVALID: 'Please enter a valid email address.'
    },
    SUCCESS_MESSAGES: {
        CONTACT: 'Thank you for your message! We will get back to you soon.',
        ESTIMATE: 'Thank you for your estimate request! We will get back to you soon.'
    }
};

// Utility functions
const utils = {
    getRandomItem: array => array[Math.floor(Math.random() * array.length)],
    
    validateEmail: email => CONFIG.EMAIL_PATTERN.test(email),
    
    showError: message => {
        console.error(message);
        alert(message);
    },
    
    showSuccess: message => {
        alert(message);
    },
    
    handleFormSubmission: async (form, successMessage) => {
        try {
            const response = await fetch(CONFIG.FORM_ENDPOINT, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: new URLSearchParams(new FormData(form)).toString()
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            utils.showSuccess(successMessage);
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            utils.showError(CONFIG.ERROR_MESSAGES.FORM_ERROR);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Logo randomization
    const randomLogo = utils.getRandomItem(CONFIG.LOGO_PATHS);
    document.querySelectorAll('.logo img').forEach(logoImg => {
        if (!logoImg.classList.contains('footer-logo')) {
            logoImg.src = randomLogo;
        }
    });
    
    // Handle smooth scrolling
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Form validation helpers
    const formValidation = {
        validateRequired: (field) => {
            const isValid = field.value.trim() !== '';
            field.classList.toggle('error', !isValid);
            return isValid;
        },

        validateEmail: (field) => {
            const isValid = field.value.trim() === '' || utils.validateEmail(field.value.trim());
            field.classList.toggle('error', !isValid);
            return isValid;
        },

        validateTimeSelection: (checkboxes) => {
            const isValid = Array.from(checkboxes).some(cb => cb.checked);
            checkboxes.forEach(cb => {
                cb.closest('label').classList.toggle('error', !isValid);
            });
            return isValid;
        },

        validateForm: (form, options = {}) => {
            let isValid = true;

            // Required fields
            form.querySelectorAll('[required]').forEach(field => {
                if (!formValidation.validateRequired(field)) {
                    isValid = false;
                }
            });

            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && !formValidation.validateEmail(emailField)) {
                isValid = false;
                utils.showError(CONFIG.ERROR_MESSAGES.EMAIL_INVALID);
            }

            // Time selection validation (for estimate form)
            if (options.validateTime) {
                const timeCheckboxes = form.querySelectorAll('input[name="move_time[]"]');
                if (!formValidation.validateTimeSelection(timeCheckboxes)) {
                    isValid = false;
                    utils.showError(CONFIG.ERROR_MESSAGES.TIME_SELECTION);
                }
            }

            return isValid;
        }
    };

    // Initialize form handlers
    const initForms = () => {
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                if (formValidation.validateForm(this)) {
                    await utils.handleFormSubmission(this, CONFIG.SUCCESS_MESSAGES.CONTACT);
                }
            });
        }

        // Estimate form
        const estimateForm = document.getElementById('moving-estimate-form');
        if (estimateForm) {
            estimateForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                if (formValidation.validateForm(this, { validateTime: true })) {
                    await utils.handleFormSubmission(this, CONFIG.SUCCESS_MESSAGES.ESTIMATE);
                }
            });
        }
    };

    // Initialize all functionality
    initSmoothScroll();
    initForms();
});
