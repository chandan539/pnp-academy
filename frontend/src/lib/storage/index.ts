import { writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

/**
 * Mocks an upload to S3/R2 by saving to local public directory during development.
 * In production, this should use AWS SDK or Cloudflare R2 SDK.
 */
export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
  if (!file) return '';

  const buffer = Buffer.from(await file.arrayBuffer());
  const hash = crypto.randomBytes(8).toString('hex');
  const ext = path.extname(file.name);
  const filename = `${hash}${ext}`;
  
  // In a real app, this would be an S3 putObject call.
  // For local dev, we save to public/uploads
  const uploadDir = path.join(process.cwd(), 'public', folder);
  const filePath = path.join(uploadDir, filename);

  try {
    await writeFile(filePath, buffer);
    return `/${folder}/${filename}`;
  } catch (error) {
    console.error('File upload failed:', error);
    // If running in an environment where local fs writes fail (like Vercel),
    // return a mock URL.
    return `https://mock-s3-bucket.s3.amazonaws.com/${folder}/${filename}`;
  }
}
