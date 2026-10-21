import React, { useState, useRef } from 'react';
import { Upload, Clipboard, Image as ImageIcon, X, Check, Link as LinkIcon, Sparkles } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  recommendedSize?: string;
  aspectRatioClass?: string;
  helperText?: string;
  presetSamples?: { name: string; url: string }[];
}

export function ImageUploadField({
  label,
  value,
  onChange,
  recommendedSize = '1200 × 800px (16:9)',
  aspectRatioClass = 'aspect-[16/9]',
  helperText,
  presetSamples
}: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [pasteNotice, setPasteNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => {
    setPasteNotice(msg);
    setTimeout(() => setPasteNotice(null), 3000);
  };

  // Convert File to base64 Data URL
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      notify('⚠️ Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
        notify('✅ Image uploaded successfully from PC!');
      }
    };
    reader.onerror = () => {
      notify('⚠️ Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset file input so selecting the same file again triggers change
    if (e.target) e.target.value = '';
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Handle Paste from Clipboard (Ctrl+V or button)
  const handlePasteEvent = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            processFile(file);
            return;
          }
        }
      }
      // If text is pasted and looks like a URL
      const text = e.clipboardData.getData('text');
      if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
        e.preventDefault();
        onChange(text.trim());
        notify('✅ Image link pasted from clipboard!');
      }
    }
  };

  // Native Clipboard read if user clicks "Paste from Clipboard" button
  const handleReadClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
          const imageType = item.types.find((t) => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const file = new File([blob], 'clipboard-image.png', { type: imageType });
            processFile(file);
            return;
          }
        }
      }
      // Fallback: check text in clipboard
      const text = await navigator.clipboard.readText();
      if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
        onChange(text.trim());
        notify('✅ Image link pasted from clipboard!');
        return;
      }
      notify('ℹ️ Tip: Press Ctrl+V inside the box or copy an image first.');
    } catch (err) {
      notify('ℹ️ Please press Ctrl+V inside this box to paste your copied image.');
    }
  };

  return (
    <div className="space-y-2" onPaste={handlePasteEvent} tabIndex={0}>
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-bold text-slate-700">
          {label}
        </label>
        <span className="text-[10px] font-mono text-slate-400">
          Rec: {recommendedSize}
        </span>
      </div>

      {pasteNotice && (
        <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0056b3] font-semibold flex items-center justify-between animate-in fade-in">
          <span>{pasteNotice}</span>
          <button type="button" onClick={() => setPasteNotice(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Upload Box / Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 transition-all p-4 ${
          isDragging
            ? 'border-[#0056b3] bg-blue-50/70 scale-[1.01]'
            : value
            ? 'border-slate-200 bg-slate-50/50'
            : 'border-dashed border-slate-300 hover:border-slate-400 bg-white'
        }`}
      >
        {value ? (
          /* Preview State */
          <div className="space-y-3">
            <div className={`relative ${aspectRatioClass} w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs group`}>
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover transition-transform group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900/80 hover:bg-slate-900 backdrop-blur-sm rounded-lg border border-white/20 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                  title="Change image from computer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Change</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1 text-white bg-red-600/80 hover:bg-red-600 backdrop-blur-sm rounded-lg border border-red-400 transition-all shadow-sm cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="absolute bottom-2 left-2.5 text-white flex items-center gap-1.5 text-[10px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Image Active (Local/Web)</span>
              </div>
            </div>

            {/* Quick Actions Under Preview */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5 text-[#0056b3]" />
                  <span>Upload from PC / Computer</span>
                </button>

                <button
                  type="button"
                  onClick={handleReadClipboard}
                  className="px-3 py-1.5 font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Paste copied screenshot or image from computer clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5 text-[#ff5722]" />
                  <span>Paste from Clipboard</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] font-medium text-slate-500 hover:text-[#0056b3] transition-colors cursor-pointer flex items-center gap-1"
              >
                <LinkIcon className="w-3 h-3" />
                <span>{showUrlInput ? 'Hide URL' : 'Edit URL'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty / Upload Prompt State */
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#0056b3] flex items-center justify-center mx-auto shadow-2xs">
              <ImageIcon className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-bold text-slate-800">
                Choose an image from your computer or paste from desktop
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Drag and drop image here, or use buttons below · PNG, JPG, WebP
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {/* Primary PC Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#0284c7] hover:opacity-95 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload from PC / Computer</span>
              </button>

              {/* Paste from Desktop Clipboard Button */}
              <button
                type="button"
                onClick={handleReadClipboard}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                title="Paste copied screenshot or image directly (Ctrl+V)"
              >
                <Clipboard className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Paste from Desktop (Ctrl+V)</span>
              </button>

              {/* Toggle URL Input */}
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Image Link</span>
              </button>
            </div>
          </div>
        )}

        {/* Hidden File Input for Native File Dialog */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Optional URL Input Dropdown */}
        {showUrlInput && (
          <div className="mt-3 pt-3 border-t border-slate-200/80 animate-in fade-in">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Direct Image URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/image.jpg or /src/assets/images/..."
                className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="px-2 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Preset quick templates if available */}
        {presetSamples && presetSamples.length > 0 && !value && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#ff5722]" />
              <span>Quick Preset Sample Images:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presetSamples.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    notify(`Selected ${preset.name}`);
                  }}
                  className="px-2.5 py-1 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer truncate max-w-[200px]"
                >
                  + {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-[10px] text-slate-400 leading-normal">
          {helperText}
        </p>
      )}
    </div>
  );
}
