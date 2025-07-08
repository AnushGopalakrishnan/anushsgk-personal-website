/**
 * Google Apps Script for Contact Form
 * This script handles contact form submissions and stores them in a Google Sheet
 */

// Replace this with your actual Google Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Contact Submissions';

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const { name, email, message } = data;
    
    // Validate required fields
    if (!name || !email || !message) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      newSheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Name', 'Email', 'Message']]);
      newSheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }
    
    // Get the sheet (either existing or newly created)
    const targetSheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const timestamp = new Date();
    const rowData = [timestamp, name, email, message];
    
    // Append the data to the sheet
    targetSheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    targetSheet.autoResizeColumns(1, 4);
    
    // Optional: Send email notification to admin
    sendAdminNotification(name, email, message);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send email notification to admin (optional)
 * Uncomment and configure if you want email notifications
 */
function sendAdminNotification(name, email, message) {
  // Uncomment the lines below and configure with your admin email
  /*
  const adminEmail = 'your-admin-email@gmail.com';
  const subject = 'New Contact Form Submission';
  const body = `
    New contact form submission received:
    
    Name: ${name}
    Email: ${email}
    Message: ${message}
    
    Timestamp: ${new Date()}
  `;
  
  MailApp.sendEmail(adminEmail, subject, body);
  */
}

/**
 * Test function to verify the script is working
 * You can run this manually in the Apps Script editor
 */
function testContactForm() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the contact form.'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

/**
 * Setup function to create the sheet if it doesn't exist
 * Run this once to set up your Google Sheet
 */
function setupContactSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Name', 'Email', 'Message']]);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 4).setBackground('#f3f4f6');
      
      // Set column widths
      sheet.setColumnWidth(1, 180); // Timestamp
      sheet.setColumnWidth(2, 150); // Name
      sheet.setColumnWidth(3, 200); // Email
      sheet.setColumnWidth(4, 400); // Message
      
      console.log('Contact form sheet created successfully!');
    } else {
      console.log('Contact form sheet already exists!');
    }
  } catch (error) {
    console.error('Error setting up contact sheet:', error);
  }
} 