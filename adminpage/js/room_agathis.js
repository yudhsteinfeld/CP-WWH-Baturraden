document.addEventListener('DOMContentLoaded', function() {
    // --- Data Kamar untuk Villa Agathis (Hanya All In Villa) ---
    const roomData = {
        allinvilla: {
            name: "All In Villa Agathis",
            image: "img/agathis1.png", // Path gambar khusus Agathis
            price: "Rp 2.700.000",
            capacity: "6 Kamar & 12 Orang",
            facilities: [
                "6 Kamar Tidur",
                "Akses Seluruh Fasilitas Villa",
                "Ideal untuk Rombongan/Acara",
                "Free Breakfast",
                "Free Tiket WWH",
                "WiFi",
                "Pantry",
                "Hot Shower",
                "Double / Twin Bed",
                "Bath Amenities",
                "Teko Pemanas Air",
                "LED TV",
                "Air Mineral",
                "Resepsionis 24 Jam",
                "Keamanan 24 Jam",
                "Parkiran Luas"
            ]
        }
    };

    // --- Elemen Detail Kamar di Panel Kanan ---
    const detailRoomName = document.getElementById('detailRoomName');
    const detailRoomImage = document.getElementById('detailRoomImage');
    const detailRoomPrice = document.getElementById('detailRoomPrice');
    const detailFacilitiesList = document.getElementById('detailFacilitiesList');
    const bookNowButton = document.getElementById('bookNowButton'); // Tombol Pesan Sekarang


    // Fungsi untuk memperbarui panel detail kamar
    function updateRoomDetail(roomId) {
        const room = roomData[roomId];
        if (room) {
            detailRoomName.textContent = room.name;
            detailRoomImage.src = room.image;
            detailRoomImage.alt = room.name;
            detailRoomPrice.textContent = `Harga Per Malam ${room.price}`;

            // Kosongkan daftar fasilitas yang lama
            detailFacilitiesList.innerHTML = '';

            // Buat elemen fasilitas baru dari data
            room.facilities.forEach(facilityText => {
                const span = document.createElement('span');
                const icon = document.createElement('i');
                let iconClass = '';
                // Menentukan ikon berdasarkan teks fasilitas (bisa disesuaikan lebih lanjut)
                switch (facilityText.toLowerCase()) {
                    case 'free breakfast': iconClass = 'fas fa-coffee'; break;
                    case 'free tiket wwh': iconClass = 'fas fa-ticket-alt'; break;
                    case 'wifi': iconClass = 'fas fa-wifi'; break;
                    case 'pantry': iconClass = 'fas fa-utensils'; break;
                    case 'hot shower': iconClass = 'fas fa-shower'; break;
                    case 'double / twin bed': iconClass = 'fas fa-bed'; break;
                    case 'bath amenities': iconClass = 'fas fa-toilet'; break;
                    case 'teko pemanas air': iconClass = 'fas fa-mug-hot'; break;
                    case 'led tv': iconClass = 'fas fa-tv'; break;
                    case 'air mineral': iconClass = 'fas fa-tint'; break;
                    case 'resepsionis 24 jam': iconClass = 'fas fa-clock'; break;
                    case 'keamanan 24 jam': iconClass = 'fas fa-shield-alt'; break;
                    case 'parkiran luas': iconClass = 'fas fa-parking'; break;
                    case '6 kamar tidur': iconClass = 'fas fa-door-open'; break;
                    case 'akses seluruh fasilitas villa': iconClass = 'fas fa-house-user'; break;
                    case 'ideal untuk rombongan/acara': iconClass = 'fas fa-users'; break;
                    default: iconClass = 'fas fa-check-circle';
                }
                icon.className = iconClass;
                span.appendChild(icon);
                span.appendChild(document.createTextNode(facilityText));
                detailFacilitiesList.appendChild(span);
            });
        } else {
            console.error(`Data untuk kamar dengan ID "${roomId}" tidak ditemukan.`);
        }
    }

    // --- LOGIKA: BACA PARAMETER URL SAAT HALAMAN DIMUAT ATAU TAMPILKAN DEFAULT ---
    const urlParams = new URLSearchParams(window.location.search);
    const initialRoomId = urlParams.get('roomid');

    if (initialRoomId && roomData[initialRoomId]) {
        updateRoomDetail(initialRoomId);
    } else {
        updateRoomDetail('allinvilla');
    }

    // --- Event Listener untuk Tombol 'View' pada room-card (jika ada daftar samping) ---
    const viewButtonsInternal = document.querySelectorAll('.room-list .view-btn');
    viewButtonsInternal.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah navigasi halaman karena ini adalah update internal
            const roomCard = this.closest('.room-card');
            const roomId = roomCard.dataset.roomId;
            updateRoomDetail(roomId);
            window.history.pushState(null, '', `room_agathis.html?roomid=${roomId}`);
        });
    });

    // --- Event Listener untuk Tombol "Pesan Sekarang" di Panel Detail ---
    if (bookNowButton) {
        bookNowButton.addEventListener('click', function() {
            const villaName = "Villa Agathis";
            const roomType = roomData.allinvilla.name;
            const price = roomData.allinvilla.price; // Gunakan .price bukan .value
            const capacityMatch = roomData.allinvilla.capacity.match(/\d+/); // Ambil angka pertama
            const capacity = capacityMatch ? capacityMatch[0] : '';


            // Perhatikan bahwa Anda perlu memastikan file pemesanan.html ada atau sesuaikan path-nya
            window.location.href = `pemesanan.html?villa=${encodeURIComponent(villaName)}&roomType=${encodeURIComponent(roomType)}&price=${encodeURIComponent(price)}&capacity=${encodeURIComponent(capacity)}`;
        });
    }


    // --- Logika Sidebar Popup / Layout Tetap ---
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('overlay');

    // Fungsi untuk membuka sidebar (sebagai popup)
    function openSidebar() {
        if (window.innerWidth <= 768) { // Hanya buka sebagai popup di mobile
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; /* Mencegah scroll body saat sidebar terbuka */
            if (mainContent) {
                mainContent.style.filter = 'blur(2px)'; /* Efek blur pada konten utama */
                mainContent.style.pointerEvents = 'none'; /* Nonaktifkan interaksi pada konten utama */
            }
        }
    }

    // Fungsi untuk menutup sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; /* Mengembalikan scroll body */
        if (mainContent) {
            mainContent.style.filter = 'none'; /* Hapus efek blur */
            mainContent.style.pointerEvents = 'auto'; /* Aktifkan kembali interaksi */
        }
    }

    // Inisialisasi status sidebar saat halaman dimuat dan saat ukuran layar berubah
    function initializeSidebarState() {
        if (window.innerWidth >= 769) { // Desktop view (sesuai media query di CSS)
            // Di desktop, sidebar selalu terlihat dan bukan popup
            sidebar.classList.remove('active'); // Pastikan kelas active dihapus
            // CSS media query sudah mengatur transform, visibility, opacity, dan z-index
            // Kita tidak perlu mengatur style property langsung di JS untuk ini jika CSS sudah menangani
            // Pastikan mainContent padding diatur oleh CSS
            // Pastikan tombol toggle dan close diatur oleh CSS
            // Pastikan overlay diatur oleh CSS
            document.body.style.overflow = ''; // Pastikan body bisa scroll di desktop

            // Hapus efek blur jika ada dari mode mobile
            if (mainContent) {
                mainContent.style.filter = 'none';
                mainContent.style.pointerEvents = 'auto';
            }

        } else { // Mobile/Tablet view
            // Di mobile, sidebar dimulai sebagai tersembunyi
            sidebar.classList.remove('active'); // Pastikan kelas active dihapus
            // CSS media query sudah mengatur transform, visibility, opacity, dan z-index
            // Pastikan mainContent padding diatur oleh CSS
            // Pastikan tombol toggle dan close diatur oleh CSS
            // Pastikan overlay diatur oleh CSS
            document.body.style.overflow = ''; // Pastikan body bisa scroll di mobile secara default
        }
    }

    // Panggil inisialisasi saat DOMContentLoaded dan resize
    initializeSidebarState();
    window.addEventListener('resize', initializeSidebarState);

    // Event listeners untuk membuka/menutup sidebar
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

    // Mencegah klik di sidebar itu sendiri menutupnya (penting untuk popup)
    if (sidebar) {
        sidebar.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // --- Logika Interaktivitas Sidebar Nav Links (untuk penanda active) ---
    const navLinks = document.querySelectorAll('.sidebar .main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Hapus kelas 'active' dari semua item
            navLinks.forEach(item => item.parentElement.classList.remove('active'));
            // Tambahkan kelas 'active' ke item yang diklik
            this.parentElement.classList.add('active');

            // Tutup sidebar setelah klik link, hanya jika di mode mobile/popup
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // Ini untuk memastikan link di sidebar tetap aktif saat halaman dimuat langsung
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        // Logika untuk menandai 'Room' sebagai aktif jika di halaman room_agathis.html
        if (currentPath.includes('room.html') || currentPath.includes('room_ebony.html') || currentPath.includes('room_agathis.html')) {
            if (link.href.includes('room.html')) { // Cukup cek link ke room.html
                link.parentElement.classList.add('active');
            }
        } else if (currentPath.includes('indexadmin.html')) {
             if (link.href.includes('indexadmin.html')) {
                link.parentElement.classList.add('active');
            }
        } else if (currentPath.includes('adminreservasi.html')) {
             if (link.href.includes('adminreservasi.html')) {
                link.parentElement.classList.add('active');
            }
        }
        // Tambahkan kondisi untuk halaman lain jika diperlukan
    });
});