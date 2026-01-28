# 🎵 Joey Telugu Lyrics Library

A beautiful, searchable static website for Telugu Christian songs and sermons with flippable card interface.

🌐 **Live Site**: [https://rago-actions.github.io/nlag-telugu-lyrics-library/](https://rago-actions.github.io/nlag-telugu-lyrics-library/)

## Features

✨ **Modern UI Design**
- Beautiful gradient themes and smooth animations
- Responsive design (works on mobile, tablet, and desktop)
- Telugu font support with Noto Sans Telugu

🔍 **Powerful Search**
- Real-time search through song titles and content
- Search works in both English and Telugu text
- Clear search with one click

🔤 **Alphabetical Index**
- A-Z letter navigation to filter songs
- Click any letter to see songs starting with that letter
- Disabled letters are grayed out (no songs available)
- "All" button to show all songs

🎴 **Flippable Cards**
- Click any card to flip and view full lyrics
- Cards expand to full screen with dark backdrop
- Smooth 3D flip animations and scaling
- Scrollable content for long lyrics
- Click outside, press Escape, or click × to close
- 4 cards per row layout (responsive on smaller screens)

📱 **Fully Responsive**
- Works perfectly on all screen sizes
- Touch-friendly interface for mobile devices

## Getting Started

### Option 1: Open Locally

Simply open `index.html` in your web browser:

```bash
# On Mac
open index.html

# Or double-click the index.html file in Finder
```

### Option 2: Using a Local Server (Recommended)

For better performance, use a local server:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then open: http://localhost:8080
```

**Using PHP:**
```bash
php -S localhost:8000

# Then open: http://localhost:8000
```

### Option 3: View Live Website

🌐 **Live Website**: [https://rago-actions.github.io/nlag-telugu-lyrics-library/](https://rago-actions.github.io/nlag-telugu-lyrics-library/)

#### Deploy to GitHub Pages (Already Deployed)

This site is already live at: **https://rago-actions.github.io/nlag-telugu-lyrics-library/**

To update the live site:
1. Push changes to the `main` branch
2. GitHub Pages will automatically rebuild
3. Changes will be live in 1-2 minutes

#### Deploy to Netlify

1. Push to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Deploy!

#### Deploy to Vercel

1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

## File Structure

```
nlag-telugu-lyrics-library/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Search and flip functionality
├── All-Songs/          # Folder containing all song files
│   ├── sermon.txt
│   ├── Aaradhana Neeke
│   └── ...
└── README.md          # This file
```

## Usage

1. **Browse by Letter**: Click any A-Z letter to filter songs starting with that letter
2. **Search**: Type in the search box to filter songs by title or content
3. **View Lyrics**: Click any card to expand it to full screen with complete lyrics
4. **Close**: Click outside the card, press Escape key, or click the × button
5. **Reset**: Click "All" to show all songs again

## Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main color */
    --secondary-color: #8b5cf6;    /* Accent color */
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add New Songs

1. Add the song file to `All-Songs/` folder
2. Add the filename to the `songFiles` array in `script.js`:

```javascript
const songFiles = [
    // ... existing files ...
    "Your_New_Song.txt",  // Add here
];
```

### Change Icons

Edit the `icons` object in `script.js`:

```javascript
const icons = {
    sermon: '📖',
    song: '🎵',
    prayer: '🙏',
    worship: '✨'
};
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created for Joey Telugu Lyrics Library.

## Credits

Made with ❤️ for the Joey community

---

**Need help?** Open an issue or contact the maintainer.
