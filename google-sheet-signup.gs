// Bread n' Buttah: saves website sign-ups into this Google Sheet.
// Setup steps are in README.md under "Collecting sign-ups in a Google Sheet".
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(["Signed up", "Email"]);
  var p = (e && e.parameter) || {};
  var email = String(p.email || "").trim();
  // _honey is a hidden field only spam bots fill in
  if (email && !p._honey && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    sheet.appendRow([new Date(), email]);
  }
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
