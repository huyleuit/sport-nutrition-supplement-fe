"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getCustomerCertificates,
  getCertificateCount,
  type CustomerCertificate,
} from "@/lib/web3";
import { getIPFSUrl } from "@/lib/ipfs";

interface CertificatesSectionProps {
  account: string | null;
}

export function CertificatesSection({ account }: CertificatesSectionProps) {
  const [certificates, setCertificates] = useState<CustomerCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [certificateCount, setCertificateCount] = useState(0);

  const loadCertificates = async () => {
    if (!account) return;

    setIsLoading(true);
    try {
      const [certs, count] = await Promise.all([
        getCustomerCertificates(account),
        getCertificateCount(account),
      ]);
      setCertificates(certs);
      setCertificateCount(count);
    } catch (error) {
      console.error("Error loading certificates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      loadCertificates();
    } else {
      setCertificates([]);
      setCertificateCount(0);
    }
  }, [account]);

  if (!account) {
    return null;
  }

  return (
    <div className={cn("rounded-[0.625em] bg-white p-[1.5em]")}>
      <div className={cn("mb-[1em] flex items-center justify-between")}>
        <h3 className={cn("text-[1.25em] font-bold text-gray-800")}>
          📜 Chứng nhận của bạn ({certificateCount})
        </h3>
        <Button
          onClick={loadCertificates}
          disabled={isLoading}
          size="sm"
          variant="outline"
          className={cn("text-[0.8em]")}
        >
          {isLoading ? "Đang tải..." : "Làm mới"}
        </Button>
      </div>

      {isLoading && certificates.length === 0 ? (
        <div className={cn("flex items-center justify-center py-8")}>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
        </div>
      ) : certificates.length === 0 ? (
        <div className={cn("text-center py-8")}>
          <p className={cn("text-gray-500 text-[0.9em]")}>
            Bạn chưa có chứng nhận nào. Hãy đổi phần thưởng để nhận chứng nhận!
          </p>
        </div>
      ) : (
        <div className={cn("space-y-3")}>
          {certificates.map((cert, index) => (
            <div
              key={cert.cid || index}
              className={cn(
                "rounded-[0.5em] border border-gray-200 p-[1em]",
                "transition-all hover:shadow-md hover:border-purple-300"
              )}
            >
              <div className={cn("flex items-start justify-between gap-4")}>
                <div className={cn("flex-1")}>
                  {cert.metadata ? (
                    <>
                      <h4 className={cn("font-semibold text-gray-800")}>
                        🎁 {cert.metadata.reward_name}
                      </h4>
                      <p className={cn("text-[0.85em] text-gray-600 mt-1")}>
                        Mã voucher: <code className="bg-gray-100 px-2 py-0.5 rounded">{cert.metadata.voucher_code}</code>
                      </p>
                      <p className={cn("text-[0.8em] text-gray-500 mt-1")}>
                        Ngày đổi: {new Date(cert.metadata.redemption_date).toLocaleDateString("vi-VN")}
                      </p>
                      <p className={cn("text-[0.75em] text-gray-400 mt-1")}>
                        Verification: {cert.metadata.verification_hash}
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 className={cn("font-semibold text-gray-800")}>
                        Chứng nhận #{index + 1}
                      </h4>
                      <p className={cn("text-[0.8em] text-gray-500 mt-1 font-mono")}>
                        CID: {cert.cid.substring(0, 20)}...
                      </p>
                    </>
                  )}
                </div>
                <a
                  href={getIPFSUrl(cert.cid)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-3 py-1.5 rounded-md text-[0.8em] font-medium",
                    "bg-purple-100 text-purple-700 hover:bg-purple-200",
                    "transition-colors"
                  )}
                >
                  Xem trên IPFS
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* IPFS Info */}
      <div className={cn("mt-4 p-3 bg-blue-50 rounded-lg text-[0.8em] text-blue-800")}>
        <p>
          💡 Các chứng nhận được lưu trữ vĩnh viễn trên IPFS - không thể bị xóa hoặc thay đổi.
        </p>
      </div>
    </div>
  );
}

