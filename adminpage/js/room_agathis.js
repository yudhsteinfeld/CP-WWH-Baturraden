document.addEventListener('DOMContentLoaded', function() {
    // --- Data Kamar ---
    const roomData = {
        allinvilla: {
            name: "All In Villa",
            image: "/img/agathis.png", // Path gambar disesuaikan
            price: "Rp 2.700.000",
            capacity: "6 Kamar & 12 Orang",
            facilities: [
                "6 Kamar",
                "Akses Seluruh Fasilitas Villa",
                "Ideal untuk Rombongan/Acara",
                "Free Breakfast",
                "Free Tiket WWH",
                "WiFi",
                "Pantry",
                "Hot Shower",
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
                    case '6 kamar': iconClass = 'fas fa-door-open'; break;
                    case 'akses seluruh fasilitas villa': iconClass = 'fas fa-house-user'; break;
                    case 'ideal untuk rombongan/acara': iconClass = 'fas fa-users'; break;
                    case 'area duduk': iconClass = 'fas fa-couch'; break;
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

    // --- LOGIKA BARU: BACA PARAMETER URL SAAT HALAMAN DIMUAT ---
    const urlParams = new URLSearchParams(window.location.search);
    const initialRoomId = urlParams.get('roomid');

    if (initialRoomId === 'allinvilla') {
        updateRoomDetail('allinvilla');
    } else {
        updateRoomDetail('allinvilla'); // Selalu tampilkan All In Villa sebagai default
    }

    // --- Event Listeners untuk Tombol 'View' ---
    const viewButtonsInternal = document.querySelectorAll('.room-list .view-btn');
    viewButtonsInternal.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const roomCard = this.closest('.room-card');
            const roomId = roomCard.dataset.roomId;
            updateRoomDetail(roomId);
            
            window.history.pushState(null, '', `room_agathis.html?roomid=${roomId}`);
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
        if (currentPath.includes('room.html') || currentPath.includes('room_ebony.html') || currentPath.includes('room_agathis.html')) {
            if (link.href.includes('room.html') || link.href.includes('room_agathis.html')) {
                link.parentElement.classList.add('active');
            }
        }
    });
});