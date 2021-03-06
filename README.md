# DoxMe.io (front-end skills showcase)

![ui_demo](https://raw.githubusercontent.com/aronmandrella/dox-me-io/master/ui_demo_1.PNG)

## Demo link

[🔗 Live demo](https://aronmandrella.github.io/dox-me-io/)

⚠️ ipstack API doesn't allow https:// queries on free plan (only http://), so fetching ip metadata probably will be blocked by browser outside of localhost.

## How to install and run

Run in dev mode

```
npm install
npm run dev
```

Build and prepare for hosting

```
npm install
npm run build
```

## Specifications:

✔️ Uses Next.js + React + TypeScript + CSS Modules + SCSS.

✔️ Displays user IP with it’s location on the map after initial load.

✔️ Search box accepts only IP address or URL (if user provides something else appropriate message is displayed).

✔️ User can query any IP address or URL and display it on map.

✔️ 3rd party API responses are validated, error is displayed when needed.

✔️ History of searched locations is stored during session. Items in the list and markers on the map are clickable.

✔️ Has Responsive UI.
