document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#myForm');
    const emailInput = document.querySelector('#email');
    const confirmationMessage = document.querySelector('#confirmationMessage');
    const formSummary = document.querySelector('#formSummary');
    const summaryContent = document.querySelector('#summaryContent');
    
    // Error Element
    const emailError = document.querySelector('#emailError');

    // Object to store form data
    let formData = {};

    //  email validation
    emailInput.addEventListener('input', () => {
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Invalid email format';
        } else {
            emailError.textContent = '';
        }
        updateSummary();
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        
        if (!validateForm()) return;

        confirmationMessage.classList.remove('hidden');
        updateSummary();
        formSummary.classList.remove('hidden');
    });

    
    form.addEventListener('input', updateSummary);

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Basic form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email'];
        
        requiredFields.forEach(field => {
            if (!form[field].value) {
                alert(`Please fill out the ${field} field.`);
                isValid = false;
            }
        });

        if (!validateEmail(form['email'].value)) {
            emailError.textContent = 'Invalid email format';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        return isValid;
    }

    //  display
    function updateSummary() {
        formData.firstName = form['firstName'].value || '';
        formData.lastName = form['lastName'].value || '';
        formData.email = form['email'].value || '';

        summaryContent.innerHTML = `
            <strong>First Name:</strong> ${formData.firstName}<br>
            <strong>Last Name:</strong> ${formData.lastName}<br>
            <strong>Email:</strong> ${formData.email}
        `;
    }
});
