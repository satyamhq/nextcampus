document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('nc_token')) window.location.href = pagePath('dashboard');

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');
        errorEl.style.display = 'none';

        try {
            const res = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            localStorage.setItem('nc_token', res.token);
            localStorage.setItem('nc_user', JSON.stringify(res.user));
            window.location.href = res.user.role === 'admin' ? pagePath('admin') : pagePath('dashboard');
        } catch (err) {
            errorEl.textContent = err.message || 'Login failed. Please check your credentials.';
            errorEl.style.display = 'block';
        }
    });
});
