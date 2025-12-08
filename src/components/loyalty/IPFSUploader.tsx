"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  uploadJsonToIPFS,
  uploadFileToIPFS,
  getJsonFromIPFS,
} from "@/lib/loyaltyApi";
import { getIPFSUrl } from "@/lib/ipfs";

interface IPFSUploaderProps {
  account: string | null;
}

interface UploadResult {
  type: "json" | "file";
  name: string;
  cid: string;
  url: string;
  timestamp: Date;
}

export function IPFSUploader({ account }: IPFSUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [jsonInput, setJsonInput] = useState(
    '{\n  "name": "Test Data",\n  "description": "Dữ liệu test"\n}',
  );
  const [jsonName, setJsonName] = useState("test_metadata");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [retrieveCid, setRetrieveCid] = useState("");
  const [retrievedData, setRetrievedData] = useState<object | null>(null);
  const [isRetrieving, setIsRetrieving] = useState(false);

  // Upload JSON to IPFS
  const handleUploadJson = async () => {
    if (!account) {
      alert("Vui lòng kết nối ví trước!");
      return;
    }

    try {
      const data = JSON.parse(jsonInput);
      setIsUploading(true);

      const result = await uploadJsonToIPFS(data, jsonName);
      if (result.success && result.data) {
        const newResult: UploadResult = {
          type: "json",
          name: jsonName,
          cid: result.data.ipfsCid,
          url: result.data.ipfsUrl,
          timestamp: new Date(),
        };
        setUploadResults((prev) => [newResult, ...prev]);
        alert(`Upload thành công!\nCID: ${result.data.ipfsCid}`);
      } else {
        alert(`Lỗi upload: ${result.error}`);
      }
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        alert("JSON không hợp lệ!");
      } else {
        alert(`Lỗi: ${error.message}`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Upload file to IPFS
  const handleUploadFile = async () => {
    if (!account) {
      alert("Vui lòng kết nối ví trước!");
      return;
    }
    if (!selectedFile) {
      alert("Vui lòng chọn file!");
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadFileToIPFS(selectedFile, selectedFile.name);
      if (result.success && result.data) {
        const newResult: UploadResult = {
          type: "file",
          name: selectedFile.name,
          cid: result.data.ipfsCid,
          url: result.data.ipfsUrl,
          timestamp: new Date(),
        };
        setUploadResults((prev) => [newResult, ...prev]);
        setSelectedFile(null);
        alert(`Upload thành công!\nCID: ${result.data.ipfsCid}`);
      } else {
        alert(`Lỗi upload: ${result.error}`);
      }
    } catch (error: any) {
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Retrieve data from IPFS
  const handleRetrieve = async () => {
    if (!retrieveCid.trim()) {
      alert("Vui lòng nhập CID!");
      return;
    }

    setIsRetrieving(true);
    try {
      const result = await getJsonFromIPFS(retrieveCid.trim());
      if (result.success && result.data) {
        setRetrievedData(result.data);
      } else {
        alert(`Lỗi: ${result.error}`);
      }
    } catch (error: any) {
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsRetrieving(false);
    }
  };

  if (!account) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-[0.625em] border border-gray-200 bg-white p-[1.25em]",
      )}
    >
      <h3
        className={cn(
          "mb-4 flex items-center gap-2 text-[1.1em] font-bold text-gray-800",
        )}
      >
        📦 IPFS Storage
        <span className="text-[0.7em] font-normal text-gray-500">
          (Lưu trữ phi tập trung)
        </span>
      </h3>

      {/* Upload JSON Section */}
      <div className={cn("mb-4 rounded-lg bg-blue-50 p-3")}>
        <h4 className="mb-2 text-[0.9em] font-semibold text-blue-800">
          1. Upload JSON Metadata
        </h4>
        <input
          type="text"
          value={jsonName}
          onChange={(e) => setJsonName(e.target.value)}
          placeholder="Tên file"
          className="mb-2 w-full rounded-md border px-3 py-2 text-[0.85em]"
        />
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={4}
          className="mb-2 w-full rounded-md border px-3 py-2 font-mono text-[0.85em]"
        />
        <Button
          onClick={handleUploadJson}
          disabled={isUploading}
          size="sm"
          className="bg-blue-600 text-[0.85em] hover:bg-blue-700"
        >
          {isUploading ? "Đang upload..." : "Upload JSON"}
        </Button>
      </div>

      {/* Upload File Section */}
      <div className={cn("mb-4 rounded-lg bg-green-50 p-3")}>
        <h4 className="mb-2 text-[0.9em] font-semibold text-green-800">
          2. Upload File (PDF, Image)
        </h4>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.gif"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="mb-2 w-full text-[0.85em]"
        />
        {selectedFile && (
          <p className="mb-2 text-[0.8em] text-gray-600">
            📄 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </p>
        )}
        <Button
          onClick={handleUploadFile}
          disabled={isUploading || !selectedFile}
          size="sm"
          className="bg-green-600 text-[0.85em] hover:bg-green-700"
        >
          {isUploading ? "Đang upload..." : "Upload File"}
        </Button>
      </div>

      {/* Retrieve Section */}
      <div className={cn("mb-4 rounded-lg bg-purple-50 p-3")}>
        <h4 className="mb-2 text-[0.9em] font-semibold text-purple-800">
          3. Truy xuất dữ liệu từ IPFS
        </h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={retrieveCid}
            onChange={(e) => setRetrieveCid(e.target.value)}
            placeholder="Nhập CID (VD: Qm...)"
            className="flex-1 rounded-md border px-3 py-2 text-[0.85em]"
          />
          <Button
            onClick={handleRetrieve}
            disabled={isRetrieving}
            size="sm"
            className="bg-purple-600 text-[0.85em] hover:bg-purple-700"
          >
            {isRetrieving ? "..." : "Truy xuất"}
          </Button>
        </div>
        {retrievedData && (
          <pre className="mt-2 max-h-32 overflow-auto rounded bg-white p-2 text-[0.75em]">
            {JSON.stringify(retrievedData, null, 2)}
          </pre>
        )}
      </div>

      {/* Upload History */}
      {uploadResults.length > 0 && (
        <div className={cn("rounded-lg bg-gray-50 p-3")}>
          <h4 className="mb-2 text-[0.9em] font-semibold text-gray-800">
            📋 Lịch sử Upload
          </h4>
          <div className="max-h-40 space-y-2 overflow-auto">
            {uploadResults.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded bg-white p-2 text-[0.8em]"
              >
                <div>
                  <span className="mr-2">
                    {result.type === "json" ? "📄" : "📁"}
                  </span>
                  <span className="font-medium">{result.name}</span>
                </div>
                <a
                  href={getIPFSUrl(result.cid)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {result.cid.substring(0, 12)}...
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
