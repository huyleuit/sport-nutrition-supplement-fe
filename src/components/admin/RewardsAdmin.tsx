"use client";

import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faPlus,
  faEdit,
  faTrash,
  faSpinner,
  faWallet,
  faCheckCircle,
  faExclamationTriangle,
  faImage,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllRewards,
  isContractOwner,
  setRewardCost,
  setRewardMetadata,
  setRewardImage,
  removeReward,
  type RewardWithIPFS,
} from "@/lib/web3";
import { uploadJsonToIPFS, uploadFileToIPFS } from "@/lib/loyaltyApi";
import { isValidCID, type RewardMetadata } from "@/lib/ipfs";

interface RewardFormData {
  id: number;
  name: string;
  description: string;
  cost: number;
  terms: string;
  category: string;
  imageCID: string;
}

const EMPTY_FORM: RewardFormData = {
  id: 0,
  name: "",
  description: "",
  cost: 100,
  terms: "",
  category: "discount",
  imageCID: "",
};

export function RewardsAdmin() {
  const [rewards, setRewards] = useState<RewardWithIPFS[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<RewardFormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [editMode, setEditMode] = useState(false);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài đặt MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        const owner = await isContractOwner();
        setIsOwner(owner);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }, []);

  // Load rewards from blockchain
  const loadRewards = useCallback(async () => {
    try {
      setIsLoading(true);
      const allRewards = await getAllRewards(20);
      setRewards(allRewards);
    } catch (error) {
      console.error("Error loading rewards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check wallet connection on mount
  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          const owner = await isContractOwner();
          setIsOwner(owner);
          loadRewards();
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    checkWallet();
  }, [loadRewards]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cost" || name === "id" ? Number(value) : value,
    }));
  };

  // Open edit form
  const handleEdit = (reward: RewardWithIPFS) => {
    setFormData({
      id: reward.id,
      name: reward.metadata?.name || "",
      description: reward.metadata?.description || "",
      cost: reward.cost,
      terms: reward.metadata?.terms || "",
      category: reward.metadata?.category || "discount",
      imageCID: reward.imageCID || "",
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Open create form
  const handleCreate = () => {
    const nextId =
      rewards.length > 0 ? Math.max(...rewards.map((r) => r.id)) + 1 : 1;
    setFormData({ ...EMPTY_FORM, id: nextId });
    setEditMode(false);
    setShowForm(true);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // 1. Upload metadata to IPFS
      const metadata: RewardMetadata = {
        name: formData.name,
        description: formData.description,
        terms: formData.terms,
        category: formData.category,
        token_cost: formData.cost,
        image_cid: formData.imageCID,
      };

      const ipfsResponse = await uploadJsonToIPFS(
        metadata,
        `reward-${formData.id}`,
      );
      if (!ipfsResponse.success || !ipfsResponse.data?.ipfsCid) {
        throw new Error("Failed to upload metadata to IPFS");
      }
      const metadataCID = ipfsResponse.data.ipfsCid;

      // 2. Set reward cost on blockchain
      await setRewardCost(formData.id, formData.cost);

      // 3. Set metadata CID
      await setRewardMetadata(formData.id, metadataCID);

      // 4. Set image CID if provided
      if (formData.imageCID && isValidCID(formData.imageCID)) {
        await setRewardImage(formData.id, formData.imageCID);
      }

      setSubmitStatus({
        type: "success",
        message: editMode
          ? `Đã cập nhật Reward #${formData.id} thành công!`
          : `Đã tạo Reward #${formData.id} thành công!`,
      });

      // Reload rewards
      await loadRewards();
      setShowForm(false);
      setFormData(EMPTY_FORM);
    } catch (error: any) {
      console.error("Error submitting reward:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi lưu reward",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete reward
  const handleDelete = async (rewardId: number) => {
    if (!confirm(`Bạn có chắc muốn xóa Reward #${rewardId}?`)) return;

    try {
      setIsSubmitting(true);
      await removeReward(rewardId);
      await loadRewards();
      setSubmitStatus({
        type: "success",
        message: `Đã xóa Reward #${rewardId}`,
      });
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Có lỗi khi xóa reward",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Render wallet connection required
  if (!walletConnected) {
    return <WalletRequired onConnect={connectWallet} />;
  }

  // Render not owner warning
  if (!isOwner) {
    return <NotOwnerWarning address={walletAddress} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Rewards</h1>
          <p className="text-sm text-gray-500">
            Tạo và quản lý phần thưởng khách hàng thân thiết
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faPlus} />
          Tạo Reward mới
        </button>
      </div>

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`rounded-lg p-4 ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          <FontAwesomeIcon
            icon={
              submitStatus.type === "success"
                ? faCheckCircle
                : faExclamationTriangle
            }
            className="mr-2"
          />
          {submitStatus.message}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <RewardForm
          formData={formData}
          editMode={editMode}
          isSubmitting={isSubmitting}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Rewards Table */}
      <RewardsTable
        rewards={rewards}
        isSubmitting={isSubmitting}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={loadRewards}
      />
    </div>
  );
}

// Sub-components

function LoadingState() {
  return (
    <div className="flex h-64 items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="h-8 w-8 animate-spin text-blue-600"
      />
      <span className="ml-2 text-gray-600">Đang tải...</span>
    </div>
  );
}

function WalletRequired({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 shadow">
      <FontAwesomeIcon icon={faWallet} className="h-16 w-16 text-gray-400" />
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        Kết nối ví MetaMask
      </h2>
      <p className="mt-2 text-gray-500">
        Vui lòng kết nối ví để quản lý rewards
      </p>
      <button
        onClick={onConnect}
        className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faWallet} />
        Kết nối MetaMask
      </button>
    </div>
  );
}

function NotOwnerWarning({ address }: { address: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-yellow-50 p-12">
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className="h-16 w-16 text-yellow-500"
      />
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        Không có quyền truy cập
      </h2>
      <p className="mt-2 text-gray-600">
        Ví {address.slice(0, 6)}...{address.slice(-4)} không phải owner của
        contract.
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Chỉ owner mới có thể tạo và quản lý rewards.
      </p>
    </div>
  );
}

function RewardForm({
  formData,
  editMode,
  isSubmitting,
  onChange,
  onSubmit,
  onClose,
}: {
  formData: RewardFormData;
  editMode: boolean;
  isSubmitting: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">
          {editMode ? `Chỉnh sửa Reward #${formData.id}` : "Tạo Reward mới"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reward ID
              </label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={onChange}
                disabled={editMode}
                className="mt-1 w-full rounded-lg border p-2 disabled:bg-gray-100"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chi phí (LTT)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border p-2"
                min="1"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên reward
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border p-2"
              placeholder="VD: Voucher giảm 10%"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border p-2"
              rows={2}
              placeholder="Mô tả chi tiết về reward"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Điều kiện áp dụng
            </label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border p-2"
              rows={2}
              placeholder="VD: Áp dụng cho đơn hàng từ 500.000đ"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loại
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border p-2"
              >
                <option value="discount">Giảm giá</option>
                <option value="freebie">Quà tặng</option>
                <option value="shipping">Free ship</option>
                <option value="exclusive">Đặc biệt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loại reward
              </label>
              <p className="mt-1 text-xs text-gray-500">
                Phân loại để dễ quản lý
              </p>
            </div>
          </div>

          {/* Image Upload Section */}
          <ImageUploadField
            imageCID={formData.imageCID}
            onImageUploaded={(cid) =>
              onChange({
                target: { name: "imageCID", value: cid },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            isSubmitting={isSubmitting}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting && (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              )}
              {editMode ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RewardsTable({
  rewards,
  isSubmitting,
  onEdit,
  onDelete,
  onRefresh,
}: {
  rewards: RewardWithIPFS[];
  isSubmitting: boolean;
  onEdit: (reward: RewardWithIPFS) => void;
  onDelete: (rewardId: number) => void;
  onRefresh: () => void;
}) {
  if (rewards.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow">
        <FontAwesomeIcon icon={faGift} className="h-16 w-16 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Chưa có reward nào
        </h3>
        <p className="mt-2 text-gray-500">
          Bấm &quot;Tạo Reward mới&quot; để bắt đầu
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h3 className="font-semibold text-gray-900">
          Danh sách Rewards ({rewards.length})
        </h3>
        <button
          onClick={onRefresh}
          className="text-sm text-blue-600 hover:text-blue-800"
          disabled={isSubmitting}
        >
          Làm mới
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Chi phí
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Metadata CID
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rewards.map((reward) => (
              <tr key={reward.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  #{reward.id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {reward.imageUrl && (
                      <img
                        src={reward.imageUrl}
                        alt={reward.metadata?.name || "Reward"}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {reward.metadata?.name || `Reward #${reward.id}`}
                      </div>
                      <div className="line-clamp-1 text-sm text-gray-500">
                        {reward.metadata?.description || "Không có mô tả"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {reward.cost.toLocaleString()} LTT
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                    {reward.metadata?.category || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {reward.metadataCID ? (
                    <span className="font-mono text-xs">
                      {reward.metadataCID.slice(0, 8)}...
                      {reward.metadataCID.slice(-4)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(reward)}
                    className="mr-2 text-blue-600 hover:text-blue-800"
                    disabled={isSubmitting}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => onDelete(reward.id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={isSubmitting}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Image Upload Component
function ImageUploadField({
  imageCID,
  onImageUploaded,
  isSubmitting,
}: {
  imageCID: string;
  onImageUploaded: (cid: string) => void;
  isSubmitting: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Generate preview URL when CID changes
  useEffect(() => {
    if (imageCID && isValidCID(imageCID)) {
      setPreviewUrl(`https://gateway.pinata.cloud/ipfs/${imageCID}`);
    } else {
      setPreviewUrl("");
    }
  }, [imageCID]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh (PNG, JPG, GIF, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn ảnh dưới 5MB");
      return;
    }

    try {
      setUploading(true);
      const response = await uploadFileToIPFS(file, file.name);
      if (response.success && response.data?.ipfsCid) {
        onImageUploaded(response.data.ipfsCid);
      } else {
        throw new Error(response.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert("Lỗi upload ảnh: " + (error.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Hình ảnh Reward
      </label>
      <div className="mt-2 flex items-start gap-4">
        {/* Preview */}
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faImage} className="h-8 w-8 text-gray-400" />
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-2">
          <label
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 ${
              uploading || isSubmitting ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {uploading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Đang upload...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUpload} />
                Chọn ảnh từ máy
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading || isSubmitting}
              className="hidden"
            />
          </label>

          {/* Manual CID Input */}
          <div className="relative">
            <input
              type="text"
              value={imageCID}
              onChange={(e) => onImageUploaded(e.target.value)}
              placeholder="Hoặc nhập IPFS CID: Qm... / bafy..."
              className="w-full rounded-lg border p-2 text-sm"
              disabled={uploading || isSubmitting}
            />
          </div>

          {imageCID && (
            <p className="text-xs text-green-600">
              ✓ CID: {imageCID.slice(0, 12)}...{imageCID.slice(-6)}
            </p>
          )}
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Hỗ trợ PNG, JPG, GIF. Tối đa 5MB. Ảnh sẽ được lưu trên IPFS.
      </p>
    </div>
  );
}
