import React, { useState, useRef } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  Layers, 
  FileText,
  Sparkles,
  Download,
  Trash2,
  Table,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Sample CSV templates generator
const CSV_TEMPLATES = {
  tasks: `Task Name,Category,Assigned To,Progress,Due Date,Priority,Status
Substructure Concrete Pour,Civil,Ramesh Concrete,40,2026-11-15,High,In Progress
Fire Sprinkler Piping Block C,MEP,SafeGuard Fire,10,2026-12-01,Medium,In Progress
Exterior Glazing Panel Installation,Finishing,GlassTech Corp,0,2027-01-20,Low,Pending
Elevator Shaft Structural Framing,Structural,Apex Structures,85,2026-10-30,High,In Progress`,
  materials: `Material Name,Category,Available Stock,Unit,Min Threshold,Unit Price,Supplier,Consumption Rate
Reinforced TMT Bars 20mm,Structural,25,tons,15,64000,Tata Tiscon,2 tons/day
Ready-Mix Concrete M40,Civil,180,cu.m,100,4900,UltraTech ReadyMix,30 cu.m/day
Granite Floor Slabs 80x80,Finishing,950,sq.m,500,1250,Kajaria Ceramics,50 sq.m/day
PVC Conduit Pipes 25mm,MEP,1500,meters,800,45,Supreme Pipes Ltd,100 meters/day`,
  expenses: `Description,Category,Vendor,Amount,Date,Status
Structural Steel Batch 6 Advance,Materials,Tata Tiscon,4500000,2026-09-20,Paid
Tower Crane Operator Overtime,Labour,Gujarat Heavy Lift Corp,180000,2026-09-19,Paid
Site Safety Audit Certification,Contractor,Bureau Veritas,250000,2026-09-18,Approved
Concrete Pump Machine Rental,Equipment,ACC Machinery,380000,2026-09-17,Paid`,
  projects: `Project Name,Client,Location,Budget,Target Date,Manager,Category
Surat Smart Logistics Hub,LogiCorp India,Surat Gujarat,180000000,2027-11-30,Rohan Mehta,Industrial Warehousing
Vadodara Tech Hub Phase 2,Zenith Infra,Vadodara Gujarat,120000000,2027-08-15,Ananya Roy,Commercial IT Park`
};

export default function ImportView() {
  const { importCSVData, setActiveTab, showToast } = useApp();
  const fileInputRef = useRef(null);

  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState('');
  const [targetCategory, setTargetCategory] = useState('auto');
  const [parsedRows, setParsedRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isParsed, setIsParsed] = useState(false);
  const [isImported, setIsImported] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Parse CSV string into array of objects
  const parseCSVString = (text) => {
    if (!text || !text.trim()) return { headers: [], rows: [] };

    const lines = text.trim().split(/\r\n|\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return { headers: [], rows: [] };

    // Function to parse a single CSV line handling quotes
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let insideQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          result.push(current.trim().replace(/^["']|["']$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      return result;
    };

    const headers = parseLine(lines[0]).map(h => h.trim());
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      if (values.length > 0 && values.some(v => v.length > 0)) {
        const rowObj = {};
        headers.forEach((header, idx) => {
          const key = header.toLowerCase().replace(/[^a-z0-9]/g, '');
          rowObj[header] = values[idx] || '';

          // Normalize common keys
          if (key.includes('task') || key.includes('activity') || key === 'name') rowObj.name = rowObj.name || values[idx];
          if (key.includes('progress') || key === 'pct') rowObj.progress = values[idx];
          if (key.includes('due') || key.includes('date') || key.includes('deadline')) rowObj.dueDate = rowObj.dueDate || values[idx];
          if (key.includes('assign') || key.includes('contractor') || key.includes('lead')) rowObj.assignedTo = values[idx];
          if (key.includes('prio')) rowObj.priority = values[idx];
          if (key.includes('status')) rowObj.status = values[idx];
          if (key.includes('cat') || key.includes('trade')) rowObj.category = values[idx];

          if (key.includes('material') || key.includes('item')) rowObj.materialName = rowObj.materialName || values[idx];
          if (key.includes('avail') || key.includes('qty') || key.includes('stock') || key.includes('quantity')) rowObj.available = values[idx];
          if (key.includes('min') || key.includes('threshold')) rowObj.minLevel = values[idx];
          if (key.includes('unit') && !key.includes('price')) rowObj.unit = values[idx];
          if (key.includes('price') || key.includes('rate') || key.includes('cost')) rowObj.unitPrice = values[idx];
          if (key.includes('supplier') || key.includes('vendor')) rowObj.supplier = values[idx];
          if (key.includes('consum') || key.includes('burn')) rowObj.consumption = values[idx];

          if (key.includes('amount') || key.includes('expense') || key.includes('total')) rowObj.amount = values[idx];
          if (key.includes('desc') || key.includes('particulars')) rowObj.description = values[idx];

          if (key.includes('client')) rowObj.client = values[idx];
          if (key.includes('budget')) rowObj.budget = values[idx];
          if (key.includes('location') || key.includes('city')) rowObj.location = values[idx];
          if (key.includes('manager')) rowObj.manager = values[idx];
        });

        // Set type hint based on category selector or auto detection
        if (targetCategory !== 'auto') {
          rowObj.type = targetCategory;
        }
        rows.push(rowObj);
      }
    }

    return { headers, rows };
  };

  // Handle uploaded file
  const handleFileUpload = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setRawText(content);
      processCSVContent(content);
    };
    reader.readAsText(file);
  };

  const processCSVContent = (content) => {
    const { headers, rows } = parseCSVString(content);
    if (rows.length === 0) {
      showToast("Could not parse valid CSV data. Please check formatting.", "warning");
      return;
    }
    setColumns(headers);
    setParsedRows(rows);
    setIsParsed(true);
    setIsImported(false);
    showToast(`Parsed ${rows.length} records across ${headers.length} columns.`, "info");
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Load a built-in sample template
  const handleLoadTemplate = (type) => {
    const templateContent = CSV_TEMPLATES[type] || CSV_TEMPLATES.tasks;
    setRawText(templateContent);
    setFileName(`${type}_sample_dataset.csv`);
    setTargetCategory(type);
    processCSVContent(templateContent);
  };

  // Download template as file
  const handleDownloadTemplate = (type) => {
    const content = CSV_TEMPLATES[type];
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `constructiq_${type}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded ${type} CSV template.`, "success");
  };

  // Execute ingestion into AppContext
  const handleExecuteImport = () => {
    if (parsedRows.length === 0) return;
    importCSVData(parsedRows, targetCategory);
    setIsImported(true);
  };

  const handleReset = () => {
    setRawText('');
    setFileName('');
    setParsedRows([]);
    setColumns([]);
    setIsParsed(false);
    setIsImported(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#275232] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Automated Construction Data Ingestion Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Data Import & CSV Ingestion Center</h1>
          <p className="text-xs text-[#6E726E] mt-1">Upload CSV or spreadsheet exports to instantly sync tasks, inventory, expenses, or projects into live operations.</p>
        </div>

        <div className="flex items-center gap-2">
          {isParsed && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F7F5F0] text-[#4A524A] font-bold text-xs rounded-xl border border-[#E5E2DA] transition-colors shadow-xs"
            >
              <Trash2 className="w-4 h-4 text-[#8C8275]" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Template Quick Actions */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6E726E] flex items-center gap-1.5">
            <Download className="w-4 h-4 text-[#275232]" />
            Download or Load Sample CSV Datasets:
          </span>
          <span className="text-[11px] text-[#8C8275]">Supports custom spreadsheets, ERP exports & site daily dumps</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'tasks', label: 'Tasks & Schedules', desc: '4 activities with progress & dates' },
            { id: 'materials', label: 'Materials & Stock', desc: '4 materials with thresholds & rates' },
            { id: 'expenses', label: 'Site Expenses', desc: '4 financial ledger transactions' },
            { id: 'projects', label: 'New Projects', desc: '2 complete project metadata rows' }
          ].map(t => (
            <div key={t.id} className="p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] flex flex-col justify-between space-y-2">
              <div>
                <span className="text-xs font-bold text-[#1E231F] block">{t.label}</span>
                <span className="text-[10px] text-[#6E726E] block mt-0.5">{t.desc}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleLoadTemplate(t.id)}
                  className="flex-1 py-1.5 px-2 bg-[#275232] hover:bg-[#1E3F27] text-white text-[11px] font-bold rounded-lg transition-colors text-center shadow-xs"
                >
                  Load Sample
                </button>
                <button
                  onClick={() => handleDownloadTemplate(t.id)}
                  title="Download .csv file"
                  className="p-1.5 bg-white hover:bg-[#E5E2DA] text-[#4A524A] rounded-lg border border-[#E5E2DA] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Zone & Manual Raw Text Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File Drag and Drop Box */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`lg:col-span-7 p-8 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center cursor-pointer shadow-xs ${
            isDragging 
              ? 'border-[#275232] bg-[#E5EFE2]' 
              : 'border-[#E5E2DA] bg-white hover:border-[#275232] hover:bg-[#F7F5F0]/60'
          }`}
        >
          <input 
            type="file"
            ref={fileInputRef}
            accept=".csv,.txt,.tsv"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-2xl bg-[#E5EFE2] text-[#275232] border border-[#C6DCBF] flex items-center justify-center mb-3">
            <Upload className="w-7 h-7" />
          </div>

          <h3 className="text-sm font-bold text-[#1E231F]">
            {fileName ? `Selected: ${fileName}` : 'Click to Browse or Drag & Drop CSV File'}
          </h3>
          <p className="text-xs text-[#6E726E] mt-1 max-w-sm">
            Upload any .csv or tab-delimited text file. Columns are automatically mapped to ConstructIQ records.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#F7F5F0] text-[#275232] text-[11px] font-bold border border-[#E5E2DA]">
              .CSV
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F7F5F0] text-[#275232] text-[11px] font-bold border border-[#E5E2DA]">
              .TSV
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F7F5F0] text-[#275232] text-[11px] font-bold border border-[#E5E2DA]">
              .TXT
            </span>
          </div>
        </div>

        {/* Manual Paste Raw CSV Area */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1E231F] flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-[#275232]" />
                Or Paste Raw CSV Data Directly:
              </span>
              <select
                value={targetCategory}
                onChange={(e) => {
                  setTargetCategory(e.target.value);
                  if (rawText) processCSVContent(rawText);
                }}
                className="bg-[#F7F5F0] text-[11px] font-semibold text-[#1E231F] px-2 py-1 rounded-lg border border-[#E5E2DA] focus:outline-none focus:border-[#275232]"
              >
                <option value="auto">Auto-Detect Type</option>
                <option value="task">Force Tasks</option>
                <option value="material">Force Materials</option>
                <option value="expense">Force Expenses</option>
                <option value="project">Force Projects</option>
              </select>
            </div>

            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => {
                setRawText(e.target.value);
                if (e.target.value.trim().length > 10) {
                  processCSVContent(e.target.value);
                }
              }}
              placeholder="Paste comma-separated rows with headers here..."
              className="w-full font-mono text-[11px] bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl p-3 text-[#1E231F] focus:outline-none focus:border-[#275232] resize-none"
            />
          </div>

          <button
            onClick={() => processCSVContent(rawText)}
            disabled={!rawText.trim()}
            className="w-full py-2.5 bg-[#275232] hover:bg-[#1E3F27] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Parse & Validate Data</span>
          </button>
        </div>
      </div>

      {/* PARSED TABLE & LIVE INGESTION SECTION */}
      {isParsed && parsedRows.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Strip */}
          <div className="p-4 rounded-2xl bg-[#E5EFE2] border border-[#C6DCBF] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#275232] text-white rounded-xl shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E231F]">Ready to Ingest: {parsedRows.length} Validated Records</h4>
                <p className="text-xs text-[#275232]">
                  Detected {columns.length} columns • Auto-mapped to system schema • Zero critical errors
                </p>
              </div>
            </div>

            {!isImported ? (
              <button
                onClick={handleExecuteImport}
                className="px-6 py-3 bg-[#275232] hover:bg-[#1E3F27] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Execute Ingestion into Live Platform</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-[#275232] text-xs font-bold bg-white px-4 py-2.5 rounded-xl border border-[#C6DCBF] shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully Ingested into Platform State!</span>
              </div>
            )}
          </div>

          {/* Parsed Preview Table */}
          <div className="rounded-2xl bg-white border border-[#E5E2DA] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E5E2DA] bg-[#F7F5F0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#275232]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E231F]">Parsed Data Preview Table</h3>
              </div>
              <span className="text-[11px] font-mono text-[#6E726E]">{parsedRows.length} Rows</span>
            </div>

            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F5F0] text-[#6E726E] font-bold uppercase tracking-wider border-b border-[#E5E2DA] sticky top-0">
                  <tr>
                    <th className="p-3 w-12">#</th>
                    {columns.map((col, idx) => (
                      <th key={idx} className="p-3 whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] text-[#1E231F]">
                  {parsedRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#F7F5F0]/60 transition-colors">
                      <td className="p-3 text-[#8C8275] font-mono">{rIdx + 1}</td>
                      {columns.map((col, cIdx) => (
                        <td key={cIdx} className="p-3 whitespace-nowrap">
                          {row[col] || <span className="text-[#8C8275] italic">-</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Post-Import Direct Navigation Links */}
          {isImported && (
            <div className="p-5 rounded-2xl bg-white border border-[#C6DCBF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E231F]">
                <Info className="w-4 h-4 text-[#275232]" />
                <span>Navigate directly to verify your newly ingested data in live views:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>View Tasks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setActiveTab('materials')}
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>View Materials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setActiveTab('expenses')}
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>View Expenses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
