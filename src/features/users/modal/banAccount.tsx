import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  email: string;

  onBan: (reason: string, note: string) => Promise<void>;
};

export const BanAccount = ({
  isOpen,
  onClose,
  fullName,
  email,
  onBan,
}: ModalProps) => {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    reason.trim().length > 0 && note.trim().length > 0;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setNote("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBan = async () => {
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      await onBan(reason.trim(), note.trim());

      setReason("");
      setNote("");
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-[-20px] z-[9999] flex items-center justify-center bg-[#28272AB0]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="p-[24px] w-[448px] max-h-[550px] overflow-auto rounded-[10px] border bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <header className="flex items-start justify-between">
          <h2 className="text-[20px] font-semibold text-[#47444B]">
            Ban this account?
          </h2>
          <button onClick={onClose}>&times;</button>
        </header>

        <div className="bg-[#F8FAFC] p-[12px] rounded-[10px] mb-[16px]">
          <h3 className="text-[16px] font-medium">{fullName}</h3>
          <p className="text-[14px] text-[#6A7282]">{email}</p>
        </div>

        <div className="pb-[8px]">
          <label>Reason for ban *</label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="p-3 border rounded-[10px] w-full"
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label>Internal note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-[10px] border rounded-[10px] h-[90px]"
          />
        </div>

       
        <div className="rounded-[10px] p-[17px]
          bg-[#FEF2F2] mt-[16px] border border-[#FFC9C9] flex gap-3">
          <Icon icon="lucide:triangle-alert" className="h-5 w-5 shrink-0 text-[#9F0712]"/>
          <div>
            <p className="text-[#9F0712] text-[14px] leading-[20px] font-medium mb-[4px]">This action will:</p>
            <p className="text-[#9F0712] text-[14px] leading-[20px]">Immediately lock the account</p>
            <p className="text-[#9F0712] text-[14px] leading-[20px]">Suspend all associated stores</p>
            <p className="text-[#9F0712] text-[14px] leading-[20px]">Block all payment methods</p>
            <p className="text-[#9F0712] text-[14px] leading-[20px]">Send notification to user</p>
          </div>
        </div>

        <footer className="flex items-center gap-2 mt-[24px]">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 p-3 border rounded-[10px]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleBan}
            disabled={!canSubmit || submitting}
            className={`w-1/2 p-3 rounded-[10px] text-white transition ${
              canSubmit && !submitting
                ? "bg-[#E7000B] hover:opacity-95"
                : "bg-[#E7000B] opacity-50 cursor-not-allowed"
            }`}
          >
            {submitting ? "Banning..." : "Ban Account"}
          </button>
        </footer>
      </div>
    </div>
  );
};