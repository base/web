import { google } from '@googleapis/sheets';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Google Sheets client
const getGoogleSheetsClient = () => {
  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '', 'base64').toString(),
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Failed to initialize Google Sheets client:', error);
    throw new Error('Failed to initialize Google Sheets client');
  }
};

type FeedbackPayload = {
  likeOrDislike: boolean;
  options: string[];
  comment: string;
  url: string;
  ipAddress: string;
  timestamp: number;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { likeOrDislike, options, comment, url, ipAddress, timestamp } =
      req.body as FeedbackPayload;

    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
    }

    // Format the row data
    const rowData = [
      new Date(timestamp).toISOString(),
      url,
      ipAddress,
      likeOrDislike ? 'Like' : 'Dislike',
      options.join(', '),
      comment,
    ];

    // Append the row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F', // Adjust range based on your sheet's structure
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ error: 'Failed to submit feedback' });
  }
}
