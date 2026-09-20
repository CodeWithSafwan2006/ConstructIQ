import React, { useState, useRef } from 'react';
import { FolderCheck, FileText, Upload, Search, Download, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DocumentsView() {
  const { documents, addDocument, deleteDocument, selectedProject, showToast } = useApp();
  const fileInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('BOQ');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileSizeStr, setFileSizeStr] = useState('1.5 MB');

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilePicked = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setDocTitle(file.name.replace(/\.[^/.]+$/, ""));
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFileSizeStr(`${sizeMB} MB`);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!docTitle) return;

    addDocument({
      title: docTitle,
      category: docCategory,
      fileSize: fileSizeStr,
      uploadedBy: "Project Manager (Rohan Mehta)",
      date: new Date().toISOString().split('T')[0],
      status: "Uploaded & Verified",
      format: selectedFileName.split('.').pop()?.toUpperCase() || "PDF"
    });

    setDocTitle('');
    setSelectedFileName('');
    setShowUploadModal(false);
  };

  const handleDownloadDoc = (doc) => {
    showToast(`Downloading "${doc.title}.${(doc.format || 'pdf').toLowerCase()}"...`, 'info');
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Centralized Document & BOQ Repository</h1>
          <p className="text-xs text-[#6E726E] mt-1">Store and index BOQ sheets, structural approvals, material certificates, and contracts.</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA] flex items-center justify-between shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search documents, BOQs, or certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E231F] placeholder-[#8C8275] focus:outline-none focus:border-[#275232]"
          />
        </div>
        <span className="text-xs text-[#6E726E] font-medium">{filteredDocs.length} Documents Indexed</span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="p-5 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C6DCBF] transition-all shadow-xs flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-xl bg-[#E5EFE2] border border-[#C6DCBF] text-[#275232] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#275232] bg-[#E5EFE2] px-2 py-0.5 rounded border border-[#C6DCBF]">
                  {doc.category}
                </span>
                <h3 className="text-sm font-bold text-[#1E231F] mt-1">{doc.title}</h3>
                <div className="text-[11px] text-[#6E726E] mt-1">
                  Size: {doc.fileSize} • Uploaded by {doc.uploadedBy} on {doc.date}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] font-bold text-[#275232] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {doc.status}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleDownloadDoc(doc)}
                  className="p-2 bg-[#F7F5F0] hover:bg-[#E5E2DA] text-[#1E231F] rounded-lg text-xs transition-colors border border-[#E5E2DA]"
                  title="Download file"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => deleteDocument(doc.id)}
                  className="p-2 bg-[#F7F5F0] hover:bg-red-100 text-[#8C8275] hover:text-red-700 rounded-lg text-xs transition-colors border border-[#E5E2DA]"
                  title="Delete file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#1E231F]">Upload Construction Document</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFilePicked}
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E5E2DA] hover:border-[#275232] rounded-xl p-6 text-center text-xs text-[#6E726E] bg-[#F7F5F0] cursor-pointer transition-colors"
              >
                <Upload className="w-8 h-8 text-[#275232] mx-auto mb-2" />
                <p className="font-semibold text-[#1E231F]">
                  {selectedFileName ? `Selected: ${selectedFileName}` : 'Click to select PDF, XLSX, or DOCX file'}
                </p>
                <span className="text-[10px] text-[#8C8275]">Supports site drawings, BOQs, test certificates</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E231F] mb-1">Document Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Electrical Inspection BOQ Sheet"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E231F] mb-1">Category</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                >
                  <option value="BOQ">BOQ (Bill of Quantities)</option>
                  <option value="Contracts">Contracts</option>
                  <option value="Invoices">Invoices</option>
                  <option value="Site Reports">Site Reports</option>
                  <option value="Approvals">Approvals</option>
                  <option value="Material Certificates">Material Certificates</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E2DA]">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-[#F7F5F0] text-[#4A524A] hover:text-[#1E231F] rounded-xl text-xs font-bold border border-[#E5E2DA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
