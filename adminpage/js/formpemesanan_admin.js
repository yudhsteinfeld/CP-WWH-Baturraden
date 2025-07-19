document.addEventListener('DOMContentLoaded', function() {
    // --- Variabel Global dari URL ---
    let currentVillaName = "";
    let currentRoomType = "";
    let currentRoomPrice = 0;
    let currentRoomCapacity = 0;

    // --- Elemen Form (Kolom Kiri) ---
    const form = document.getElementById("formPemesanan");
    const namaInput = document.getElementById("nama");
    const idNumberInput = document.getElementById("idNumber");
    const emailInput = document.getElementById("email");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const iAmGuestRadio = document.getElementById("iAmGuest");
    const bookingForAnotherRadio = document.getElementById("bookingForAnother");
    const actualGuestSection = document.getElementById("actualGuestSection");
    const actualGuestNamaInput = document.getElementById("actualGuestNama");
    const actualGuestIDNumberInput = document.getElementById("actualGuestIDNumber");
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const jumlahKamarInput = document.getElementById("jumlahKamar");
    const tamuInput = document.getElementById("tamu");
    const extraBedSelect = document.getElementById("extraBed");
    const catatanInput = document.getElementById("catatan");
    const cashRadio = document.getElementById("cash");
    const qrisRadio = document.getElementById("qris");
    const qrisSection = document.getElementById("qrisSection");
    const buktiInput = document.getElementById("bukti");
    const totalHargaDisplay = document.getElementById("totalHargaDisplay");
    const kapasitasAlert = document.getElementById("kapasitasAlert");
    const alertContainer = document.getElementById("alert-container");
    const selectedVillaRoomInfoDisplay = document.getElementById("selectedVillaRoomInfo");

    // --- Elemen Display (Panel Kanan) ---
    const villaNameDisplay = document.getElementById("villaNameDisplay");
    const checkinDateDisplay = document.getElementById("checkinDateDisplay");
    const checkoutDateDisplay = document.getElementById("checkoutDateDisplay");
    const nightsCountDisplay = document.getElementById("nightsCountDisplay");
    const roomTypeDetailsDisplay = document.getElementById("roomTypeDetailsDisplay");
    const guestCountDisplay = document.getElementById("guestCountDisplay");
    const extraBedDisplay = document.getElementById("extraBedDisplay");
    const roomsNightsSummary = document.getElementById("roomsNightsSummary");
    const finalPriceDisplay = document.getElementById("finalPriceDisplay");

    // Fungsi untuk memformat angka menjadi Rupiah
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    }

    // Fungsi untuk mengatur tampilan detail penginap
    function toggleActualGuestDetails() {
        const contactIDNumberGroup = document.getElementById("contactIDNumberGroup");
        if (bookingForAnotherRadio.checked) {
            contactIDNumberGroup.style.display = "none";
            idNumberInput.required = false;
            actualGuestSection.style.display = "block";
            actualGuestNamaInput.required = true;
            actualGuestIDNumberInput.required = true;
        } else {
            contactIDNumberGroup.style.display = "block";
            idNumberInput.required = true;
            actualGuestSection.style.display = "none";
            actualGuestNamaInput.required = false;
            actualGuestIDNumberInput.required = false;
        }
    }

    // Fungsi untuk menampilkan/menyembunyikan bagian QRIS
    function updateMetode() {
        if (qrisRadio.checked) {
            qrisSection.style.display = "block";
            // Di form admin, bukti tidak wajib saat pembuatan
            buktiInput.required = false; 
        } else {
            qrisSection.style.display = "none";
            buktiInput.required = false;
            buktiInput.value = "";
        }
    }

    // Fungsi utama untuk menghitung total harga dan validasi
    function calculateAndValidate() {
        if (!currentVillaName || !currentRoomType) return;

        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);
        const jumlahKamar = parseInt(jumlahKamarInput.value) || 0;
        const jumlahTamu = parseInt(tamuInput.value) || 0;
        const extraBedCount = parseInt(extraBedSelect.value) || 0;
        
        // HARGA EXTRA BED (dapat disesuaikan)
        const HARGA_EXTRA_BED = 150000; 

        let jumlahMalam = 0;
        if (checkinInput.value && checkoutInput.value && checkoutDate > checkinDate) {
            const diffTime = Math.abs(checkoutDate - checkinDate);
            jumlahMalam = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        const totalKapasitas = currentRoomCapacity * jumlahKamar;
        
        // Validasi Kapasitas
        kapasitasAlert.style.display = (jumlahTamu > totalKapasitas) ? 'block' : 'none';
        tamuInput.setCustomValidity((jumlahTamu > totalKapasitas) ? `Kapasitas terlampaui. Maksimal: ${totalKapasitas} orang.` : '');

        // Kalkulasi Total Harga
        const hargaKamarTotal = currentRoomPrice * jumlahMalam * jumlahKamar;
        const hargaExtraBedTotal = extraBedCount * HARGA_EXTRA_BED * jumlahMalam; // Harga extra bed dikali jumlah malam
        const totalHarga = hargaKamarTotal + hargaExtraBedTotal;

        // Update Tampilan Kiri
        totalHargaDisplay.textContent = formatRupiah(totalHarga);
        
        // Update Tampilan Kanan (Ringkasan)
        finalPriceDisplay.textContent = formatRupiah(totalHarga);
        villaNameDisplay.textContent = currentVillaName;
        roomTypeDetailsDisplay.textContent = `(${jumlahKamar}x) ${currentRoomType}`;
        checkinDateDisplay.textContent = checkinInput.value || '...';
        checkoutDateDisplay.textContent = checkoutInput.value || '...';
        nightsCountDisplay.textContent = `${jumlahMalam} malam`;
        guestCountDisplay.textContent = `${jumlahTamu} Tamu / Kapasitas ${totalKapasitas}`;
        extraBedDisplay.textContent = extraBedCount > 0 ? `${extraBedCount} Extra Bed` : 'Tidak ada extra bed';
        roomsNightsSummary.textContent = `${jumlahKamar} kamar, ${jumlahMalam} malam`;
    }

    // --- Inisialisasi Saat Halaman Dimuat ---
    function initializePage() {
        const urlParams = new URLSearchParams(window.location.search);
        currentVillaName = urlParams.get('villa') ? decodeURIComponent(urlParams.get('villa')) : '';
        currentRoomType = urlParams.get('roomType') ? decodeURIComponent(urlParams.get('roomType')) : '';
        currentRoomPrice = urlParams.get('price') ? parseFloat(urlParams.get('price')) : 0;
        currentRoomCapacity = urlParams.get('capacity') ? parseInt(urlParams.get('capacity')) : 0;

        if (currentVillaName && currentRoomType) {
            selectedVillaRoomInfoDisplay.innerHTML = `Villa: <strong>${currentVillaName}</strong> / Jenis Kamar: <strong>${currentRoomType}</strong>`;
            
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            checkinInput.value = today.toISOString().split('T')[0];
            checkoutInput.value = tomorrow.toISOString().split('T')[0];
            tamuInput.value = currentRoomCapacity;

            toggleActualGuestDetails();
            updateMetode();
            calculateAndValidate();
        } else {
            alertContainer.innerHTML = `<div class="alert alert-danger"><strong>Kesalahan!</strong> Halaman ini harus diakses dari halaman pemilihan kamar.</div>`;
            form.querySelector('button[type="submit"]').disabled = true;
        }
    }

    // --- Event Listeners ---
    [checkinInput, checkoutInput, jumlahKamarInput, tamuInput, extraBedSelect].forEach(input => {
        input.addEventListener('change', calculateAndValidate);
        input.addEventListener('keyup', calculateAndValidate);
    });

    [iAmGuestRadio, bookingForAnotherRadio].forEach(radio => {
        radio.addEventListener('change', toggleActualGuestDetails);
    });

    [cashRadio, qrisRadio].forEach(radio => {
        radio.addEventListener('change', updateMetode);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Kumpulkan data untuk pesan sukses
        const pemesan = namaInput.value;
        const totalHargaFinal = totalHargaDisplay.textContent;
        
        let pesanSukses = `<strong>Reservasi Berhasil Dibuat!</strong><br>
                           Nama Pemesan: <strong>${pemesan}</strong><br>
                           Total Tagihan: <strong>${totalHargaFinal}</strong>.`;

        if (bookingForAnotherRadio.checked) {
            pesanSukses += `<br>Nama Tamu: <strong>${actualGuestNamaInput.value}</strong>`;
        }

        alertContainer.innerHTML = `<div class="alert alert-success">${pesanSukses}</div>`;
        form.reset();
        
        // Reset tampilan dan muat ulang halaman setelah 2 detik
        setTimeout(() => {
             location.reload();
        }, 2000);
    });

    // Jalankan inisialisasi
    initializePage();
});