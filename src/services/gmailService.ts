import { getAccessToken, googleSignIn } from './googleAuth';

interface SendGmailOptions {
  to: string;
  subject: string;
  body: string;
  fromName?: string;
}

export interface GmailSendResult {
  id: string;
  threadId: string;
  labelIds?: string[];
}

/**
 * Base64URL encoding safe for browser environment with UTF-8 characters
 */
function utf8ToBase64Url(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  const len = utf8Bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  const base64 = btoa(binary);
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Build RFC 2822 compliant MIME message string
 */
function buildRFC2822Message({ to, subject, body, fromName }: SendGmailOptions): string {
  // UTF-8 MIME encoded-word for subject to handle emojis and special characters
  const encodedSubject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const senderDisplayName = fromName || 'Flowers Soccer Academy';
  const encodedFromName = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(senderDisplayName)))}?=`;

  const headers: string[] = [
    `To: ${to}`,
    `From: ${encodedFromName} <flowersgoalkeeping@gmail.com>`,
    `Subject: ${encodedSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
  ];

  return headers.join('\r\n') + '\r\n\r\n' + body;
}

/**
 * Send an email directly through the Gmail API
 */
export async function sendGmailEmail(options: SendGmailOptions): Promise<GmailSendResult> {
  let token = await getAccessToken();

  // If token is missing, attempt to acquire via popup
  if (!token) {
    const authResult = await googleSignIn();
    token = authResult.accessToken;
  }

  if (!token) {
    throw new Error('Gmail authorization required. Please sign in with Google to send emails.');
  }

  const rfc2822String = buildRFC2822Message(options);
  const raw = utf8ToBase64Url(rfc2822String);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.error?.message || `Gmail API failed with status ${response.status}`;
    
    // If token expired, error hints to re-authenticate
    if (response.status === 401) {
      throw new Error('Google session expired. Please re-sign in to Gmail.');
    }
    throw new Error(message);
  }

  const result: GmailSendResult = await response.json();
  return result;
}
