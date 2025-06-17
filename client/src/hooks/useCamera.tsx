import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CameraOptions {
  quality?: number;
  allowEditing?: boolean;
  resultType?: 'uri' | 'base64';
  source?: 'camera' | 'photos' | 'prompt';
}

export const useCamera = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const { user } = useAuth();

  const capturePhoto = async (options: CameraOptions = {}) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsCapturing(true);
    
    try {
      // Check if we're running in a Capacitor environment
      const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
      
      if (isCapacitor) {
        // Use Capacitor Camera plugin for native apps
        const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
        
        const image = await Camera.getPhoto({
          quality: options.quality || 90,
          allowEditing: options.allowEditing || false,
          resultType: CameraResultType.Uri,
          source: options.source === 'photos' ? CameraSource.Photos : 
                  options.source === 'camera' ? CameraSource.Camera : 
                  CameraSource.Prompt,
        });
        
        return image;
      } else {
        // Use web API for PWA
        return await capturePhotoWeb(options);
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
      throw error;
    } finally {
      setIsCapturing(false);
    }
  };

  const capturePhotoWeb = async (options: CameraOptions): Promise<any> => {
    return new Promise((resolve, reject) => {
      // Create file input for web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      if (options.source === 'camera') {
        input.capture = 'environment';
      }
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              webPath: reader.result as string,
              format: file.type.split('/')[1],
              saved: false
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        } else {
          reject(new Error('No file selected'));
        }
      };
      
      input.click();
    });
  };

  const uploadPhoto = async (photo: any, bucket: 'profile_pictures' | 'delivery_proofs', fileName?: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      let fileBlob: Blob;
      let fileExtension = 'jpg';

      if (photo.webPath) {
        // Convert data URL to blob
        const response = await fetch(photo.webPath);
        fileBlob = await response.blob();
        fileExtension = photo.format || 'jpg';
      } else {
        throw new Error('No valid photo data');
      }

      // Generate unique filename
      const timestamp = Date.now();
      const finalFileName = fileName || `${user.id}_${timestamp}.${fileExtension}`;
      const filePath = bucket === 'profile_pictures' ? 
        `avatars/${finalFileName}` : 
        `proofs/${finalFileName}`;

      // Upload to server storage
      const formData = new FormData();
      formData.append('file', fileBlob, finalFileName);
      formData.append('bucket', bucket);
      formData.append('path', filePath);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      return {
        path: result.path,
        publicUrl: result.publicUrl,
        fullPath: result.fullPath
      };
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  const deletePhoto = async (path: string, bucket: 'profile_pictures' | 'delivery_proofs') => {
    try {
      const response = await fetch('/api/delete-file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path, bucket }),
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      return true;
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  };

  return {
    capturePhoto,
    uploadPhoto,
    deletePhoto,
    isCapturing
  };
};