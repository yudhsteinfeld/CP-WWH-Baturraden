document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Show/hide password functionality
    const passwordToggle = document.querySelector('.password-toggle[data-target="password"]');

    passwordToggle.addEventListener('click', function() {
        // Toggle input type between 'password' and 'text'
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Toggle eye icon (open/closed)
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman form secara default

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Reset pesan error
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        // Validasi sederhana
        if (username === '' || password === '') {
            errorMessage.textContent = 'Username/Email dan Password harus diisi.';
            errorMessage.style.display = 'block';
            return;
        }

        console.log('Mencoba login dengan:');
        console.log('Username/Email:', username);
        console.log('Password:', password);

        // --- Simulasi Proses Login (Frontend Saja) ---
        // Dalam aplikasi nyata, data ini akan dikirim ke server (backend)
        // untuk diverifikasi.

        if (username === 'user@example.com' && password === 'password123') {
            alert('Login berhasil! Selamat datang, ' + username + '!');
            // Di sini Anda bisa mengarahkan pengguna ke halaman dashboard, dll.
            // window.location.href = '/dashboard.html';
        } else {
            errorMessage.textContent = 'Username atau password salah. Silakan coba lagi.';
            errorMessage.style.display = 'block';
        }
    });
});