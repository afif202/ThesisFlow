import React, { useState, useRef } from 'react';
import { 
  X, 
  FileText, 
  Upload, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreateCommitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { message: string; abstract: string; file: File | null }) => void;
}

export function CreateCommitModal({ isOpen, onClose, onConfirm }: CreateCommitModalProps) {
  const [message, setMessage] = useState('');
  const [abstract, setAbstract] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onConfirm({ message, abstract, file });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden pointer-events-auto border border-outline-variant"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/5 rounded-lg border border-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-on-surface tracking-tight">Create New Commit</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Commit Message */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-1">
                    Commit Message <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g., Update methodology section with recent peer review feedback"
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-outline"
                  />
                </div>

                {/* Abstract */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                    Abstract / Summary of Changes
                  </label>
                  <textarea
                    rows={4}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Briefly describe the substantive changes in this revision..."
                    className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none placeholder:text-outline"
                  />
                </div>

                {/* Upload Zone */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                    Upload Document (PDF)
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
                      isDragging 
                        ? 'border-primary bg-primary/5' 
                        : file 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-outline-variant hover:border-primary hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf"
                      className="hidden"
                    />
                    
                    <div className={`p-3 rounded-full ${file ? 'bg-green-500 text-white' : 'bg-primary/5 text-primary'}`}>
                      {file ? <CheckCircle2 className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-bold text-on-surface">
                        {file ? file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-[11px] text-on-surface-variant font-medium mt-1">
                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF only (Max 50MB)'}
                      </p>
                    </div>

                    {!file && (
                      <button 
                        type="button"
                        className="px-6 py-2 border border-outline-variant bg-white rounded-lg text-xs font-bold text-on-surface shadow-sm hover:bg-surface-bright transition-all"
                      >
                        Select File
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-outline-variant rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="px-8 py-2.5 bg-primary text-white rounded-lg text-xs font-black shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none"
                  >
                    Create Commit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
