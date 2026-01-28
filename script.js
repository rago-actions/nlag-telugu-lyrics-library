// Global state
let allSongs = [];
let filteredSongs = [];

// Song data - mapping filenames to display names and content
const songFiles = [
    "Aaradhana Neeke",
    "Aaradhana Yesu Neeke",
    "Aaradhanaku Yogyuda",
    "Aaradhinchedamu Yesayya Namamunu",
    "Aaradhinchedamu Yesayya Namamunu - v2",
    "Aaradinchedanu_Ninnu_Na_Yesayya",
    "Aayaney",
    "adonai- suryodayam-modalukoni",
    "ADONAI-SUROYADAYAMU",
    "Anni Naamamula Kanna Pai Naamamu",
    "Anthyakaala abhishekam",
    "Aradhana Stuthi Aaradhana.txt",
    "Aradhana_Sthuthi_Aaradhana.txt",
    "Asaadhyamainadi Lene Ledu",
    "Ashirwadam",
    "Athyunnata_Simhasanamu_Pai.txt",
    "Bandheenaipoya.txt",
    "bandhinaipoya.txt",
    "Bangaram_Adagaledu.txt",
    "Bhaasillenu Siluvalo",
    "Bhayamu ledu (YAHWEH ).txt",
    "Bhayapadanu",
    "Deevinchaave_Samruddhiga.txt",
    "Deva Naa Thodai Raava.txt",
    "Devuni_Stutinchudi.txt",
    "Dhanyawadamutho_Sthuthi_Padedhanu.txt",
    "Ebinejare_Ebinejare.txt",
    "ee_jaaveitham.txt",
    "Emmanuelu_Deva .txt",
    "Enduko_Nanninthaga.txt",
    "Gathakaalamantha",
    "Geetham_Geetham_Jaya_Jaya_Geetham",
    "Idhigo.txt",
    "Immanuelu_Rakthamu.txt",
    "Jayam Jayam.txt",
    "Jeevinchuchunnavada.txt",
    "Jeevithanthamu.txt",
    "Kaapari",
    "Kaapari.txt",
    "Keerthi_Hallelujah.txt",
    "Lekkinchaleni_stotramul.txt",
    "Maargamulanu.txt",
    "Mahima Ghanataku Arhudavu",
    "Mahima neeke prabhoo",
    "Mahimaa_Neeke_Mahimaa.txt",
    "Mahimaku Paathrudaa.txt",
    "Mahimaku_Pathruda.txt",
    "Manchivada.txt",
    "Maranamu Nundi.txt",
    "naa balamanthaa neevenayya.txt",
    "Naa Jeevam Naa Sarvam",
    "Naa Neeti Suryudaa.txt",
    "Naa_Prathi_Avasaramu_vandanam.txt",
    "Naa_Thandri_Neeve.txt",
    "Nadipinchu Naa Naava",
    "Nadipinchu Naa Naava.txt",
    "Najareyudaa_Naa_Yesayya.txt",
    "Nee _Chittamune_cheseda .txt",
    "Nee_Krupa_Leni_Kshanamu.txt",
    "Nee_Laga_Nannevaru.txt",
    "Nee_Namamulone.txt",
    "nee_pilupu.txt",
    "Neelanti dhaivam",
    "Neetho_unte_Jeevitham.txt",
    "Neeve_Neeve.txt",
    "Neevu Chesina Upakaaramulaku",
    "Neevu Naa Thodu Unnaavayyaa",
    "Neevunte_Naaku_Chalu_Yesayya.txt",
    "Nen_Ematharamu.txt",
    "Ninne ne nammukunnaanu",
    "Ninne ninne ne kolutunnayyaa.txt",
    "Ninu Polina Vaarevaru",
    "Oo_Prardhana.txt",
    "Oranna Oranna",
    "Parama_Jeevamu_Naaku_Nivva.txt",
    "Prabhu_yesu_na_rakshaka.txt",
    "Priyuda_nee_prema.txt",
    "Raajula_Raajaa_Prabhuvula_Prabhuvaa.txt",
    "Raja Nee Sannidhi",
    "Raja_Nee_Sannidhilo.txt",
    "Rakshana Durgamu",
    "Rakshana Durgamu.txt",
    "Saagipodunu.txt",
    "Sadaakaalamu neetho nenu",
    "Sannidhi",
    "sannidhi sanidhiye.txt",
    "sermon.txt",
    "Sthiraparachuvaadavu.txt",
    "Sthothram_Chellinthumu.txt",
    "Sthothramu_Sthuthi_Chellinthumu.txt",
    "⁠Sthuthulaku_Pathrudu_Yesayya.txt",
    "Sundaruda",
    "Thalli la Nannu",
    "Thallilaa_Nannu.txt",
    "Thana_Rakthamtho_Kadigi.txt",
    "Thandri_Deva.txt",
    "Vaagdhaanamu",
    "Vandanam Yesayya.txt",
    "Veta_Gaani_Urilo_Nundi.txt",
    "Yahweh_Neeve_Naa_Daivam.txt",
    "ye_baadha_ledu_ye_kashtam.txt",
    "Yehova needhu melulanu",
    "Yehovah_Yireh.txt",
    "Yesayya",
    "Yesayya_Naamamulo.txt",
    "Yese_Dhaivamu.txt",
    "Yese_Naa_Parihari.txt",
    "yeshua",
    "Yesu raajaa nee bhavanamulo",
    "Yesu_naamam_jayam_jayam.txt",
    "Yesu_Swami_Neeku.txt",
    "yhwh",
    "Yudhamu Yehovade"
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
    await loadSongs();
    setupEventListeners();
});

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

// Format filename for display
function formatDisplayName(filename) {
    // Remove .txt extension
    let name = filename.replace(/\.txt$/, '');

    // Replace underscores and hyphens with spaces
    name = name.replace(/[_-]/g, ' ');

    // Trim extra spaces
    name = name.trim();

    return name;
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
        <div class="card" data-index="${index}">
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-icon">${song.icon}</div>
                    <h3 class="card-title">${song.displayName}</h3>
                </div>
                <div class="card-back">
                    <div class="card-back-header">
                        <h3 class="card-back-title">${song.displayName}</h3>
                        <button class="close-btn" onclick="flipCard(${index})" aria-label="Close">×</button>
                    </div>
                    <div class="card-content">${formatContent(song.content)}</div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event to flip cards
    document.querySelectorAll('.card').forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        cardInner.addEventListener('click', (e) => {
            // Don't flip if clicking the close button
            if (!e.target.closest('.close-btn')) {
                card.classList.toggle('flipped');
            }
        });
    });
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
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card) {
        card.classList.remove('flipped');
    }
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

    // Enter key to focus first card
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && filteredSongs.length > 0) {
            const firstCard = document.querySelector('.card');
            if (firstCard) {
                firstCard.classList.add('flipped');
                firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Filter songs based on search query
function filterSongs(query) {
    if (!query) {
        filteredSongs = [...allSongs];
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

// Make flipCard available globally
window.flipCard = flipCard;
