import React, { useState, useRef } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import FilePreview from './FilePreview';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

const FileUpload: React.FC = () => {
  const { uploadedFiles, handleFileUpload, handleRetry } = useFileUpload();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const dropAreaVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
  };

  const filePreviewVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div>
      <motion.div
        className={cn('border-2 border-dashed rounded-lg p-4 py-8 mb-4', {
            'border-blue-500': isDragging,
            'border-gray-400': !isDragging,
        })}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        variants={dropAreaVariants}
        initial="initial"
        whileHover="hover"
      >
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          ref={fileInputRef}
        />
        <p className="text-center">
          {isDragging ? 'Drop the files here' : 'Drag and drop files here or click to browse'}
        </p>
      </motion.div>
      <AnimatePresence>
        {!!uploadedFiles.length && (
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {uploadedFiles.map((uploadedFile, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center"
                variants={filePreviewVariants}
              >
                <FilePreview uploadedFile={uploadedFile} onRetry={handleRetry} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;