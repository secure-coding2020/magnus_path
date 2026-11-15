# Magnus Path – React website

React (Vite) + Tailwind CSS version of the Magnus Path site.

## Run it on your Mac

```
npm install      # first time only
npm run dev      # opens a local preview at http://localhost:5173
```

## Where to edit

| What                        | File                               |
|-----------------------------|------------------------------------|
| Menu links                  | `src/components/Navbar.jsx`        |
| Big headline                | `src/components/Hero.jsx`          |
| Training cards              | `src/components/Training.jsx`      |
| Career levels               | `src/components/Career.jsx`        |
| Consulting cards            | `src/components/Consulting.jsx`    |
| Life skills / finance       | `src/components/Holistic.jsx`      |
| Booking form                | `src/components/Contact.jsx`       |
| Footer & social links       | `src/components/Footer.jsx`        |
| Colours                     | `src/index.css` (the `@theme` block) |

## Connect the booking form to Google Sheets

1. Create a new Google Sheet (sheets.new), e.g. "Magnus Path Bookings".
2. **Extensions → Apps Script**. Delete the sample code, paste all of
   `google-apps-script/Code.gs`, and click **Save**.
3. **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, then **Authorize access** and allow it.
4. Copy the **Web app URL** (ends in `/exec`) and paste it into
   `src/config.js`.
5. Push to GitHub. Submissions appear in the **Bookings** tab of the sheet.

If you change `Code.gs` later: **Deploy → Manage deployments → ✏️ Edit →
Version: New version → Deploy** (the URL stays the same).

## Publish

Push to the `main` branch. The workflow in `.github/workflows/deploy.yml`
builds the site and publishes it to GitHub Pages automatically.
(One-time: repo **Settings → Pages → Source → GitHub Actions**.)
