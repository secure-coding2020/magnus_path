/**
 * Magnus Path – booking form → Google Sheet
 *
 * Paste this whole file into Extensions → Apps Script in your Google Sheet,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Copy the Web app URL into src/config.js in the React project.
 */

const SHEET_NAME = 'Bookings';

// Where booking alerts are sent. Leave empty ('') to send them to the
// Google account that owns this script, or put another address in quotes.
const NOTIFY_EMAIL = '';
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

    const now = new Date();
    const sheet = getSheet();
    sheet.appendRow([now, safe(name), safe(email), safe(mobile), safe(interest)]);

    // Email alert. If it fails, the booking is still saved.
    try {
      sendBookingAlert({ name: name, email: email, mobile: mobile, interest: interest, time: now });
    } catch (mailErr) {
      console.error('Email alert failed: ' + mailErr);
    }

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

function sendBookingAlert(b) {
  const to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  const when = Utilities.formatDate(b.time, 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a') + ' IST';
  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const phoneLink = b.mobile.replace(/[^0-9+]/g, '');

  const row = (label, value) =>
    '<tr><td style="padding:8px 12px;color:#64748b;white-space:nowrap">' + label + '</td>' +
    '<td style="padding:8px 12px;color:#0f172a;font-weight:600">' + value + '</td></tr>';

  const html =
    '<div style="font-family:Arial,sans-serif;max-width:520px">' +
    '<h2 style="color:#0f172a;margin:0 0 4px">New Strategy Session Booking</h2>' +
    '<p style="color:#64748b;margin:0 0 16px">' + when + '</p>' +
    '<table style="border-collapse:collapse;background:#f8fafc;border-radius:8px;width:100%">' +
    row('Name', escapeHtml(b.name)) +
    row('Email', '<a href="mailto:' + escapeHtml(b.email) + '">' + escapeHtml(b.email) + '</a>') +
    row('Mobile', '<a href="tel:' + escapeHtml(phoneLink) + '">' + escapeHtml(b.mobile) + '</a>') +
    row('Interest', escapeHtml(b.interest)) +
    '</table>' +
    '<p style="margin:16px 0 0"><a href="' + sheetUrl + '" style="color:#3b82f6">Open the bookings sheet</a></p>' +
    '<p style="color:#94a3b8;font-size:12px;margin-top:16px">Tip: press Reply to email ' + escapeHtml(b.name) + ' directly.</p>' +
    '</div>';

  MailApp.sendEmail({
    to: to,
    replyTo: b.email,
    name: 'Magnus Path Website',
    subject: 'New booking: ' + b.name + ' – ' + b.interest,
    htmlBody: html,
    body: 'New booking (' + when + ')\nName: ' + b.name + '\nEmail: ' + b.email +
          '\nMobile: ' + b.mobile + '\nInterest: ' + b.interest + '\nSheet: ' + sheetUrl,
  });
}

// Run this once from the editor (select it, click ▶ Run) to approve email
// permission and receive a sample alert. It does not add a row to the sheet.
function testEmailAlert() {
  sendBookingAlert({
    name: 'Test Person',
    email: Session.getEffectiveUser().getEmail(),
    mobile: '+91 98765 43210',
    interest: 'Cyber Security Training',
    time: new Date(),
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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