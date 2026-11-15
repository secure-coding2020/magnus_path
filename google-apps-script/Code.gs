/**
 * Magnus Path – booking form → Google Sheet
 *
 * Paste this whole file into Extensions → Apps Script in your Google Sheet,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Copy the Web app URL into src/config.js in the React project.
 */

const SHEET_NAME = 'Bookings';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Mobile Number', 'Area of Interest'];

const ALLOWED_INTERESTS = [
  'Cyber Security Training',
  'Career Acceleration',
  'Enterprise Consulting',
  'Holistic / Life Mentoring',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // avoid two submissions writing to the same row

    const p = (e && e.parameter) || {};

    // Spam trap: real visitors never fill the hidden "website" field
    if (p.website) return json({ result: 'success' });

    const name = clean(p.name, 100);
    const email = clean(p.email, 150);
    const mobile = clean(p.mobile, 20);
    const interest = clean(p.interest, 60);

    if (!name || !email || !mobile) return json({ result: 'error', message: 'Missing required fields.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ result: 'error', message: 'Invalid email.' });
    const digits = mobile.replace(/\D/g, '');
    if (!/^\+?[0-9\s-]+$/.test(mobile) || digits.length < 7 || digits.length > 15) {
      return json({ result: 'error', message: 'Invalid mobile number.' });
    }
    if (ALLOWED_INTERESTS.indexOf(interest) === -1) return json({ result: 'error', message: 'Invalid area of interest.' });

    const sheet = getSheet();
    sheet.appendRow([new Date(), safe(name), safe(email), safe(mobile), safe(interest)]);

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', message: 'Server error.' });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the URL in a browser to check the script is live
function doGet() {
  return json({ result: 'ok', message: 'Magnus Path booking endpoint is running.' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean(value, maxLen) {
  return String(value || '').trim().slice(0, maxLen);
}

// Stops spreadsheet formula injection (values starting with = + - @)
// and keeps numbers like +91... as text instead of being read as a formula.
function safe(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
