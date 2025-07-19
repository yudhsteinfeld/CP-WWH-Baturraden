// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {
    
    // Cari semua tombol dengan class .btn-select-room
    const selectButtons = document.querySelectorAll('.btn-select-room');

    // Tambahkan event listener untuk setiap tombol
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ambil data dari elemen parent terdekat (.room-option-item)
            const roomItem = this.closest('.room-option-item');
            const roomType = roomItem.dataset.roomType;
            const price = roomItem.dataset.price;
            const capacity = roomItem.dataset.capacity;
            const villaName = "Villa Ebony"; // Nama villa sudah ditentukan di halaman ini

            // Buat URL untuk halaman formulir pemesanan selanjutnya
            // Halaman tujuan diasumsikan bernama 'admin_form_pemesanan.html'
            const url = `admin_form_pemesanan.html?villa=${encodeURIComponent(villaName)}&roomType=${encodeURIComponent(roomType)}&price=${encodeURIComponent(price)}&capacity=${encodeURIComponent(capacity)}`;
            
            // Arahkan browser ke halaman formulir
            window.location.href = url;
        });
    });

});