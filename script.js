// Global state
let allSongs = [];
let filteredSongs = [];
let selectedLetter = null;
let backdrop = null;

// Song data - mapping filenames to display names and content (matches All-Songs directory)
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
    "Junte Thene Kannaa Theeyanidi",
    "Kaapari",
    "Keerthi Hallelujah",
    "Kuthoohalam Aarbhaatame",
    "Lekkinchaleni stotramul",
    "Maargamulanu",
    "Mahima Ghanataku Arhudavu",
    "Mahima neeke prabhoo",
    "Mahimaa Neeke Mahimaa",
    "Mahimaku Paathrudaa",
    "Mahimaku Pathruda",
    "Manasaaraa poojinchi ninnaraadhistaa",
    "Manchivada",
    "Maranamu Nundi",
    "Naa Balamanthaa Neevenayya",
    "Naa Jeevam Naa Sarvam",
    "Naa Neeti Suryudaa",
    "Naa Prathi Avasaramu vandanam",
    "Naa Thandri Neeve",
    "Nadipinchu Naa Naava",
    "Najareyudaa Naa Yesayya",
    "Nee Chittamune cheseda",
    "Nee Karyamulu",
    "Nee Krupa Leni Kshanamu",
    "Nee Laga Nannevaru",
    "Nee Namamulone",
    "Neelanti dhaivam",
    "Neetho unte Jeevitham",
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
    "Prabhu yesu na rakshaka",
    "Priyuda nee prema",
    "Raajula Raajaa Prabhuvula Prabhuvaa",
    "Raja Nee Sannidhi",
    "Raja Nee Sannidhilo",
    "Rakshana Durgamu",
    "Saagipodunu",
    "Sadaakaalamu neetho nenu",
    "Sannidhi",
    "Solipovaladu",
    "Sthiraparachuvaadavu",
    "Sthothram Chellinthumu",
    "Sthothramu Sthuthi Chellinthumu",
    "Sundaruda",
    "Thalli la Nannu",
    "Thallilaa Nannu",
    "Thana Rakthamtho Kadigi",
    "Thandri Deva",
    "Vaagdhaanamu",
    "Vandanam Yesayya",
    "Veta Gaani Urilo Nundi",
    "Yahweh Neeve Naa Daivam",
    "Yehova Naa Balama",
    "Yehova Naaku Velugaye",
    "Yehova needhu melulanu",
    "Yehovah Yireh",
    "Yesayya",
    "Yesayya Naamamulo",
    "Yese Dhaivamu",
    "Yese Naa Parihari",
    "Yesu Swami Neeku",
    "Yesu naamam jayam jayam",
    "Yesu raajaa nee bhavanamulo",
    "Yudhamu Yehovade",
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
    createBackdrop();
    await loadSongs();
    setupEventListeners();
    createAlphabetIndex();
});

// Create backdrop for expanded cards
function createBackdrop() {
    backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    backdrop.addEventListener('click', closeExpandedCard);
    document.body.appendChild(backdrop);
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
                        icon: icons[type]
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

        loadingSpinner.style.display = 'none';
        renderCards();
        updateResultsCount();
    } catch (error) {
        console.error('Error loading songs:', error);
        loadingSpinner.innerHTML = '<p style="color: var(--text-secondary);">Error loading songs. Please refresh the page.</p>';
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

// Format filename for display - filenames are already clean
function formatDisplayName(filename) {
    // Filenames are already cleaned (no underscores, hyphens, or .txt)
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
        <div class="card card--${song.type}" data-index="${index}" data-type="${song.type}">
            <div class="card-inner">
                <div class="card-front">
                    <span class="card-icon" aria-hidden="true">${song.icon}</span>
                    <h3 class="card-title">${song.displayName}</h3>
                </div>
                <div class="card-back">
                    <div class="card-back-header">
                        <h3 class="card-back-title">${song.displayName}</h3>
                        <div class="card-actions">
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
                    <div class="card-content">${formatContent(song.content)}</div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event to flip cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Don't flip if clicking the close button
            if (!e.target.closest('.close-btn')) {
                if (card.classList.contains('flipped')) {
                    closeExpandedCard();
                } else {
                    expandCard(card);
                }
            }
        });
    });
}

// Expand card
function expandCard(card) {
    // Close any other expanded card
    closeExpandedCard();

    // Expand this card
    card.classList.add('flipped');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close expanded card
function closeExpandedCard() {
    const expandedCard = document.querySelector('.card.flipped');
    if (expandedCard) {
        expandedCard.classList.remove('flipped');
    }
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
}

// Format content for display
function formatContent(content) {
    // Escape HTML
    const escaped = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    return escaped;
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

        // Disable if no songs start with this letter
        if (!availableLetters.has(letter)) {
            btn.classList.add('disabled');
            btn.disabled = true;
        } else {
            btn.addEventListener('click', () => filterByLetter(letter));
        }

        alphabetIndex.appendChild(btn);
    });
}

// Filter by letter
function filterByLetter(letter) {
    selectedLetter = letter;

    // Update active button
    document.querySelectorAll('.alphabet-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-letter="${letter}"]`).classList.add('active');

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

        // Show/hide clear button
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
                expandCard(firstCard);
                firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Filter songs based on search query
function filterSongs(query) {
    // Reset letter filter when searching
    if (query) {
        selectedLetter = null;
        document.querySelectorAll('.alphabet-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    if (!query) {
        // If no query, apply letter filter if one is selected
        if (selectedLetter && selectedLetter !== 'all') {
            filteredSongs = allSongs.filter(song =>
                song.displayName.charAt(0).toUpperCase() === selectedLetter
            );
        } else {
            filteredSongs = [...allSongs];
        }
    } else {
        filteredSongs = allSongs.filter(song => {
            return song.displayName.toLowerCase().includes(query) ||
                song.content.toLowerCase().includes(query) ||
                song.type.toLowerCase().includes(query);
        });
    }

    renderCards();
    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    const count = filteredSongs.length;
    const total = allSongs.length;

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

        // Show success feedback
        copyBtn.classList.add('copied');
        copyText.textContent = 'Copied!';

        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);

        // Fallback for older browsers
        fallbackCopy(song.content, copyBtn, copyText);
    }
}

// Fallback copy method for older browsers
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

// Make functions available globally
window.flipCard = flipCard;
window.closeExpandedCard = closeExpandedCard;
window.copyToClipboard = copyToClipboard;

// Close card with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeExpandedCard();
    }
});
