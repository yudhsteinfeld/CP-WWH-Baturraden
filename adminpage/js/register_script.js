document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('password_confirmation');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Show/hide password functionality for both password fields
    const passwordToggle = document.querySelector('.password-toggle[data-target="password"]');
    const confirmPasswordToggle = document.querySelector('.password-toggle[data-target="password_confirmation"]');

    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    confirmPasswordToggle.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });


    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form reload halaman

        // Mengambil nilai input dan membersihkan spasi
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const passwordConfirmation = confirmPasswordInput.value.trim();

        // Reset pesan error dan sukses
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        successMessage.textContent = '';
        successMessage.style.display = 'none';

        // --- Validasi Sisi Klien ---
        if (name === '' || email === '' || password === '' || passwordConfirmation === '') {
            errorMessage.textContent = 'Semua field harus diisi.';
            errorMessage.style.display = 'block';
            return;
        }

        if (password.length < 6) {
            errorMessage.textContent = 'Password minimal 6 karakter.';
            errorMessage.style.display = 'block';
            return;
        }

        if (password !== passwordConfirmation) {
            errorMessage.textContent = 'Konfirmasi password tidak cocok.';
            errorMessage.style.display = 'block';
            return;
        }

        // Regex sederhana untuk validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Format email tidak valid.';
            errorMessage.style.display = 'block';
            return;
        }

        console.log('Mencoba mendaftar dengan data:');
        console.log('Nama:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        // Data pendaftaran yang diinginkan untuk simulasi (sesuai permintaan Anda)
        const targetRegistration = {
            "name": "User Tamu",
            "email": "tamu@example.com",
            "password": "password",
            "password_confirmation": "password"
        };

        // Simulasi pendaftaran berhasil jika input cocok dengan data yang diinginkan
        if (name === targetRegistration.name &&
            email === targetRegistration.email &&
            password === targetRegistration.password && // Dalam aplikasi nyata, ini adalah password yang di-hash
            passwordConfirmation === targetRegistration.password_confirmation) {

            successMessage.textContent = 'Registrasi berhasil! Anda bisa login sekarang.';
            successMessage.style.display = 'block';

            // Opsional: Reset form setelah sukses
            registerForm.reset();

            // Opsional: Redirect ke halaman login setelah 3 detik
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } else {
            // Jika data tidak cocok dengan simulasi target, atau ada error lain dari "backend" simulasi
            errorMessage.textContent = 'Gagal mendaftar. Silakan coba lagi dengan data yang valid.';
            errorMessage.style.display = 'block';
        }
    });
});