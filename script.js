document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    const searchInput = document.getElementById('search-input');

    // 1. Logika Filter Kategori
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            bookCards.forEach(card => {
                const bookCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || bookCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Logika Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();
            bookCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const author = card.querySelector('.author').innerText.toLowerCase();
                if (title.includes(searchText) || author.includes(searchText)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

let activeBookId = null;

// 3. Fungsi Membuka Pop-Up (Modal) - VERSI LINK ONLINE
function openBookModal(bookId, title, author) {
    activeBookId = bookId;
    
    document.getElementById('modal-book-title').innerText = title;
    document.getElementById('modal-book-author').innerText = author;

    if (bookId === 1) {
        // TEMPELKAN LINK GOOGLE DRIVE ANDA YANG BERAKHIRAN /preview DI SINI:
        document.getElementById('pdf-viewer-word').src = "https://drive.google.com/file/d/1VN3rQAwAzkI36__n--M3rG3p0OYodDXo/preview";
        document.getElementById('pdf-viewer-ppt').src = "https://drive.google.com/file/d/1P-FdSFr6OshiCgXaEMW78D6BCr750uWF/preview";
        
        // Load Video
        document.getElementById('video-viewer').src = "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-writing-on-a-holy-book-41618-large.mp4";
    }

    document.getElementById('multimedia-modal').style.display = "flex";
    switchModalTab('word');
}

// 4. Fungsi Menutup Pop-Up
function closeBookModal() {
    document.getElementById('multimedia-modal').style.display = "none";
    document.getElementById('pdf-viewer-word').src = "";
    document.getElementById('pdf-viewer-ppt').src = "";
    document.getElementById('video-viewer').pause();
}

// 5. Fungsi Mengganti Tab
function switchModalTab(tabType) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.doc-viewer').forEach(viewer => viewer.classList.remove('active-viewer'));

    document.getElementById('video-viewer').pause();

    if (tabType === 'word') {
        document.getElementById('tab-word').classList.add('active');
        document.getElementById('pdf-viewer-word').classList.add('active-viewer');
    } else if (tabType === 'ppt') {
        document.getElementById('tab-ppt').classList.add('active');
        document.getElementById('pdf-viewer-ppt').classList.add('active-viewer');
    } else if (tabType === 'video') {
        document.getElementById('tab-video').classList.add('active');
        const videoElement = document.getElementById('video-viewer');
        videoElement.classList.add('active-viewer');
        videoElement.play();
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('multimedia-modal');
    if (event.target == modal) {
        closeBookModal();
    }
}