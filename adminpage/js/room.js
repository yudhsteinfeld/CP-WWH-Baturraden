document.addEventListener('DOMContentLoaded', function() {
    // --- Logika Sidebar Popup ---
    const sidebar = document.getElementById('sidebar');
    const menuToggleBtn = document.getElementById('menuToggleBtn'); // Tombol hamburger
    const closeSidebarBtn = document.getElementById('closeSidebarBtn'); // Tombol X di dalam sidebar
    const overlay = document.getElementById('overlay'); // Overlay

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scrolling body
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Mengembalikan scrolling body
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', openSidebar);
    } else {
        console.warn("Elemen 'menuToggleBtn' tidak ditemukan.");
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    } else {
        console.warn("Elemen 'closeSidebarBtn' tidak ditemukan.");
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    if (sidebar) {
        sidebar.addEventListener('click', function(event) {
            event.stopPropagation(); // Mencegah event click menyebar ke overlay/body
        });
    }

    // --- Logika User Session Dropdown Popup ---
    const userDropdownContainer = document.getElementById('userDropdownContainer');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    if (userDropdownContainer && userDropdownMenu) {
        // Toggle dropdown saat container diklik
        userDropdownContainer.addEventListener('click', function(event) {
            userDropdownMenu.classList.toggle('active');
            event.stopPropagation(); // Mencegah klik menyebar ke document dan langsung menutup
        });

        // Tutup dropdown jika mengklik di luar
        document.addEventListener('click', function(event) {
            if (userDropdownMenu.classList.contains('active') && !userDropdownContainer.contains(event.target)) {
                userDropdownMenu.classList.remove('active');
            }
        });
    } else {
        console.warn("Elemen 'userDropdownContainer' atau 'userDropdownMenu' tidak ditemukan.");
    }

    // --- Logika Interaktivitas Sidebar Nav Links (untuk penanda active) ---
    const navLinks = document.querySelectorAll('.sidebar .main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Hapus kelas aktif dari semua tautan
            navLinks.forEach(item => item.parentElement.classList.remove('active'));
            // Tambahkan kelas aktif ke parent <li> dari tautan yang diklik
            this.parentElement.classList.add('active');
            
            // Tutup sidebar setelah mengklik item menu karena dia adalah popup
            closeSidebar(); 
        });
    });

    // Tidak ada logika Chart.js yang spesifik untuk room.html yang diperlukan berdasarkan gambar.
});