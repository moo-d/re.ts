document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  const loginErrorDiv = document.getElementById('loginError');
  if (result.status === 'fail') {
    loginErrorDiv.textContent = result.message;
    loginErrorDiv.style.display = 'block';
  } else {
    window.location.href = '/dashboard'; // Redirect if success
  }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  const registerErrorDiv = document.getElementById('registerError');
  if (result.status === 'fail') {
    registerErrorDiv.textContent = result.message;
    registerErrorDiv.style.display = 'block';
  } else {
    window.location.href = '/login'; // Redirect to login if registration is successful
  }
});
