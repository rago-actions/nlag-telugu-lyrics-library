// ============================================
// Joey Telugu Lyrics Library - Enhanced Version
// With favorites, themes, sharing, and more
// ============================================

// Global state
let allSongs = [];
let filteredSongs = [];
let selectedLetter = null;
let backdrop = null;
let favorites = new Set();
let recentlyViewed = [];
let currentTheme = 'dark';
let fontSize = 100; // percentage
let showTransliteration = true;
let currentSort = 'a-z';

// Song data - ALL songs including newly added ones
const songFiles = [
    "ADONAI ENGLISH",
    "ADONAI SUROYADAYAMU",
    "Aaradhana Neeke",
    "Aaradhana Yesu Neeke",
    "Aaradhanaku Yogyuda",
    "Aaradhinchedamu Yesayya Namamunu",
    "Aaradhinchedamu Yesayya Namamunu v2",
    "Aaradinchedanu Ninnu Na Yesayya",
    "Aayaney",
    "Ae Reethi Nee Runam",
    "Anni Naamamula Kanna Pai Naamamu",
    "Anthyakaala abhishekam",
    "Aradhana Sthuthi Aaradhana",
    "Aradhana Stuthi Aaradhana",
    "Asaadhyamainadi Lene Ledu",
    "Ashirwadam",
    "Athyunnata Simhasanamu Pai",
    "Bangaram Adagaledu",
    "Bhaasillenu Siluvalo",
    "Bhayamu ledu (YAHWEH )",
    "Bhayapadanu",
    "Daveedu Vale Natyamadi",
    "Deevinchaave Samruddhiga",
    "Deva Naa Thodai Raava",
    "Devuni Stutinchudi",
    "Dhanyawadamutho Sthuthi Padedhanu",
    "E Tegulu Nee Gudaramu",
    "Ebinejare Ebinejare",
    "Emmanuelu Deva",
    "Enduko Nanninthaga",
    "Gathakaalamantha",
    "Geetham Geetham Jaya Jaya Geetham",
    "Idhigo",
    "Immanuelu Rakthamu",
    "Jayam Jayam",
    "Jeevinchuchunnavada",
    "Jeevithanthamu",
    "Junte Thene Kanna",
    "Kaapari",
    "Keerthi Hallelujah",
    "Kuthoohalam Aarbhaatame",
    "Lekkinchaleni stotramul",
    "Maa Madhyalo Sancharinchuvaadaa",
    "Maargamulanu",
    "Mahima Ghanataku Arhudavu",
    "Mahima neeke prabhoo",
    "Mahimaa Neeke Mahimaa",
    "Mahimaku Paathrudaa",
    "Mahimaku Pathruda",
    "Manasaaraa poojinchi ninnaraadhistaa",
    "Manchivada",
    "Maargamu choopumu intiki",
    "Maranamu Nundi",
    "Naa Balamanthaa Neevenayya",
    "Naa Jeevam Naa Sarvam",
    "Naatho maatlaadumayyaa",
    "Naa Kastamulo",
    "Naa Neeti Suryudaa",
    "Naa Prathi Avasaramu vandanam",
    "Naa Thandri Neeve",
    "Nadipinchu Naa Naava",
    "Najareyudaa Naa Yesayya",
    "Nannu Pilichina Devaa",
    "Nee Chittamune cheseda",
    "Nee Karyamulu",
    "Nee Krupa Leni Kshanamu",
    "Nee Laga Nannevaru",
    "Nee Namamulone",
    "Nee rakthame",
    "Nee Sannidhilo Santhoshamu",
    "Neelanti dhaivam",
    "Neetho Unte Jeevitham",
    "Neetho unte Jeevitham",
    "Nethone Nundutaye",
    "Neeve naa praanamu",
    "Neeve Neeve",
    "Neevu Chesina Upakaaramulaku",
    "Neevu Naa Thodu Unnaavayyaa",
    "Neevunte Naaku Chalu Yesayya",
    "Nen Ematharamu",
    "Ninne ne nammukunnaanu",
    "Ninne ninne ne kolutunnayyaa",
    "Ninnu namminavaaru",
    "Ninu Polina Vaarevaru",
    "Ninu Stutinchina Chalu",
    "Oo Prardhana",
    "Oranna Oranna",
    "Parama Jeevamu Naaku Nivva",
    "Paralokame naa svaasthyamu",
    "Prabhu yesu na rakshaka",
    "Preetigala Mana Yesu",
    "Priyuda nee prema",
    "Raajaa nee sannidhilone",
    "Raajula Raajaa Prabhuvula Prabhuvaa",
    "Raja Nee Sannidhi",
    "Raja Nee Sannidhilo",
    "Rakshana Durgamu",
    "Saagipodunu",
    "Sadaakaalamu neetho nenu",
    "Sannidhi",
    "Shuddhudaa ghanudaa rakshakudaa",
    "Siluva Chaatunaa",
    "Solipovaladu",
    "Sthiraparachuvaadavu",
    "Sthothram Chellinthumu",
    "Sthothramu Sthuthi Chellinthumu",
    "Sthuthinchi Aaradhinthumu",
    "Sundaruda",
    "sundara naamam",
    "Thalli la Nannu",
    "Thallilaa Nannu",
    "Thana Rakthamtho Kadigi",
    "Thandri Deva",
    "Vaagdhaanamu",
    "Vagdhanamu",
    "Vandanam Yesayyaa",
    "Veta Gaani Urilo Nundi",
    "Yahweh Neeve Naa Daivam",
    "Yehova Naa Balama",
    "Yehova Naaku Velugaye",
    "Yehova needhu melulanu",
    "Yehovaa Nee Naamamu Entho Balamainadi",
    "Yehovah Yireh",
    "Yesayya",
    "Yesayya Naamamulo",
    "Yese Dhaivamu",
    "Yese Naa Parihari",
    "Yesu Swami Neeku",
    "Yesu naamam jayam jayam",
    "Yesu raajaa nee bhavanamulo",
    "Yudhamu Yehovade",
    "Yudhdhamu Yehovaade",
    "adonai suryodayam modalukoni",
    "bandhinaipoya",
    "ee jaaveitham",
    "nee pilupu",
    "sannidhi sanidhiye",
    "sermon",
    "ye baadha ledu ye kashtam",
    "yeshua",
    "yhwh",
    "⁠Sthuthulaku Pathrudu Yesayya"
];

// Icons for different types
const icons = {
    sermon: '📖',
    song: '🎵',
    prayer: '🙏',
    worship: '✨'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    loadPreferences();
    createBackdrop();
    createScrollToTop();
    await loadSongs();
    setupEventListeners();
    createAlphabetIndex();
    createToolbarControls();
    initializeKeyboardShortcuts();
    applyTheme();
    checkDeepLink();
});

// Load user preferences from localStorage
function loadPreferences() {
    try {
        favorites = new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));
        recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        currentTheme = localStorage.getItem('theme') || 'dark';
        fontSize = parseInt(localStorage.getItem('fontSize') || '100');
        showTransliteration = localStorage.getItem('showTransliteration') !== 'false';
    } catch (e) {
        console.error('Error loading preferences:', e);
    }
}

// Save preferences
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

function saveRecentlyViewed() {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed.slice(0, 10)));
}

function saveTheme() {
    localStorage.setItem('theme', currentTheme);
}

function saveFontSize() {
    localStorage.setItem('fontSize', fontSize.toString());
}

function saveTransliteration() {
    localStorage.setItem('showTransliteration', showTransliteration.toString());
}

// Apply theme
function applyTheme() {
    document.body.setAttribute('data-theme', currentTheme);
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    saveTheme();
    applyTheme();
}

// Create backdrop for expanded cards
function createBackdrop() {
    backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    backdrop.addEventListener('click', closeExpandedCard);
    document.body.appendChild(backdrop);
}

// Create scroll to top button
function createScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.style.display = 'none';
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });
}

// Load all songs
async function loadSongs() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const cardsContainer = document.getElementById('cardsContainer');

    try {
        allSongs = await Promise.all(
            songFiles.map(async (filename) => {
                try {
                    const content = await loadSongContent(filename);
                    const displayName = formatDisplayName(filename);
                    const type = determineType(filename, content);

                    return {
                        filename,
                        displayName,
                        content,
                        type,
                        icon: icons[type],
                        isFavorite: favorites.has(filename)
                    };
                } catch (error) {
                    console.error(`Error loading ${filename}:`, error);
                    return null;
                }
            })
        );

        // Filter out null values (failed loads)
        allSongs = allSongs.filter(song => song !== null);
        filteredSongs = [...allSongs];
        applySorting();

        loadingSpinner.style.display = 'none';
        renderCards();
        updateResultsCount();
    } catch (error) {
        console.error('Error loading songs:', error);
        loadingSpinner.innerHTML = '<p style="color: var(--ink-muted);">Error loading songs. Please refresh the page.</p>';
    }
}

// Load song content from file
async function loadSongContent(filename) {
    const filePath = `All-Songs/${filename}`;
    const response = await fetch(filePath);

    if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
    }

    return await response.text();
}

// Format filename for display
function formatDisplayName(filename) {
    return filename;
}

// Determine content type
function determineType(filename, content) {
    const lower = filename.toLowerCase();
    const contentLower = content.toLowerCase();

    if (lower.includes('sermon') || contentLower.includes('romans') || contentLower.includes('prayer:')) {
        return 'sermon';
    }
    if (lower.includes('prayer') || lower.includes('prardhana')) {
        return 'prayer';
    }
    if (lower.includes('aaradhana') || lower.includes('worship') || lower.includes('stuthi')) {
        return 'worship';
    }

    return 'song';
}

// Apply sorting
function applySorting() {
    switch(currentSort) {
        case 'a-z':
            filteredSongs.sort((a, b) => a.displayName.localeCompare(b.displayName));
            break;
        case 'z-a':
            filteredSongs.sort((a, b) => b.displayName.localeCompare(a.displayName));
            break;
        case 'recent':
            // Sort by recently viewed (if in recentlyViewed array)
            filteredSongs.sort((a, b) => {
                const aIndex = recentlyViewed.indexOf(a.filename);
                const bIndex = recentlyViewed.indexOf(b.filename);
                if (aIndex === -1 && bIndex === -1) return 0;
                if (aIndex === -1) return 1;
                if (bIndex === -1) return -1;
                return aIndex - bIndex;
            });
            break;
    }
}

// Render cards
function renderCards() {
    const cardsContainer = document.getElementById('cardsContainer');
    const noResults = document.getElementById('noResults');

    if (filteredSongs.length === 0) {
        cardsContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    cardsContainer.style.display = 'grid';
    noResults.style.display = 'none';

    cardsContainer.innerHTML = filteredSongs.map((song, index) => `
        <div class="card card--${song.type}" data-index="${index}" data-filename="${song.filename}" data-type="${song.type}">
            <div class="card-inner">
                <div class="card-front">
                    <button class="favorite-btn ${song.isFavorite ? 'active' : ''}"
                            onclick="toggleFavorite('${song.filename.replace(/'/g, "\\'")}', event)"
                            aria-label="${song.isFavorite ? 'Remove from favorites' : 'Add to favorites'}"
                            title="${song.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        ${song.isFavorite ? '★' : '☆'}
                    </button>
                    <span class="card-icon" aria-hidden="true">${song.icon}</span>
                    <h3 class="card-title">${song.displayName}</h3>
                </div>
                <div class="card-back">
                    <div class="card-back-header">
                        <h3 class="card-back-title">${song.displayName}</h3>
                        <div class="card-actions">
                            <button class="icon-btn share-btn" onclick="shareSong(${index})"
                                    aria-label="Share song" title="Share">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                            </button>
                            <button class="icon-btn print-btn" onclick="printSong(${index})"
                                    aria-label="Print lyrics" title="Print">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                    <rect x="6" y="14" width="12" height="8"></rect>
                                </svg>
                            </button>
                            <button class="copy-btn" onclick="copyToClipboard(${index})" aria-label="Copy lyrics">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                <span class="copy-text">Copy</span>
                            </button>
                            <button class="close-btn" onclick="flipCard(${index})" aria-label="Close">×</button>
                        </div>
                    </div>
                    <div class="lyrics-controls">
                        <button class="icon-btn transliteration-toggle ${showTransliteration ? 'active' : ''}"
                                onclick="toggleTransliteration()"
                                title="Toggle transliteration">
                            <span class="toggle-label">తె/En</span>
                        </button>
                        <div class="font-controls">
                            <button class="icon-btn" onclick="decreaseFontSize()" title="Decrease font size (Ctrl -)">A-</button>
                            <span class="font-size-display">${fontSize}%</span>
                            <button class="icon-btn" onclick="increaseFontSize()" title="Increase font size (Ctrl +)">A+</button>
                        </div>
                    </div>
                    <div class="card-content" style="font-size: ${fontSize}%">${formatContent(song.content)}</div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event to flip cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Don't flip if clicking buttons
            if (!e.target.closest('.close-btn, .favorite-btn, .copy-btn, .share-btn, .print-btn, .icon-btn')) {
                if (card.classList.contains('flipped')) {
                    closeExpandedCard();
                } else {
                    expandCard(card, filteredSongs[index].filename);
                }
            }
        });

        // Add swipe gesture for mobile
        addSwipeGesture(card);
    });
}

// Toggle favorite
function toggleFavorite(filename, event) {
    event.stopPropagation();

    if (favorites.has(filename)) {
        favorites.delete(filename);
    } else {
        favorites.add(filename);
    }

    saveFavorites();

    // Update the song object
    allSongs.forEach(song => {
        if (song.filename === filename) {
            song.isFavorite = favorites.has(filename);
        }
    });

    renderCards();
}

// Add to recently viewed
function addToRecentlyViewed(filename) {
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(f => f !== filename);
    // Add to beginning
    recentlyViewed.unshift(filename);
    // Keep only last 10
    recentlyViewed = recentlyViewed.slice(0, 10);
    saveRecentlyViewed();
}

// Expand card
function expandCard(card, filename) {
    // Close any other expanded card
    closeExpandedCard();

    // Add to recently viewed
    addToRecentlyViewed(filename);

    // Expand this card
    card.classList.add('flipped');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update URL with song parameter (for deep linking)
    const url = new URL(window.location);
    url.searchParams.set('song', encodeURIComponent(filename));
    window.history.pushState({}, '', url);
}

// Close expanded card
function closeExpandedCard() {
    const expandedCard = document.querySelector('.card.flipped');
    if (expandedCard) {
        expandedCard.classList.remove('flipped');
    }
    backdrop.classList.remove('active');
    document.body.style.overflow = '';

    // Clear URL parameter
    const url = new URL(window.location);
    url.searchParams.delete('song');
    window.history.pushState({}, '', url);
}

// Check for deep link on load
function checkDeepLink() {
    const url = new URL(window.location);
    const songParam = url.searchParams.get('song');

    if (songParam) {
        const filename = decodeURIComponent(songParam);
        const cardElement = document.querySelector(`[data-filename="${filename}"]`);
        if (cardElement) {
            setTimeout(() => {
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                expandCard(cardElement, filename);
            }, 500);
        }
    }
}

// Format content for display
function formatContent(content) {
    const escaped = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    if (!showTransliteration) {
        // Hide English transliteration lines
        return escaped.split('\n').filter(line => {
            // Keep Telugu lines and empty lines
            return /[\u0C00-\u0C7F]/.test(line) || line.trim() === '';
        }).join('\n');
    }

    return escaped;
}

// Toggle transliteration
function toggleTransliteration() {
    showTransliteration = !showTransliteration;
    saveTransliteration();
    renderCards();
}

// Font size controls
function increaseFontSize() {
    fontSize = Math.min(fontSize + 10, 200);
    saveFontSize();
    updateFontSize();
}

function decreaseFontSize() {
    fontSize = Math.max(fontSize - 10, 50);
    saveFontSize();
    updateFontSize();
}

function updateFontSize() {
    document.querySelectorAll('.card-content').forEach(el => {
        el.style.fontSize = fontSize + '%';
    });
    document.querySelectorAll('.font-size-display').forEach(el => {
        el.textContent = fontSize + '%';
    });
}

// Share song
function shareSong(index) {
    const song = filteredSongs[index];
    const url = new URL(window.location.href);
    url.searchParams.set('song', encodeURIComponent(song.filename));
    const shareUrl = url.toString();

    // Create share modal
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <h3>Share "${song.displayName}"</h3>
            <div class="share-options">
                <button onclick="copyShareLink('${shareUrl.replace(/'/g, "\\'")}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy Link
                </button>
                <button onclick="shareToWhatsApp('${shareUrl.replace(/'/g, "\\'")}', '${song.displayName.replace(/'/g, "\\'")}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                </button>
            </div>
            <button class="close-modal-btn" onclick="closeShareModal()">Close</button>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeShareModal();
    });

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function copyShareLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        showToast('Link copied to clipboard!');
    });
}

function shareToWhatsApp(url, title) {
    const text = `Check out this song: ${title}\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function closeShareModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Print song
function printSong(index) {
    const song = filteredSongs[index];
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${song.displayName}</title>
            <style>
                body {
                    font-family: 'Anek Telugu', Arial, sans-serif;
                    padding: 2cm;
                    line-height: 1.8;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 2rem;
                    font-size: 1.5rem;
                }
                pre {
                    white-space: pre-wrap;
                    font-family: inherit;
                    font-size: 1rem;
                }
                @media print {
                    @page {
                        margin: 2cm;
                    }
                }
            </style>
        </head>
        <body>
            <h1>${song.displayName}</h1>
            <pre>${song.content}</pre>
        </body>
        </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('active'), 10);
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Flip card function (for close button)
function flipCard(index) {
    closeExpandedCard();
}

// Create alphabet index
function createAlphabetIndex() {
    const alphabetIndex = document.getElementById('alphabetIndex');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Get first letters of all songs
    const availableLetters = new Set(
        allSongs.map(song => song.displayName.charAt(0).toUpperCase())
    );

    // Add "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'alphabet-btn active';
    allBtn.textContent = 'All';
    allBtn.setAttribute('data-letter', 'all');
    allBtn.addEventListener('click', () => filterByLetter('all'));
    alphabetIndex.appendChild(allBtn);

    // Add letter buttons
    alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'alphabet-btn';
        btn.textContent = letter;
        btn.setAttribute('data-letter', letter);

        if (!availableLetters.has(letter)) {
            btn.classList.add('disabled');
            btn.disabled = true;
        } else {
            btn.addEventListener('click', () => filterByLetter(letter));
        }

        alphabetIndex.appendChild(btn);
    });
}

// Create toolbar controls
function createToolbarControls() {
    const toolbar = document.querySelector('.toolbar');
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'toolbar-controls';
    controlsDiv.innerHTML = `
        <div class="control-group">
            <button class="control-btn" id="favoritesBtn" onclick="filterFavorites()" title="Show favorites">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Favorites <span id="favCount">(${favorites.size})</span>
            </button>

            <button class="control-btn" id="recentBtn" onclick="filterRecent()" title="Recently viewed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Recent
            </button>

            <select id="sortSelect" class="control-select" onchange="changeSorting(this.value)">
                <option value="a-z">A → Z</option>
                <option value="z-a">Z → A</option>
            </select>

            <button class="control-btn theme-toggle" onclick="toggleTheme()" title="Toggle theme">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>

            <button class="control-btn" onclick="showHelp()" title="Keyboard shortcuts (?)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            </button>
        </div>
    `;
    toolbar.appendChild(controlsDiv);
}

// Filter favorites
function filterFavorites() {
    if (favorites.size === 0) {
        showToast('No favorites yet! Click the star on any song to add it.');
        return;
    }

    selectedLetter = null;
    document.querySelectorAll('.alphabet-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('searchInput').value = '';

    filteredSongs = allSongs.filter(song => favorites.has(song.filename));
    renderCards();
    updateResultsCount();

    document.getElementById('favoritesBtn').classList.add('active');
}

// Filter recent
function filterRecent() {
    if (recentlyViewed.length === 0) {
        showToast('No recently viewed songs yet!');
        return;
    }

    selectedLetter = null;
    document.querySelectorAll('.alphabet-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('searchInput').value = '';

    filteredSongs = allSongs.filter(song => recentlyViewed.includes(song.filename));
    // Sort by recently viewed order
    filteredSongs.sort((a, b) => {
        return recentlyViewed.indexOf(a.filename) - recentlyViewed.indexOf(b.filename);
    });

    renderCards();
    updateResultsCount();

    document.getElementById('recentBtn').classList.add('active');
}

// Change sorting
function changeSorting(sort) {
    currentSort = sort;
    applySorting();
    renderCards();
}

// Filter by letter
function filterByLetter(letter) {
    selectedLetter = letter;

    // Update active button
    document.querySelectorAll('.alphabet-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-letter="${letter}"]`).classList.add('active');

    // Clear other filters
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));

    // Clear search input
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    document.getElementById('clearSearch').classList.remove('visible');

    // Filter songs
    if (letter === 'all') {
        filteredSongs = [...allSongs];
    } else {
        filteredSongs = allSongs.filter(song =>
            song.displayName.charAt(0).toUpperCase() === letter
        );
    }

    applySorting();
    renderCards();
    updateResultsCount();
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');

    // Search input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query) {
            clearBtn.classList.add('visible');
        } else {
            clearBtn.classList.remove('visible');
        }

        filterSongs(query);
    });

    // Clear button
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        filterSongs('');
        searchInput.focus();
    });

    // Enter key: expand first card
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && filteredSongs.length > 0) {
            const firstCard = document.querySelector('.card');
            if (firstCard) {
                const filename = firstCard.getAttribute('data-filename');
                expandCard(firstCard, filename);
                firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Filter songs based on search query (with fuzzy matching)
function filterSongs(query) {
    // Reset letter filter when searching
    if (query) {
        selectedLetter = null;
        document.querySelectorAll('.alphabet-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    }

    if (!query) {
        if (selectedLetter && selectedLetter !== 'all') {
            filteredSongs = allSongs.filter(song =>
                song.displayName.charAt(0).toUpperCase() === selectedLetter
            );
        } else {
            filteredSongs = [...allSongs];
        }
    } else {
        // Fuzzy search
        filteredSongs = allSongs.filter(song => {
            const name = song.displayName.toLowerCase();
            const content = song.content.toLowerCase();
            const type = song.type.toLowerCase();

            // Exact match gets priority
            if (name.includes(query) || content.includes(query) || type.includes(query)) {
                return true;
            }

            // Fuzzy match - check if all query characters appear in order
            let queryIndex = 0;
            for (let char of name) {
                if (char === query[queryIndex]) {
                    queryIndex++;
                    if (queryIndex === query.length) return true;
                }
            }
            return false;
        });
    }

    applySorting();
    renderCards();
    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    const count = filteredSongs.length;
    const total = allSongs.length;

    // Update favorites count
    const favCount = document.getElementById('favCount');
    if (favCount) {
        favCount.textContent = `(${favorites.size})`;
    }

    if (count === total) {
        resultsCount.textContent = `${total} songs available`;
    } else {
        resultsCount.textContent = `${count} of ${total} songs`;
    }
}

// Copy to clipboard function
async function copyToClipboard(index) {
    const song = filteredSongs[index];
    const copyBtn = document.querySelector(`[data-index="${index}"] .copy-btn`);
    const copyText = copyBtn.querySelector('.copy-text');

    try {
        await navigator.clipboard.writeText(song.content);

        copyBtn.classList.add('copied');
        copyText.textContent = 'Copied!';

        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        fallbackCopy(song.content, copyBtn, copyText);
    }
}

// Fallback copy method
function fallbackCopy(text, copyBtn, copyText) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        copyBtn.classList.add('copied');
        copyText.textContent = 'Copied!';

        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Fallback copy failed:', err);
        copyText.textContent = 'Failed';
        setTimeout(() => {
            copyText.textContent = 'Copy';
        }, 2000);
    }

    document.body.removeChild(textArea);
}

// Initialize keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape to close
        if (e.key === 'Escape') {
            closeExpandedCard();
            closeShareModal();
            const helpModal = document.querySelector('.help-modal');
            if (helpModal) helpModal.remove();
        }

        // / for search focus
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }

        // ? for help
        if (e.key === '?') {
            e.preventDefault();
            showHelp();
        }

        // Ctrl/Cmd + / - for font size (when card is open)
        const expandedCard = document.querySelector('.card.flipped');
        if (expandedCard) {
            if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                increaseFontSize();
            }
            if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
                e.preventDefault();
                decreaseFontSize();
            }

            // F to toggle favorite
            if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
                const filename = expandedCard.getAttribute('data-filename');
                toggleFavorite(filename, e);
            }
        }
    });
}

// Show help modal
function showHelp() {
    const modal = document.createElement('div');
    modal.className = 'help-modal';
    modal.innerHTML = `
        <div class="help-modal-content">
            <h2>Keyboard Shortcuts</h2>
            <div class="shortcuts-grid">
                <div class="shortcut-item">
                    <kbd>/</kbd>
                    <span>Focus search</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Esc</kbd>
                    <span>Close card/modal</span>
                </div>
                <div class="shortcut-item">
                    <kbd>F</kbd>
                    <span>Toggle favorite (when card open)</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Ctrl</kbd> + <kbd>+</kbd>
                    <span>Increase font size</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Ctrl</kbd> + <kbd>-</kbd>
                    <span>Decrease font size</span>
                </div>
                <div class="shortcut-item">
                    <kbd>?</kbd>
                    <span>Show this help</span>
                </div>
            </div>
            <button class="close-modal-btn" onclick="this.closest('.help-modal').remove()">Close</button>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Add swipe gesture support for mobile
function addSwipeGesture(card) {
    let startY = 0;
    let startX = 0;
    let isDragging = false;

    card.addEventListener('touchstart', (e) => {
        if (card.classList.contains('flipped')) {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
            isDragging = true;
        }
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
        if (!isDragging || !card.classList.contains('flipped')) return;

        const deltaY = e.touches[0].clientY - startY;
        const deltaX = e.touches[0].clientX - startX;

        // Swipe down to close (more than 100px down and not too much horizontal)
        if (deltaY > 100 && Math.abs(deltaX) < 50) {
            closeExpandedCard();
            isDragging = false;
        }
    }, { passive: true });

    card.addEventListener('touchend', () => {
        isDragging = false;
    }, { passive: true });
}

// Make functions available globally
window.flipCard = flipCard;
window.closeExpandedCard = closeExpandedCard;
window.copyToClipboard = copyToClipboard;
window.toggleFavorite = toggleFavorite;
window.shareSong = shareSong;
window.copyShareLink = copyShareLink;
window.shareToWhatsApp = shareToWhatsApp;
window.closeShareModal = closeShareModal;
window.printSong = printSong;
window.toggleTransliteration = toggleTransliteration;
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;
window.filterFavorites = filterFavorites;
window.filterRecent = filterRecent;
window.changeSorting = changeSorting;
window.toggleTheme = toggleTheme;
window.showHelp = showHelp;
