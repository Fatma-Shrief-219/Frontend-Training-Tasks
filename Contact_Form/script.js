document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const inputs = document.querySelectorAll('input, textarea');
  
 
  inputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    
    input.addEventListener('focus', function() {
      formGroup.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        formGroup.classList.remove('focused');
      }
    });
    
 
    if (input.value) {
      formGroup.classList.add('focused');
    }
  });
  

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
  
    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
    });
    
   
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name) {
      showError('name', 'Please enter your name');
      isValid = false;
    }
    
    if (!email) {
      showError('email', 'Please enter your email');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email');
      isValid = false;
    }
    
    if (!subject) {
      showError('subject', 'Please enter a subject');
      isValid = false;
    }
    
    if (!message) {
      showError('message', 'Please enter your message');
      isValid = false;
    }
    
    if (isValid) {
    
      const button = form.querySelector('button');
      button.innerHTML = '<i class="fas fa-check"></i> Sent!';
      button.style.backgroundColor = '#4BB543';
      
   
      setTimeout(() => {
        form.reset();
        button.innerHTML = 'Send';
        button.style.backgroundColor = '';
        
    
        showFloatingMessage('Message sent successfully!');
      }, 1500);
    }
  });
  
  
  function showError(fieldId, message) {
    const formGroup = document.getElementById(fieldId).closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
  
    formGroup.style.animation = 'shake 0.5s';
    setTimeout(() => {
      formGroup.style.animation = '';
    }, 500);
  }
  
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
 
  function showFloatingMessage(message) {
    const floatMsg = document.createElement('div');
    floatMsg.className = 'floating-message';
    floatMsg.textContent = message;
    document.body.appendChild(floatMsg);
    
    setTimeout(() => {
      floatMsg.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      floatMsg.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(floatMsg);
      }, 500);
    }, 3000);
  }
});


const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  
  .floating-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #4BB543;
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    opacity: 0;
    transition: all 0.5s ease;
    z-index: 1000;
  }
  
  .floating-message.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
`;
document.head.appendChild(style);

function showSuccessAnimation() {
  const form = document.getElementById('form');
  form.style.display = 'none';
  
  const successDiv = document.createElement('div');
  successDiv.className = 'success-animation';
  successDiv.innerHTML = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <circle class="path circle" fill="none" stroke="#4BB543" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
      <polyline class="path check" fill="none" stroke="#4BB543" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
    </svg>
    <h3>Message Sent Successfully!</h3>
    <p>We'll get back to you soon</p>
    <button id="send-another">Send Another Message</button>
  `;
  
  document.querySelector('.contact-form').appendChild(successDiv);
  document.querySelector('.success-animation').style.display = 'block';
  
  document.getElementById('send-another').addEventListener('click', function() {
    form.reset();
    form.style.display = 'block';
    document.querySelector('.contact-form').removeChild(successDiv);
  });
}

if (isValid) {
  showSuccessAnimation();
}

function simulateSubmission() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
}


form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
 
  const button = this.querySelector('button');
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  button.disabled = true;
  
 
  const isSuccess = await simulateSubmission();
  
  if (isSuccess) {
    showSuccessAnimation();
  } else {
    button.innerHTML = originalText;
    button.disabled = false;
    showFloatingMessage('Failed to send message. Please try again.', 'error');
  }
});


function showFloatingMessage(message, type = 'success') {
  const floatMsg = document.createElement('div');
  floatMsg.className = `floating-message ${type}`;
  
  const icon = type === 'success' ? 'fa-check' : 'fa-exclamation-triangle';
  floatMsg.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  
  document.body.appendChild(floatMsg);
  
  setTimeout(() => {
    floatMsg.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    floatMsg.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(floatMsg);
    }, 500);
  }, 3000);
}