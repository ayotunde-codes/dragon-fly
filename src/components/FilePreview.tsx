import React from 'react';
import { motion } from 'framer-motion';
import { UploadedFile } from '../types/fileUpload';
import ShuffleLoader from './ShuffleLoader';
import cn from 'classnames';

interface FilePreviewProps {
  uploadedFile: UploadedFile;
  onRetry: (file: File) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ uploadedFile, onRetry }) => {
  const { file, status } = uploadedFile;
  const fileType = file.type.split('/')[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-300 rounded-md p-4 w-full h-full flex flex-col justify-start gap-2"
    >
    <div className="relative w-full h-48">
        {status === 'uploading' || status === 'processing' ? (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/70">
            <ShuffleLoader />
          </div>
        ) : null}
      {fileType === 'image' && (
        <img src={URL.createObjectURL(file)} alt={file.name} className={cn("max-w-full w-full max-h-48 object-cover mb-2 rounded", {
            'opacity-40': status === 'failed',
          })} />
      )}
      {fileType === 'video' && (
        <video src={URL.createObjectURL(file)} controls className={cn("max-w-full w-full max-h-48 object-cover mb-2 rounded", {
            'opacity-40': status === 'failed',
          })} />
      )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='flex items-center gap-1'
      >
        <p>Status:</p>
        <p  className={cn("uppercase text-sm font-semibold",{
          'text-yellow-500': status === 'uploading' || status === 'processing',
          'text-green-500': status === 'completed',
          'text-red-500': status === 'failed',
        })}>{status}</p>
      </motion.div>
      <p className={cn("text-sm",{
            'opacity-40': status === 'failed',
          } )}>{file.name}</p>

    {status === 'failed' && (
        <button
          className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-black/80 transition-colors"
          onClick={() => onRetry(file)}
        >
          Retry
        </button>
      )}
    </motion.div>
  );
};

export default FilePreview;