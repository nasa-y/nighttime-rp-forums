# NightTime RP Forums — Setup Guide

## Your Server Details
- **IP:** 81.111.74.157
- **Port:** 40120
- **Connect:** `connect 81.111.74.157:40120`

---

## Step 1: Install the FiveM Resource

1. Copy the `fivem-resource` folder to your FiveM server's `resources` folder
2. Rename it to `nighttime-integration`
3. Open `server.lua` and change `WEBSITE_URL` to your website's URL
4. Add this line to your `server.cfg`:
   ```
   ensure nighttime-integration
   ```
5. Restart your FiveM server

## Step 2: Run the Backend (on your website hosting)

1. Install Node.js on your hosting machine
2. Open a terminal in the `server` folder
3. Run:
   ```
   npm install
   npm start
   ```
4. The backend will run on port 3000

## Step 3: Website Features

Once the backend is running, the website will automatically:
- ✅ Show live server status (online/offline)
- ✅ Show live player count
- ✅ Show who's online in-game
- ✅ Live chat between website and in-game (using /forum command)

## How the Chat Works

- **Website → Game:** Type in the website chat box, it appears in-game
- **Game → Website:** In-game, type `/forum [message]` to send to website
- Players on the website can see in-game messages in real-time

## Commands

- `/forum [message]` — Send a message from FiveM to the website chat

## Troubleshooting

- **Server shows offline:** Make sure your FiveM server is running and port 40120 is accessible
- **Chat not working:** Make sure the backend server is running (`npm start`)
- **Can't connect:** Check that port 40120 is open in your firewall/router
