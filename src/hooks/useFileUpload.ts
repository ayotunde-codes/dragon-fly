import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { generateUrl, uploadToS3, processFile, checkStatus } from '../api/fileUploadApi';
import { UploadedFile } from '../types/fileUpload';

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const generateUrlMutation = useMutation({
    mutationFn: generateUrl,
  });

  const uploadToS3Mutation = useMutation({
    mutationFn: ({ file, url }: { file: File; url: string }) => uploadToS3(file, url),
  });

  const processFileMutation = useMutation({
    mutationFn: ({ key }: { key: string }) => processFile(key),
  });

  const handleFileUpload = async (files: File[], retryFile?: File) => {
    const newUploadedFiles: UploadedFile[] = files.map((file) => ({
      file,
      status: 'uploading',
      taskId: null,
    }));

    if (retryFile) {
        setUploadedFiles((prevFiles) =>
          prevFiles.map((file) => (file.file === retryFile ? { ...file, status: 'uploading' } : file))
        );
      } else {
        setUploadedFiles((prevFiles) => [...newUploadedFiles, ...prevFiles]);
      }

    for (const uploadedFile of newUploadedFiles) {
      try {
        const { key } = await generateUrlMutation.mutateAsync();
        await uploadToS3Mutation.mutateAsync({ file: uploadedFile.file, url: key });
        const { taskId } = await processFileMutation.mutateAsync({ key });

        setUploadedFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.file === uploadedFile.file ? { ...file, status: 'processing', taskId } : file
          )
        );

        const pollStatus = async () => {
          const { status } = await checkStatus(taskId);
          if (status === 'completed') {
            setUploadedFiles((prevFiles) =>
              prevFiles.map((file) =>
                file.taskId === taskId ? { ...file, status: 'completed' } : file
              )
            );
          } else {
            setTimeout(pollStatus, 5000);
          }
        };

        setTimeout(pollStatus, 5000);
      } catch (error) {
        setUploadedFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.file === uploadedFile.file ? { ...file, status: 'failed' } : file
          )
        );
      }
    }
  };

  const handleRetry = (file: File) => {
    handleFileUpload([file], file);
  };


  return { uploadedFiles, handleFileUpload, handleRetry };
};