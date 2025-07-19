document.addEventListener('DOMContentLoaded', function() {
    
    // Cari semua tombol dengan class .btn-select-room di halaman
    const selectButtons = document.querySelectorAll('.btn-select-room');

    // Loop melalui setiap tombol yang ditemukan
    selectButtons.forEach(button => {
        // Tambahkan event listener pada setiap tombol
        button.addEventListener('click', function() {
            // Ambil elemen '.room-option-item' terdekat dari tombol yang diklik
            const roomItem = this.closest('.room-option-item');
            if (!roomItem) return; // Hentikan jika tidak ditemukan

            // --- INI MODIFIKASINYA ---
            // Secara otomatis membaca nama Villa dari header
            const villaNameElement = document.querySelector('.navbar-brand-text');
            const villaName = villaNameElement ? villaNameElement.textContent.trim() : 'Villa Tidak Ditemukan';

            // Ambil detail lain dari atribut data-*
            const roomType = roomItem.dataset.roomType;
            const price = roomItem.dataset.price;
            const capacity = roomItem.dataset.capacity;

            // Buat URL untuk halaman form pemesanan (nama file disesuaikan)
            const url = `formpemesanan_admin.html?villa=${encodeURIComponent(villaName)}&roomType=${encodeURIComponent(roomType)}&price=${encodeURIComponent(price)}&capacity=${encodeURIComponent(capacity)}`;
            
            // Arahkan browser ke halaman form
            window.location.href = url;
        });
    });

});