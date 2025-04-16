document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation functionality is handled via CSS
    
    // Smooth scrolling for anchor links
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
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            } else {
                // For Netlify forms, we don't need to do anything special
                // The form will be handled by Netlify's form handling
                
                // Optional: Show a success message or redirect
                // Always handle form submission for Netlify forms
                {
                    e.preventDefault();
                    
                    // Submit the form data to Netlify
                    fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(new FormData(contactForm)).toString()
                    })
                    .then(() => {
                        // Success handling
                        alert('Thank you for your message! We will get back to you soon.');
                        contactForm.reset();
                    })
                    .catch((error) => {
                        // Error handling
                        console.error('Error submitting form:', error);
                        alert('There was an error submitting the form. Please try again later.');
                    });
                }
            }
        });
    }
    
    // Form validation for estimate form
    const estimateForm = document.getElementById('moving-estimate-form');
    if (estimateForm) {
        estimateForm.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = estimateForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Check if at least one time option is selected
            const timeCheckboxes = estimateForm.querySelectorAll('input[name="move_time[]"]');
            let timeSelected = false;
            timeCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    timeSelected = true;
                }
            });
            
            if (!timeSelected) {
                isValid = false;
                timeCheckboxes.forEach(checkbox => {
                    checkbox.closest('label').classList.add('error');
                });
                alert('Please select at least one preferred move time (Morning or Afternoon).');
            } else {
                timeCheckboxes.forEach(checkbox => {
                    checkbox.closest('label').classList.remove('error');
                });
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            } else {
                // For Netlify forms, we don't need to do anything special
                // The form will be handled by Netlify's form handling
                
                // Optional: Show a success message or redirect
                // Always handle form submission for Netlify forms
                {
                    e.preventDefault();
                    
                    // Submit the form data to Netlify
                    fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(new FormData(estimateForm)).toString()
                    })
                    .then(() => {
                        // Success handling
                        alert('Thank you for your estimate request! We will get back to you soon.');
                        estimateForm.reset();
                    })
                    .catch((error) => {
                        // Error handling
                        console.error('Error submitting form:', error);
                        alert('There was an error submitting the form. Please try again later.');
                    });
                }
            }
        });
    }
});
