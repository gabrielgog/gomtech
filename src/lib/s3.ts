import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

function validateS3Config(): void {
  const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_S3_BUCKET_NAME'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing AWS configuration: ${missing.join(', ')}`);
  }
}

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    validateS3Config();
    s3Client = new S3Client({
      region: process.env.AWS_S3_REGION || 'eu-west-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }
  return s3Client;
}

export async function uploadToS3(
  file: File,
  folder: string = 'products'
): Promise<string> {
  validateS3Config();

  const bucket = process.env.AWS_S3_BUCKET_NAME!;
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const fileName = `${folder}/${timestamp}-${randomString}-${file.name}`;

  const buffer = await file.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileName,
    Body: new Uint8Array(buffer),
    ContentType: file.type,
  });

  try {
    await getS3Client().send(command);

    // Return the public S3 URL
    const region = process.env.AWS_S3_REGION || 'eu-west-2';
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
    return url;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload image to S3');
  }
}

export async function deleteFromS3(imageUrl: string): Promise<void> {
  validateS3Config();

  const bucket = process.env.AWS_S3_BUCKET_NAME!;

  try {
    // Extract key from URL
    const key = imageUrl
      .split(`${bucket}.s3`)
      .pop()
      ?.replace(/^.*\.amazonaws\.com\//, '')
      .split('?')[0];

    if (!key) {
      console.warn('Could not extract S3 key from URL:', imageUrl);
      return;
    }

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await getS3Client().send(command);
  } catch (error) {
    console.error('S3 delete error:', error);
    // Don't throw, just log - deletion failure shouldn't block operations
  }
}
