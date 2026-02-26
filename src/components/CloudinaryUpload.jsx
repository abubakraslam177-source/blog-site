import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaSpinner, FaImage, FaTimes } from 'react-icons/fa';

const CloudinaryUpload = ({ onUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setPreview(data.secure_url);
      onUpload(data.secure_url);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-slate-700">Banner Image</label>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-all ${
            uploading ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <FaSpinner className="w-10 h-10 text-indigo-500 animate-spin mb-3" />
              <p className="text-slate-600 font-medium">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FaCloudUploadAlt className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-600 font-medium">Click to upload image</p>
              <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 10MB</p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Fallback URL input */}
      <div className="pt-2">
        <p className="text-xs text-slate-400 mb-2">Or paste an image URL:</p>
        <input
          type="url"
          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onUpload(e.target.value);
          }}
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
          placeholder="/images/CloudinaryUpload.jpg"
        />
      </div>
    </div>
  );
};

export default CloudinaryUpload;