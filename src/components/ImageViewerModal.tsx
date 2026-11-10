import React, { useState, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Copy, 
  Check, 
  ExternalLink,
  Info,
  Tag,
  BookOpen
} from '../icons/phosphor';
import { ModuleImage, InformaticsElement } from '../types';
import { INFORMATICS_ELEMENTS } from '../data/curriculumData';

interface ImageViewerModalProps {
  images: ModuleImage[];
  initialImageId?: string;
  initialIndex?: number;
  moduleTitle?: string;
  element?: InformaticsElement;
  isOpen?: boolean;
  onClose: () => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  images,
  initialImageId,
  initialIndex,
  moduleTitle,
  element,
  isOpen = true,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (typeof initialIndex === 'number' && initialIndex >= 0 && initialIndex < images.length) {
      setCurrentIndex(initialIndex);
    } else if (initialImageId && images.length > 0) {
      const idx = images.findIndex((img) => img.id === initialImageId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      } else {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(0);
    }
    setZoomScale(1);
  }, [initialImageId, initialIndex, images, isOpen]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];
  const elementInfo = element ? INFORMATICS_ELEMENTS[element] : undefined;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoomScale(1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomScale(1);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentImage.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md animate-fadeIn transition-all select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Navigation & Control Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-900/90 text-white z-10">
        <div className="flex items-center space-x-3 truncate">
          {elementInfo && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${elementInfo.badgeBg}`}>
              {elementInfo.code}
            </span>
          )}
          <div>
            <div className="text-xs text-slate-400 font-medium line-clamp-1">
              {moduleTitle || 'Diagram & Media Pembelajaran'} • Gambar {currentIndex + 1} dari {images.length}
            </div>
            <div className="text-sm font-bold text-slate-100 line-clamp-1">
              {currentImage.caption || currentImage.alt}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700 space-x-1">
            <button
              onClick={handleZoomOut}
              disabled={zoomScale <= 0.5}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Perkecil (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-1.5 min-w-[48px] text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomScale >= 3}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Perbesar (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Reset Skala 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy URL */}
          <button
            onClick={handleCopyUrl}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Salin URL Gambar"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Toggle Details Panel */}
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className={`p-2 rounded-xl border transition-colors ${
              isDetailsOpen 
                ? 'bg-blue-600/30 border-blue-500 text-blue-300' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/60'
            }`}
            title="Keterangan Edukatif"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 border border-slate-700 transition-colors"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-4 sm:p-8">
        {/* Previous Image Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl backdrop-blur-sm transition-all hover:scale-105"
            title="Gambar Sebelumnya (Panah Kiri)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image Display Area */}
        <div 
          className="relative max-w-full max-h-full flex items-center justify-center overflow-auto transition-transform duration-150"
          style={{ transform: `scale(${zoomScale})` }}
        >
          <img
            src={currentImage.url}
            alt={currentImage.alt || currentImage.caption}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] sm:max-h-[78vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-slate-800 bg-slate-900"
            draggable={false}
          />
        </div>

        {/* Next Image Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl backdrop-blur-sm transition-all hover:scale-105"
            title="Gambar Selanjutnya (Panah Kanan)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Educational Details & Thumbnail Bar */}
      {isDetailsOpen && (
        <div className="border-t border-slate-800 bg-slate-900/95 text-white px-4 sm:px-6 py-4 space-y-3 z-10 animate-slideUp">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-blue-400 flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Penjelasan Visual Konsep</span>
                </span>
                {currentImage.source && (
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                    Sumber: {currentImage.source}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
                {currentImage.caption}
              </p>
            </div>

            {/* Tags if available */}
            {currentImage.tags && currentImage.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {currentImage.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full flex items-center space-x-1"
                  >
                    <Tag className="w-2.5 h-2.5 text-blue-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Carousel if multiple images */}
          {images.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pt-1 pb-1 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setZoomScale(1);
                  }}
                  className={`relative shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    idx === currentIndex
                      ? 'border-blue-500 ring-2 ring-blue-400/40 opacity-100 scale-105'
                      : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-slate-950/80 text-[9px] px-1 font-bold text-white">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
