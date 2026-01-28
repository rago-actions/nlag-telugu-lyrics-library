# 🎵 NLAG Telugu Lyrics Library

A beautiful, searchable static website for Telugu Christian songs and sermons with flippable card interface.

## Features

✨ **Modern UI Design**
- Beautiful gradient themes and smooth animations
- Responsive design (works on mobile, tablet, and desktop)
- Telugu font support with Noto Sans Telugu

🔍 **Powerful Search**
- Real-time search through song titles and content
- Search works in both English and Telugu text
- Clear search with one click

🎴 **Flippable Cards**
- Click any card to flip and view full lyrics
- Smooth 3D flip animations
- Scrollable content on the back of cards
- Click the × button to flip back

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

### Option 3: Deploy to Web (Free Hosting)

#### Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select branch: `main`, folder: `/root`
4. Click Save
5. Your site will be live at: `https://yourusername.github.io/nlag-telugu-lyrics-library/`

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

1. **Search**: Type in the search box to filter songs
2. **View Lyrics**: Click any card to flip it and see the full lyrics
3. **Close**: Click the × button or click the card again to flip back
4. **Navigate**: Use your browser's back button to return

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

This project is created for NLAG Telugu Lyrics Library.

## Credits

Made with ❤️ for the NLAG community

---

**Need help?** Open an issue or contact the maintainer.
