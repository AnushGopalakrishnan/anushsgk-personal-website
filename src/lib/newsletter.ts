export async function submitNewsletter(email: string) {
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_APPS_SCRIPT_URL;
      if (!scriptUrl) throw new Error('Google Apps Script URL not configured');
      const response = await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      console.log('Response:', response);
      return true;
    } catch (error) {
      console.error('Newsletter submission error:', error);
      throw error;
    }
}

export async function submitContact(name: string, email: string, message: string) {
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CONTACT_SCRIPT_URL;
      if (!scriptUrl) throw new Error('Google Apps Script Contact URL not configured');
      const response = await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
      console.log('Contact Response:', response);
      return true;
    } catch (error) {
      console.error('Contact submission error:', error);
      throw error;
    }
}