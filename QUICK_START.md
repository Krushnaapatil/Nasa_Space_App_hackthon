# Quick Start Guide

## 🚀 Get Running in 30 Seconds

```bash
npm install && npm run dev
```

Open `http://localhost:5173` in your browser.

## 🎯 Try These First

### 1. Single Prediction (Pre-filled values ready to go!)
- Click **"Classify Exoplanet"** button
- See instant results with visualizations

### 2. Batch Upload
- Switch to **"Batch Upload"** tab
- Click **"Download Sample CSV"**
- Upload the downloaded CSV
- Watch the magic happen!

### 3. Model Stats
- Switch to **"Model Stats"** tab
- View comprehensive performance metrics

## 📝 Example Test Values

### Confirmed Exoplanet
```
Orbital Period: 15.234
Transit Duration: 2.45
Planetary Radius: 1.12
Stellar Temp: 5778
SNR: 18.5
Depth: 0.0034
```

### Candidate
```
Orbital Period: 45.678
Transit Duration: 3.12
Planetary Radius: 1.78
Stellar Temp: 6100
SNR: 9.8
Depth: 0.0015
```

### False Positive
```
Orbital Period: 1.234
Transit Duration: 0.78
Planetary Radius: 0.65
Stellar Temp: 4500
SNR: 6.2
Depth: 0.0006
```

## 🛠️ Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview build
npm run typecheck  # Check types
```

## 📄 Files to Check

- `README.md` - Full documentation
- `DEMO_GUIDE.md` - Presentation script
- `sample_exoplanet_data.csv` - Test data

## 🎤 30-Second Pitch

*"A World Away uses AI to classify exoplanets with 92% accuracy. Upload your data, get instant predictions with confidence scores and beautiful visualizations. Built for astronomers, researchers, and space enthusiasts."*

## 💡 Pro Tips

1. **Default values**: Form comes pre-filled for instant testing
2. **Sample CSV**: Use "Download Sample CSV" for correct format
3. **Export results**: Click export button in batch results
4. **Mobile friendly**: Works great on phones/tablets
5. **No setup**: Everything works client-side, no backend needed

## 🎨 What Makes It Special

- ✨ Beautiful, modern UI
- ⚡ Instant predictions (< 50ms)
- 📊 Rich visualizations (charts, graphs)
- 📁 Batch processing via CSV
- 🔍 Explainable AI (feature importance)
- 📱 Fully responsive design
- 🎯 92% accuracy ML model

## 🚢 Deploy to Production

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Manual
```bash
npm run build
# Upload dist/ folder to any static host
```

## ❓ Quick Troubleshooting

**Port already in use?**
- Close other dev servers
- Or Vite will auto-assign a new port

**Charts not showing?**
- Refresh the page
- Check browser console for errors

**CSV upload fails?**
- Ensure CSV has required columns
- Check sample CSV for correct format

## 🎯 Perfect For

- Hackathon demos
- Research presentations
- Educational tools
- Portfolio projects
- Production astronomy tools

---

**That's it! You're ready to classify exoplanets! 🌟**
