# Kartik's Family Restaurant & Bar — Digital Menu Card

A luxury, mobile-first digital restaurant menu website built with React and Vite for **Kartik's Family Restaurant & Bar**, Roadpali, Kalamboli.

Designed strictly as an in-restaurant digital QR menu card for table scanning, mobile browsing, and fast search.

---

## 📑 Table of Contents

1. [How to Install Node.js](#1-how-to-install-nodejs)
2. [How to Install Dependencies](#2-how-to-install-dependencies)
3. [Running Locally (`npm run dev`)](#3-running-locally-npm-run-dev)
4. [Building for Production (`npm run build`)](#4-building-for-production-npm-run-build)
5. [How to Deploy to Vercel](#5-how-to-deploy-to-vercel)
6. [How to Update `MENU_URL`](#6-how-to-update-menu_url)
7. [How to Change Phone / WhatsApp / Address](#7-how-to-change-phone--whatsapp--address)
8. [How AC and NON-AC Data are Separated](#8-how-ac-and-non-ac-data-are-separated)
9. [Google Business Profile Information](#9-google-business-profile-information)

---

## 1. How to Install Node.js

Node.js (version 18 or newer) is required to run and build this application.

### On Windows:
1. Visit the official website: [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** installer (e.g., v20.x or v22.x).
3. Run the downloaded `.msi` file and follow the installer prompts (accept default settings).
4. Verify installation by opening **Command Prompt** (`cmd`) and typing:
   ```cmd
   node -v
   npm -v
   ```

### On macOS / Linux:
Download from [nodejs.org](https://nodejs.org/) or install via Homebrew / package manager:
```bash
brew install node
```

---

## 2. How to Install Dependencies

Open your terminal or Command Prompt, navigate to the project directory, and run:

```bash
npm install
```

This installs React, Vite, Lucide icons, QRCode generator, and Tailwind CSS.

---

## 3. Running Locally (`npm run dev`)

Start the Vite development server:

```bash
npm run dev
```

- The terminal will display the local URL, typically `http://localhost:3000`.
- Open your browser and navigate to `http://localhost:3000`.
- Press `F12` and click the **Device Toggle (Mobile view)** icon to preview the menu on various smartphone screens.

---

## 4. Building for Production (`npm run build`)

To compile and optimize the app for production:

```bash
npm run build
```

This outputs a high-performance, minified SPA build in the `dist` directory.

---

## 5. How to Deploy to Vercel

The project includes a ready-to-use `vercel.json` file configured for Single Page Application (SPA) routing:

### Option A: Via GitHub (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 6. How to Update `MENU_URL`

The QR code generator in the footer section is driven by `MENU_URL` in `src/config.js`:

```javascript
// src/config.js

// Leave empty ("") to dynamically use the active page URL:
export const MENU_URL = "";

// OR set your custom live domain once deployed:
// export const MENU_URL = "https://kartiks-digital-menu.vercel.app";
```

- When `MENU_URL` is empty `""`, the QR code automatically generates from `window.location.href`. This means that as soon as the site is deployed to Vercel, the QR code on every table automatically directs customers to your live Vercel URL.

---

## 7. How to Change Phone / WhatsApp / Address

All business details are centralized in `src/config.js`. You do not need to modify component code.

```javascript
// src/config.js

export const PHONE = "8424888844";
export const CALL_HREF = "tel:8424888844";

export const WHATSAPP = "918424888844";
export const WHATSAPP_URL = "https://wa.me/918424888844";

// PDF printed address:
export const ADDRESS = "A/2, Plot No.905, Sec-16, Near D-Mart, Roadpali, Kalamboli - 410218";

// Google Business location information:
export const GBP_ADDRESS = "Shop No. 905, A/2, Room No. 01, Indrayani Garden, Sector 16, Roadpali, Kalamboli, Maharashtra 410218";

// Google Maps directions URL:
export const MAPS_URL =
"https://maps.app.goo.gl/5CMMDNnTF6mWkL8o8"+
  encodeURIComponent(
    "Shop No. 905, A/2, Room No. 01, Indrayani Garden, Sector 16, Roadpali, Kalamboli, Maharashtra 410218");
    
---

## 8. How AC and NON-AC Data are Separated

To ensure strict zero-tolerance against price mixing:

1. **`src/data/nonAcMenu.js`**: Contains only the menu sections, items, and prices from the official **NON-AC MENU PDF**.
2. **`src/data/acMenu.js`**: Contains only the menu sections, items, and prices from the official **AC MENU PDF**.
3. **Menu Switcher**: The customer toggle switches between the two datasets cleanly in state:
   - When **NON-AC MENU** is selected, only `nonAcMenu` is loaded into memory, searched, and rendered.
   - When **AC MENU** is selected, only `acMenu` is loaded into memory, searched, and rendered.
4. **Verbatim Preservation**:
   - Exact spellings from the PDF are preserved: *Mushrorm Tikka*, *Mutton Biryai*, *Chicken Lollypop Shezwan (H/F)*, *Chicken Lolliypop Tandoori (H/F)*, *Chi Chicken Triple Shezwan Fried Rice*, *Chicken Rice / Noodles (Veg)*.
   - Price notations (`H/F`, `APS`, and volume breakdown `180ML | 90ML | 60ML | 30ML` and `650ML | 500ML | 330ML`) remain identical to the PDFs.

---

## 9. Google Business Profile Information

Use the official business information below:

- **Business Name**: Kartik's Family Restaurant & Bar
- **Primary Category**: Family Restaurant
- **Location**: Shop No. 905, A/2, Room No. 01, Indrayani Garden, Sector 16, Roadpali, Kalamboli, Maharashtra 410218
- **PDF Printed Address**: A/2, Plot No.905, Sec-16, Near D-Mart, Roadpali, Kalamboli - 410218
- **Phone**: 8424888844
- **WhatsApp**: +91 8424888844 (https://wa.me/918424888844)
- **Website / Menu Link**: [YOUR DEPLOYED VERCEL URL]
