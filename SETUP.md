# BlogPrompt+ — GitHub Pages Setup

## Quick Deploy (5 steps)

### 1. Create GitHub Account (if you don't have one)
Go to https://github.com and sign up. Free.

### 2. Create a New Repository
- Click the **+** button → **New repository**
- Name it exactly: `blogprompt`  
- Set to **Public**
- Tick "Add a README file"
- Click **Create repository**

### 3. Upload the Files
In your new repository:
- Click **Add file** → **Upload files**
- Upload ALL files from this folder:
  - `index.html`
  - `sw.js`
  - `manifest.json`
  - The `icons/` folder (upload both icon files)
- Commit message: "Initial deploy"
- Click **Commit changes**

### 4. Enable GitHub Pages
- Go to **Settings** (tab at top of repo)
- Scroll down to **Pages** (left sidebar)
- Under **Source** → select **Deploy from a branch**
- Branch: **main** / folder: **/ (root)**
- Click **Save**

### 5. Done!
After 1-2 minutes your app will be live at:
`https://YOUR-USERNAME.github.io/blogprompt`

Open that URL in Chrome on your Android phone.
Chrome will show a banner: **"Add to Home Screen"**
Tap it → the app installs like a native app.

---

## Adding to Home Screen (Android Chrome)
1. Open the URL in Chrome
2. Tap the **three dots** (⋮) menu
3. Tap **Add to Home screen**
4. Tap **Add**

The app will appear on your home screen with the TEH icon.

---

## Offline Use
Once installed, the app works fully offline.
- All entries saved to your phone (IndexedDB)  
- Blog draft generation needs internet (Claude API)  
- Everything else (logging, mindmap, queries) works offline

## Backup
Use **Settings → Export Backup** to download a JSON file.
Save it to Google Drive manually for safekeeping.
Import it back any time with **Settings → Import Backup**.

---

## Updating the App
To update after changes:
1. Go to your GitHub repo
2. Click the file to update → pencil icon to edit
3. Paste new content → Commit changes
4. Pages auto-deploys in ~1 minute
