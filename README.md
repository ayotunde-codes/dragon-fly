# Dragonfly File Upload

This is a React application that allows users to upload files using the Dragonfly file upload API. The application supports multiple file uploads, real-time status updates, file type-specific previews, drag and drop functionality, and error handling with retry functionality.

## Features

- Multiple file uploads: Users can select multiple files at once or drag and drop files onto the upload area.
- Real-time status updates: The application displays the status of each uploaded file in real-time (uploading, processing, completed, failed).
- File type-specific previews: The application shows a preview of the uploaded files based on their type (image, video, or file name).
- Drag and drop: Users can drag and drop files onto the upload area to initiate the upload process.
- Error handling: If a file upload fails, the application displays an error status and provides a retry button to attempt the upload again.
- Animations: The application uses Framer Motion to enhance the user experience with smooth animations for file previews and status updates.

## Technologies Used

- React: JavaScript library for building user interfaces.
- TypeScript: Typed superset of JavaScript that compiles to plain JavaScript.
- Tailwind CSS: Utility-first CSS framework for rapidly building custom designs.
- Framer Motion: Animation library for React to create smooth and responsive animations.
- React Query: Powerful data synchronization and state management library for React.
- Axios: Promise-based HTTP client for making API requests.
- Vite: Fast and lightweight development server and build tool for modern web applications.

## Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js (v14 or above)
- npm (v6 or above) or Yarn (v1 or above)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/dragonfly-file-upload.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory of the project and add the following variable:

   ```
   VITE_APP_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual Dragonfly API key.

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This will start the development server and open the application in your default browser.

5. Open your browser and visit `http://localhost:3000` to see the application running.

## Testing the Application

To test the file upload functionality:

1. Select files by clicking on the upload area or dragging and dropping files onto it.
2. The application will display the selected files with their names and upload status.
3. The files will be uploaded to the Dragonfly API, and the status will be updated in real-time (uploading, processing, completed, failed).
4. If a file upload fails, the status will be displayed as "failed," and a retry button will appear. Click the retry button to attempt the upload again.
5. The application will display a preview of the uploaded files based on their type (image, video, or file name).

## Folder Structure

The project follows a standard folder structure:

- `src`: Contains the main source code files.
  - `api`: Contains the API client and file upload API-related files.
  - `components`: Contains the React components used in the application.
  - `hooks`: Contains custom hooks used in the application.
  - `types`: Contains TypeScript type definitions.
  - `utils`: Contains utility functions.
- `public`: Contains the public assets and HTML template.
