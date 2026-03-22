import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || 'eu-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function uploadToS3(
  file: File,
  folder: string = 'products'
): Promise<string> {
  const bucket = process.env.AWS_S3_BUCKET_NAME;

  if (!bucket) {
    throw new Error('AWS_S3_BUCKET_NAME is not set');
  }

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
    await s3Client.send(command);

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
  const bucket = process.env.AWS_S3_BUCKET_NAME;

  if (!bucket) {
    throw new Error('AWS_S3_BUCKET_NAME is not set');
  }

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

    await s3Client.send(command);
  } catch (error) {
    console.error('S3 delete error:', error);
    // Don't throw, just log - deletion failure shouldn't block operations
  }
}
