document.addEventListener('DOMContentLoaded', function() {
    // --- Logika Sidebar Popup (Duplikasi di setiap file JS) ---
    const sidebar = document.getElementById('sidebar');
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('overlay');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
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
            event.stopPropagation();
        });
    }

    // --- Logika User Session Dropdown Popup (Duplikasi di setiap file JS) ---
    const userDropdownContainer = document.getElementById('userDropdownContainer');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    if (userDropdownContainer && userDropdownMenu) {
        userDropdownContainer.addEventListener('click', function(event) {
            userDropdownMenu.classList.toggle('active');
            event.stopPropagation();
        });

        document.addEventListener('click', function(event) {
            if (userDropdownMenu.classList.contains('active') && !userDropdownContainer.contains(event.target)) {
                userDropdownMenu.classList.remove('active');
            }
        });
    } else {
        console.warn("Elemen 'userDropdownContainer' atau 'userDropdownMenu' tidak ditemukan.");
    }

    // --- Logika Penanda Sidebar Aktif untuk Multi-Page Application (Duplikasi di setiap file JS) ---
    const navLinks = document.querySelectorAll('.sidebar .main-nav ul li');
    
    function highlightActiveSidebarLink() {
        const currentPath = window.location.pathname.split('/').pop();
        
        navLinks.forEach(li => {
            const link = li.querySelector('a');
            if (link) {
                const hrefPath = link.getAttribute('href');
                if (hrefPath && hrefPath.split('/').pop() === currentPath) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            }
        });
    }

    highlightActiveSidebarLink(); // Panggil saat DOMContentLoaded

    navLinks.forEach(linkLi => {
        linkLi.addEventListener('click', function() {
            closeSidebar(); // Tutup sidebar setelah link diklik
        });
    });

    // --- Logika Khusus Reservasi: Responsive Tables ---
    const reservationTable = document.querySelector('.reservation-list-section table');
    const bookingHistoryTable = document.querySelector('.booking-history-section table');

    function addDataLabels(table) {
        if (!table) return;
        if (table.querySelector('td[data-label]')) return; 

        const headers = Array.from(table.querySelectorAll('thead th'));
        table.querySelectorAll('tbody tr').forEach(row => {
            Array.from(row.querySelectorAll('td')).forEach((cell, index) => {
                if (headers[index]) {
                    cell.setAttribute('data-label', headers[index].textContent);
                }
            });
        });
    }

    addDataLabels(reservationTable);
    addDataLabels(bookingHistoryTable);
    // Note: Chart.js tidak diinisialisasi di sini karena ini bukan halaman Dashboard
});