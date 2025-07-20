document.addEventListener('DOMContentLoaded', function() {
    // --- Data Kamar ---
    const roomData = {
        standard: {
            name: "Standard Room",
            image: "/img/FO EBONY.png", // Pastikan gambar ini ada di folder adminpage/img/
            price: "Rp 350.000",
            capacity: "2 Dewasa & 1 Anak-anak",
            facilities: [
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
        },
        superior: {
            name: "Superior Room",
            image: "/img/hutan.jpg", // Pastikan gambar ini ada di folder adminpage/img/
            price: "Rp 450.000",
            capacity: "2 Dewasa & 1 Anak-anak",
            facilities: [
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
                "Parkiran Luas",
                "Pemandangan Taman"
            ]
        },
        deluxe: {
            name: "Deluxe Room",
            image: "/img/DELUXE.png", // Pastikan gambar ini ada di folder adminpage/img/
            price: "Rp 500.000",
            capacity: "2 Dewasa & 1 Anak-anak",
            facilities: [
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
                "Parkiran Luas",
                "Balcony Pribadi"
            ]
        },
        vip: {
            name: "VIP/Executive Room",
            image: "/img/VIP.png", // Pastikan gambar ini ada di folder adminpage/img/
            price: "Rp 600.000",
            capacity: "2 Dewasa & 1 Anak-anak",
            facilities: [
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
                "Parkiran Luas",
                "Smart TV",
                "Kamar Mandi Mewah",
                "Balcony Pribadi dengan Pemandangan Terbaik",
                "Minibar Gratis"
            ]
        },
        allinvilla: {
            name: "All In Villa",
            image: "/img/ebony.png", // Ganti dengan path gambar villa umum Anda jika ada
            price: "Rp 6.600.000",
            capacity: "14 Kamar & 28 Orang",
            facilities: [
                "14 Kamar",
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
    // const viewButtons = document.querySelectorAll('.room-card .view-btn'); // Tidak lagi diperlukan untuk navigasi halaman

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
                    case 'ac': iconClass = 'fas fa-wind'; break;
                    case 'tv': iconClass = 'fas fa-tv'; break;
                    case 'kamar mandi dalam': iconClass = 'fas fa-toilet'; break;
                    case 'balcony pribadi': iconClass = 'fas fa-city'; break;
                    case 'pemandangan taman': iconClass = 'fas fa-tree'; break;
                    case 'smart tv': iconClass = 'fas fa-tv'; break;
                    case 'kamar mandi mewah': iconClass = 'fas fa-bath'; break;
                    case 'balcony pribadi dengan pemandangan terbaik': iconClass = 'fas fa-mountain'; break;
                    case 'minibar gratis': iconClass = 'fas fa-wine-glass'; break;
                    case '14 kamar': iconClass = 'fas fa-door-open'; break;
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
            // Set default atau tampilkan pesan error jika ID tidak valid
            updateRoomDetail('deluxe'); // Kembali ke default jika ID tidak ditemukan
        }
    }

    // --- LOGIKA BARU: BACA PARAMETER URL SAAT HALAMAN DIMUAT ---
    const urlParams = new URLSearchParams(window.location.search);
    const initialRoomId = urlParams.get('roomid');

    if (initialRoomId) {
        updateRoomDetail(initialRoomId);
    } else {
        // Inisialisasi: Tampilkan detail kamar Deluxe secara default saat halaman dimuat jika tidak ada parameter URL
        updateRoomDetail('deluxe');
    }

    // --- Event Listeners untuk Tombol 'View' (di halaman detail itu sendiri, jika ada daftar samping) ---
    // Logika ini akan memperbarui detail panel TANPA navigasi halaman baru
    const viewButtonsInternal = document.querySelectorAll('.room-list .view-btn');
    viewButtonsInternal.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah navigasi halaman karena ini adalah update internal
            const roomCard = this.closest('.room-card');
            const roomId = roomCard.dataset.roomId;
            updateRoomDetail(roomId);
            
            // Opsional: perbarui URL tanpa me-reload halaman
            window.history.pushState(null, '', `room_ebony.html?roomid=${roomId}`);
        });
    });

    // --- Logika Sidebar Popup (dari kode sebelumnya, tetap sama) ---
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
        console.warn("Element 'menuToggleBtn' tidak ditemukan.");
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    } else {
        console.warn("Element 'closeSidebarBtn' tidak ditemukan.");
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    if (sidebar) {
        sidebar.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // --- Logika Interaktivitas Sidebar Nav Links (untuk penanda active) ---
    const navLinks = document.querySelectorAll('.sidebar .main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            navLinks.forEach(item => item.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            closeSidebar(); 
        });
    });

    // Ini untuk memastikan link di sidebar tetap aktif saat halaman dimuat langsung
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        // Menyesuaikan untuk room.html dan room_ebony.html
        if (currentPath.includes('room.html') || currentPath.includes('room_ebony.html')) {
            if (link.href.includes('room.html')) {
                link.parentElement.classList.add('active');
            }
        }
    });
});