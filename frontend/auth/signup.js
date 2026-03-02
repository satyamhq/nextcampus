document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('nc_token')) window.location.href = pagePath('dashboard');

    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const errorEl = document.getElementById('signup-error');
        errorEl.style.display = 'none';

        try {
            const res = await apiFetch('/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });
            localStorage.setItem('nc_token', res.token);
            localStorage.setItem('nc_user', JSON.stringify(res.user));
            window.location.href = pagePath('dashboard');
        } catch (err) {
            errorEl.textContent = err.message || 'Signup failed. Please try again.';
            errorEl.style.display = 'block';
        }
    });
});
