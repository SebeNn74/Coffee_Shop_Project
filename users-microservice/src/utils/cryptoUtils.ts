import crypto from 'crypto';

const SECRET_KEY = '12345678901234567890123456789012'

export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv('aes-256-ecb', Buffer.from(SECRET_KEY), null);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encryptedText: string): boolean {
    try {
        const decipher = crypto.createDecipheriv('aes-256-ecb', Buffer.from(SECRET_KEY), null);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return true;
    } catch (err) {
        return false;
    }
}
