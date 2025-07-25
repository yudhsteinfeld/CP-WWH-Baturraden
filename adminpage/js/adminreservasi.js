document.addEventListener('DOMContentLoaded', function() {
    // --- Logika Sidebar Popup (Duplikasi di setiap file JS) ---
    const sidebar = document.getElementById('sidebar');
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('overlay'); // Overlay umum untuk sidebar

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

    highlightActiveSidebarLink();

    navLinks.forEach(linkLi => {
        linkLi.addEventListener('click', function() {
            closeSidebar();
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

    // --- Logika Khusus Reservasi: Popup Add Booking Villa ---
    const addBookingBtn = document.getElementById('addBookingBtn');
    const selectVillaModal = document.getElementById('selectVillaModal');
    const closeVillaModalBtn = document.getElementById('closeVillaModal');
    const modalOverlay = document.getElementById('addBookingModalOverlay'); // Overlay khusus modal

    function openVillaModal() {
        selectVillaModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scrolling body
    }

    function closeVillaModal() {
        selectVillaModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Mengembalikan scrolling body
    }

    if (addBookingBtn) {
        addBookingBtn.addEventListener('click', openVillaModal);
    } else {
        console.warn("Tombol 'Add Booking' tidak ditemukan.");
    }

    if (closeVillaModalBtn) {
        closeVillaModalBtn.addEventListener('click', closeVillaModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeVillaModal); // Menutup modal saat klik overlay-nya
    }

    if (selectVillaModal) {
        selectVillaModal.addEventListener('click', function(event) {
            event.stopPropagation(); // Mencegah klik di dalam modal menutupnya
        });
    }

    // =======================================================================
    // --- KODE BARU: Menghubungkan Tombol Select Villa ke Halaman Masing-Masing ---
    // =======================================================================
    const selectVillaButtons = document.querySelectorAll('.villa-card .select-villa-btn');

    selectVillaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Dapatkan elemen kartu villa terdekat dari tombol yang diklik
            const villaCard = this.closest('.villa-card');
            // Dapatkan nama villa dari elemen <h4> di dalam kartu
            const villaName = villaCard.querySelector('h4').textContent.trim();

            let destinationFile = '';

            // Tentukan file tujuan berdasarkan nama villa
            if (villaName === 'Villa Ebony') {
                destinationFile = 'addadmin_ebony.html';
            } else if (villaName === 'Villa Acacia') {
                destinationFile = 'addadmin_accacia.html';
            } else if (villaName === 'Villa Agathis') {
                destinationFile = 'addadmin_agathis.html';
            }

            // Jika file tujuan sudah ditentukan, arahkan halaman ke sana
            if (destinationFile) {
                window.location.href = destinationFile;
            }
        });
    });
});