import { supabaseAdmin } from './supabase';

export class SupabaseStorageService {
  private bucketName = 'delivery-photos';

  async uploadDeliveryPhoto(file: Buffer, fileName: string, userId: string): Promise<{ url: string | null; error: string | null }> {
    if (!supabaseAdmin) {
      return { url: null, error: 'Supabase not configured' };
    }

    try {
      const filePath = `${userId}/${Date.now()}-${fileName}`;

      const { data, error } = await supabaseAdmin.storage
        .from(this.bucketName)
        .upload(filePath, file, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (error) {
        return { url: null, error: error.message };
      }

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      return { url: publicUrlData.publicUrl, error: null };
    } catch (error) {
      return { url: null, error: 'Upload failed' };
    }
  }

  async deleteDeliveryPhoto(filePath: string): Promise<{ success: boolean; error: string | null }> {
    if (!supabaseAdmin) {
      return { success: false, error: 'Supabase not configured' };
    }

    try {
      const { error } = await supabaseAdmin.storage
        .from(this.bucketName)
        .remove([filePath]);

      return { success: !error, error: error?.message || null };
    } catch (error) {
      return { success: false, error: 'Delete failed' };
    }
  }

  async createBucketIfNotExists(): Promise<void> {
    if (!supabaseAdmin) return;

    try {
      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === this.bucketName);

      if (!bucketExists) {
        await supabaseAdmin.storage.createBucket(this.bucketName, {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          fileSizeLimit: 5242880 // 5MB
        });
      }
    } catch (error) {
      console.warn('Could not create/check Supabase bucket:', error);
    }
  }
}

export const supabaseStorage = new SupabaseStorageService();