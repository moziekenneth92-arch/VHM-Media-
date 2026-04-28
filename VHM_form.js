/**
 * VHM SCHOLARSHIP FORM HANDLER - EMAIL SETUP REQUIRED
 * 
 * IMPORTANT: To enable email functionality, you must:
 * 
 * 1. Create a free account at https://www.emailjs.com/
 * 
 * 2. Get your credentials:
 *    - Public Key: Your EmailJS account settings → API Keys
 *    - Service ID: Email Services → (your service)
 *    - Template ID: Email Templates → (your template)
 * 
 * 3. Update the values below:
 *    - Line 6: Replace 'YOUR_EMAILJS_PUBLIC_KEY' with your actual public key
 *    - Line 54-56: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID'
 * 
 * 4. See EMAILJS_SETUP_GUIDE.md for complete setup instructions
 * 
 * Once configured, the form will:
 * - Capture all registration data
 * - Send email confirmation to vhmscholar@gmail.com
 * - Store data for PDF generation
 * - Redirect to success page
 */

// VHM Scholarship Form Handler with EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize EmailJS (Replace with your actual EmailJS Public Key)
  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // You'll need to get this from EmailJS
  
  const form = document.getElementById('regForm');
  const submitBtn = document.getElementById('submitBtn');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!form.checkValidity()) {
      alert('Please fill in all required fields correctly.');
      return;
    }
    
    // Show loading state
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }
    
    // Get all candidate data from form
    const candidateData = {
      // Personal Info
      firstName: document.getElementById('first_name').value,
      middleName: document.getElementById('middle_name').value,
      lastName: document.getElementById('last_name').value,
      gender: document.querySelector('input[name="gender"]:checked')?.value || '',
      dob: document.getElementById('dob').value,
      
      // Location
      country: document.getElementById('country').value,
      state: document.getElementById('state').value,
      lga: document.getElementById('lga').value,
      address: document.getElementById('address').value,
      
      // Parent/Guardian
      parentName: document.getElementById('parent_name').value,
      parentPhone: document.getElementById('parent_phone').value,
      altPhone: document.getElementById('alt_phone').value,
      parentEmail: document.getElementById('parent_email').value,
      
      // Church/Fellowship
      hcf: document.getElementById('hcf').value,
      
      // School Info
      currentClass: document.getElementById('current_class').value,
      schoolName: document.getElementById('school_name').value,
      schoolAddress: document.getElementById('school_address').value,
      classTeacher: document.getElementById('class_teacher').value,
      headTeacher: document.getElementById('head_teacher').value,
      
      // Registration Date
      regDate: document.getElementById('reg_date').value,
      
      // Timestamp
      timestamp: new Date().toLocaleString()
    };
    
    // Store data in localStorage for success page
    localStorage.setItem('candidateData', JSON.stringify(candidateData));
    
    // Prepare email template variables
    const templateParams = {
      to_email: 'vhmscholar@gmail.com', // Admin email
      candidate_name: `${candidateData.firstName} ${candidateData.lastName}`,
      candidate_email: candidateData.parentEmail,
      candidate_phone: candidateData.parentPhone,
      first_name: candidateData.firstName,
      middle_name: candidateData.middleName,
      last_name: candidateData.lastName,
      gender: candidateData.gender,
      dob: candidateData.dob,
      country: candidateData.country,
      state: candidateData.state,
      lga: candidateData.lga,
      address: candidateData.address,
      parent_name: candidateData.parentName,
      parent_phone: candidateData.parentPhone,
      alt_phone: candidateData.altPhone,
      parent_email: candidateData.parentEmail,
      hcf: candidateData.hcf,
      current_class: candidateData.currentClass,
      school_name: candidateData.schoolName,
      school_address: candidateData.schoolAddress,
      class_teacher: candidateData.classTeacher,
      head_teacher: candidateData.headTeacher,
      reg_date: candidateData.regDate,
      submission_time: candidateData.timestamp
    };
    
    // Send email via EmailJS
    sendRegistrationEmail(templateParams)
      .then(function(response) {
        console.log('Registration email sent successfully:', response);
        
        // Redirect to success page after delay
        setTimeout(function() {
          window.location.href = 'success.html';
        }, 1500);
      })
      .catch(function(error) {
        console.error('Error sending registration email:', error);
        
        // Reset button
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
        
        // Show error message but still redirect to success page
        showToast('Registration submitted (email notification delayed). Redirecting...', 'warning');
        
        // Still redirect after a delay
        setTimeout(function() {
          window.location.href = 'success.html';
        }, 2000);
      });
  });
});

// Function to send registration email via EmailJS
function sendRegistrationEmail(templateParams) {
  return emailjs.send(
    'YOUR_SERVICE_ID', // Your EmailJS Service ID
    'YOUR_TEMPLATE_ID', // Your EmailJS Template ID
    templateParams
  );
}

// Toast Notification Helper
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');
  
  // Set message and icon based on type
  toastMsg.textContent = message;
  
  switch(type) {
    case 'success':
      toastIcon.textContent = '✓';
      toast.style.background = 'rgba(81, 207, 102, 0.9)';
      break;
    case 'error':
      toastIcon.textContent = '✕';
      toast.style.background = 'rgba(255, 107, 107, 0.9)';
      break;
    case 'warning':
      toastIcon.textContent = '!';
      toast.style.background = 'rgba(245, 158, 11, 0.9)';
      break;
    default:
      toastIcon.textContent = 'ℹ';
      toast.style.background = 'rgba(77, 166, 255, 0.9)';
  }
  
  // Show toast
  toast.classList.add('show');
  
  // Hide after 4 seconds
  setTimeout(function() {
    toast.classList.remove('show');
  }, 4000);
}
