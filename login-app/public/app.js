const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const authContainer = document.getElementById('auth-container');
const signupContainer = document.getElementById('signup-container');
const dashboard = document.getElementById('dashboard');
const usernameDisplay = document.getElementById('username-display');
const logoutBtn = document.getElementById('logout-btn');

showSignup.addEventListener('click', () => {
    authContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});

showLogin.addEventListener('click', () => {
    signupContainer.style.display = 'none';
    authContainer.style.display = 'block';
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        showDashboard(username);
    } else {
        alert(data.message);
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        signupContainer.style.display = 'none';
        authContainer.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    dashboard.style.display = 'none';
    authContainer.style.display = 'block';
});

function showDashboard(username) {
    authContainer.style.display = 'none';
    signupContainer.style.display = 'none';
    dashboard.style.display = 'block';
    usernameDisplay.textContent = username;
}

const token = localStorage.getItem('token');
if (token) {
    const username = 'user'; // In a real app, you'd get this from the token or another API call
    showDashboard(username);
}
