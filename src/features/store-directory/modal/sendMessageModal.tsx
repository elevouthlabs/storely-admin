import { useMemo, useState } from "react";

type SendMessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  storeName: string | undefined;
  storeHandle: string |undefined;

  onSendMessage: (
  subject: string,
  message: string
) => Promise<void>;
};

export const SendMessageModal = ({ isOpen, onClose, storeName, storeHandle, onSendMessage }: SendMessageModalProps) => {

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isSendEnabled = useMemo(() => {
    return  subject.trim().length > 0 && message.trim().length > 0;
  }, [subject, message]);

  const handleClose = () => {
    onClose();
  };

  const handleSendMessage = async () => {
  
    try {
      setSubmitting(true);

      await onSendMessage( subject, message);

      setSubject("");
      setMessage("");
   

      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-[-20px] z-[9999] h-screen w-screen bg-slate-950/65 p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-[400px] rounded-lg border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <h2 className="text-[14px] font-semibold text-slate-900">Message Seller</h2>
            <button
              type="button"
              onClick={handleClose}
              className="rounded px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <div className="space-y-3 px-4 py-3">
            <div className="rounded-md bg-slate-50 px-2.5 py-2">
              <p className="text-sm font-medium text-slate-800">{storeName}</p>
              <p className="text-[11px] text-slate-400">{"@"+storeHandle}</p>
            </div>

            {/* <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-600">Use a template (optional)</label>
              <select
                value={template}
                onChange={(event) => setTemplate(event.target.value)}
                className="h-8 w-full rounded-md border border-slate-200 px-2.5 text-xs text-slate-600 outline-none focus:border-violet-400"
              >
                <option value="">Select template...</option>
                <option value="Order delay update">Order delay update</option>
                <option value="Inventory warning">Inventory warning</option>
                <option value="Compliance reminder">Compliance reminder</option>
              </select>
            </div> */}

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-600">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Enter message subject..."
                className="h-8 w-full rounded-md border border-slate-200 px-2.5 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-600">Message *</label>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value.slice(0, 500))}
                placeholder="Type your message here..."
                rows={4}
                className="min-h-[98px] w-full resize-none rounded-md border border-slate-200 px-2.5 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-violet-400"
              />
              <p className="mt-1 text-right text-[10px] text-slate-400">{message.length}/500 characters</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="h-7 w-1/2 rounded-md border border-slate-200 bg-white px-7 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              type="button"
              className={`h-7 w-1/2 rounded-md px-7 text-[11px] font-semibold text-white ${
                isSendEnabled ?  "bg-[#4B0082] hover:opacity-95"
                    : "bg-[#4B0082] opacity-50 cursor-not-allowed"
              }`}
              disabled={!isSendEnabled}
            >
              {submitting ? "Sending Message..." :  "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
