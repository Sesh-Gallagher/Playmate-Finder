import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  currentImage?: string;
}

export function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'}`}
      >
        <input {...getInputProps()} />
        
        {currentImage ? (
          <div className="space-y-4">
            <img
              src={currentImage}
              alt="Preview"
              className="mx-auto h-32 w-32 rounded-full object-cover"
            />
            <p className="text-sm text-gray-500">Click or drag to replace</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-500">
              {isDragActive ? 'Drop the image here' : 'Drag & drop an image or click to select'}
            </p>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500">
        Supported formats: JPEG, PNG, WebP. Max size: 5MB
      </p>
    </div>
  );
}