import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

function PdfUploader({ onTextExtracted, label = 'Your Resume' }) {
  const [fileName, setFileName] = useState('');
  const [extracting, setExtracting] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') return;

    setFileName(file.name);
    setExtracting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      onTextExtracted(fullText);
    } catch (error) {
      console.error('PDF extraction failed:', error);
      alert('Could not read PDF. Try copy-pasting instead.');
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>

        {/* Upload Button */}
        <label className="flex items-center gap-1.5 text-xs text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors">
          <span>📎</span>
          <span>{extracting ? 'Extracting...' : 'Upload PDF'}</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* File name indicator */}
      {fileName && (
        <div className="mb-2 text-xs text-gray-400 flex items-center gap-1">
          <span>📄</span>
          <span>{fileName}</span>
          <span className="text-green-500 ml-1">✓ Extracted</span>
        </div>
      )}
    </div>
  );
}

export default PdfUploader;
