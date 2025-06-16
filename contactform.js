document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // prevent default form submit
  
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
  
      if (!name) {
        alert('Please enter your name.');
        return;
      }
      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!message) {
        alert('Please enter a message.');
        return;
      }
  
      try {
        const formData = new FormData(form);
        const response = await fetch('/contact.php', {
          method: 'POST',
          body: formData
        });
  
        const text = await response.text();
  
        if (response.ok) {
          alert(text); // Success message
          form.reset();
        } else {
          alert(`Error: ${text}`); // Server returned an error response
        }
      } catch (error) {
        alert('Failed to send message. Please try again later.'); // Network or other error
      }
    });
  
    function validateEmail(email) {
      // Simple regex for email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  });
  