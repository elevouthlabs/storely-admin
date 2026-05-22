type InviteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CloseIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 7L17 17M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="h-4 w-4 text-[#767184]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-[-20px] left-0 inset-0 z-[9999] bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-center justify-center">
        <div className="w-full max-w-[330px] overflow-hidden rounded-[2px] border border-[#e6e4ea] bg-white">
          <div className="flex items-center justify-between border-b border-[#ece9f1] px-4 py-3">
            <h2 className="text-[14px] font-semibold text-[#31283e]">Invite New Admin</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm p-1 text-[#8c8697] transition hover:bg-slate-100 hover:text-[#5d5768]"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="space-y-4 px-4 py-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#4f4a58]">Email Address</label>
              <input
                type="email"
                placeholder="admin@storely.com"
                className="h-[34px] w-full rounded-[8px] border border-[#e7e4eb] bg-white px-3 text-[12px] text-[#4d4758] placeholder:text-[#b0abb8] outline-none focus:border-[#cfc8db]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#4f4a58]">Role</label>
              <div className="relative">
                <select className="h-[34px] w-full appearance-none rounded-[8px] border border-[#e7e4eb] bg-[#f8f8fa] px-3 pr-9 text-[12px] text-[#7d778a] outline-none focus:border-[#cfc8db]">
                  <option>Support@storely.com</option>
                  <option>Super Admin</option>
                  <option>Ops Manager</option>
                  <option>Finance</option>
                  <option>Moderator</option>
                  <option>Growth</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            <div className="rounded-[10px] bg-[#faf1ff] px-3 py-3">
              <p className="text-[11px] text-[#7b5ca2]">An invitation email will be sent with setup instructions.</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-[#ece9f1] px-4 py-4">
            <button
              type="button"
              onClick={onClose}
              className="h-[32px] rounded-[8px] border border-[#ddd9e5] bg-white px-4 text-[12px] font-medium text-[#4f4a58] transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-[32px] rounded-[8px] bg-[#6b21d8] px-4 text-[12px] font-medium text-white transition hover:bg-[#5b1cc0]"
            >
              Send Invitation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
