// Modal Management
const modal = document.getElementById('registerModal');
const registerBtns = document.querySelectorAll('#registerBtn, #heroRegisterBtn');
const closeBtn = document.getElementById('closeModal');
const registerForm = document.getElementById('registerForm');

// Open modal
registerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Form submission
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Collect form data
  const formData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    age: document.getElementById('age').value,
    height: document.getElementById('height').value,
    province: document.getElementById('province').value
  };
  
  // Log data (in real app, send to server)
  console.log('Registration Data:', formData);
  
  // Show success message
  alert('Merci! Votre inscription a été reçue. Nous vous contacterons bientôt!');
  
  // Reset form
  registerForm.reset();
  closeModal();
});
