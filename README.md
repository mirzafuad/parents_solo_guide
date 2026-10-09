# Parents' NYC Guide

A step-by-step travel guide for elderly parents visiting New York on their own.
It installs on an Android phone from Chrome and works without internet.

## What it does

- Walks through each trip one step at a time, with a picture of what to look for.
- Shows the subway ride as a list of stations: where you are, how many stops are left, where to get off.
- Moves down the station list by itself when the phone can find its location, and warns about a wrong train or a missed stop. A button does the same by hand when there is no signal.
- Lists nearby halal food, mosques, restrooms and places to visit, with a walking-map link.
- Help screen: call family, text family your location to ask for a car, open Uber, and a card to show a stranger.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: screens, styles and logic |
| `sw.js` | Saves the app on the phone so it opens offline |
| `manifest.webmanifest` | Name and icons for the home screen |
| `icon-*.png` | App icons |

## Publish (once)

1. Upload all files to the root of this repository.
2. Repository **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**.
3. After a minute or two the app is live at `https://<user>.github.io/<repository>/`.

## Install on the parents' phone

1. Open the private setup link in Chrome. The Setup screen says "Setup saved on this phone".
2. Press **Install this app on this phone**, or Chrome menu (three dots) → **Add to Home screen**.
3. Press **Allow location on this phone** and choose Allow.
4. Wait until Setup says "Ready to work without internet".
5. Turn on airplane mode and open the app from the home screen to confirm it still opens.

## Private details

No address, phone number or train time is stored in this repository. They live only on the phone,
and travel between phones inside the setup link (Setup → "Send this setup to another phone").
Share that link with family only.

## Updating

After changing any file, also change `V` at the top of `sw.js` (for example `psg-v2`),
so phones download the new version the next time they open the app with internet.

## Limits

- Phone location often does not work in subway tunnels. The station list then needs the button, or reading the station name on the wall.
- Subway service changes on weekends are not included. Check mta.info on the day.
- Booking and following a car happens inside the Uber app.
