import { useState } from "react";
import { InviteModal } from "./modal/invitemodal";
import { EditModal } from "./modal/editModal";
import {Icon} from "@iconify/react";

type AdminRole = "Super Admin" | "Ops Manager" | "Finance" | "Moderator" | "Growth";
type AdminStatus = "Active" | "Invited" | "Suspended";

type AdminRecord = {
  name: string;
  email: string;
  role: AdminRole;
  lastActive: string;
  status: AdminStatus;
};

const filters: Array<"All" | AdminRole> = ["All", "Super Admin", "Ops Manager", "Finance", "Moderator", "Growth"];

const admins: AdminRecord[] = [
  { name: "John Doe", email: "john@storely.com", role: "Super Admin", lastActive: "2 min ago", status: "Active" },
  { name: "Jane Smith", email: "jane@storely.com", role: "Ops Manager", lastActive: "1 hour ago", status: "Active" },
  { name: "Mike Johnson", email: "mike@storely.com", role: "Moderator", lastActive: "3 hours ago", status: "Active" },
  { name: "Sarah Williams", email: "sarah@storely.com", role: "Finance", lastActive: "45 min ago", status: "Active" },
  { name: "David Brown", email: "david@storely.com", role: "Growth", lastActive: "2 days ago", status: "Invited" },
  { name: "Emma Davis", email: "emma@storely.com", role: "Moderator", lastActive: "1 week ago", status: "Suspended" },
];


const roleStyles: Record<AdminRole, string> = {
  "Super Admin": "bg-[#f3ebff] text-[#7c3aed]",
  "Ops Manager": "bg-[#f3ebff] text-[#7c3aed]",
  Finance: "bg-[#f3ebff] text-[#7c3aed]",
  Moderator: "bg-[#f3ebff] text-[#7c3aed]",
  Growth: "bg-[#f3ebff] text-[#7c3aed]",
};

const statusStyles: Record<AdminStatus, string> = {
  Active: "bg-[#edf9f0] text-[#3a8a57]",
  Invited: "bg-[#eef5ff] text-[#4f7fd8]",
  Suspended: "bg-[#fff1f1] text-[#dc5c5c]",
};

export const AdminSettings = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminRecord | null>(null);

  return (
    <section className="space-y-5 font-sans">
     <header>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-slate-500 cursor-pointer">&lt; Infrastructure / Admin Team Management</p>
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="rounded-lg bg-[#4f1d95] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#40167a]"
          >
            <Icon icon="lucide:users" className="mr-2 h-4 w-4 inline-flex items-center" />
            Invite New Admin
          </button>
        </div>
        <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Admin Team Management</h1>
        <p className="mt-1 text-xs text-slate-500">Manage internal admin users, roles, and permissions</p>
      </header>

      <div className="rounded-[10px] border border-[#ece9f2] bg-white p-[17px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-medium text-[#7f7a88]">Filter by Role:</span>
          {filters.map((filter, index) => {
            const isActive = index === 0;

            return (
              <button
                key={filter}
                type="button"
                className={`rounded-full border px-3 py-[6px] text-[10px] font-medium leading-none transition ${
                  isActive
                    ? "border-[#dbe2ff] bg-[#2f76ff] text-white"
                    : "border-[#e8e7ee] bg-[#f7f8fa] text-[#606575] hover:bg-[#f1f3f7]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#ebe8f0] bg-white">
        <table className="min-w-full table-fixed bg-white">
          <thead>
            <tr className="border-b border-[#000000] bg-[#F8FAFC]">
              <th className="px-[24px] py-[12px] text-left text-[11px] font-medium text-[#8e8999]">Name</th>
              <th className="px-[24px] py-[12px] text-left text-[11px] font-medium text-[#8e8999]">Email</th>
              <th className="px-[24px] py-[12px] text-left text-[11px] font-medium text-[#8e8999]">Role</th>
              <th className="px-[24px] py-[12px] text-left text-[11px] font-medium text-[#8e8999]">Last Active</th>
              <th className="px-[24px] py-[12px] text-left text-[11px] font-medium text-[#8e8999]">Status</th>
              <th className="px-[24px] py-[12px] text-left text-[11px] font-medium text-[#8e8999]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {admins.map((admin, index) => (
              <tr key={admin.email} 
                className={index !== admins.length - 1 ? "border-b border-[#f0edf4] bg-white" : "bg-white"}>
                <td className="px-5 py-5 text-[12px] font-medium text-[#3d3548]">
                  <button
                    type="button"
                    onClick={() => setSelectedAdmin(admin)}
                    className="text-left transition hover:text-[#6b21d8]"
                  >
                    {admin.name}
                  </button>
                </td>
                <td className="px-5 py-5 text-[12px] font-normal text-[#918c99]">{admin.email}</td>
                <td className="px-5 py-5">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none ${roleStyles[admin.role]}`}>
                    {admin.role}
                  </span>
                </td>
                <td className="px-5 py-5 text-[12px] font-normal text-[#918c99]">{admin.lastActive}</td>
                <td className="px-5 py-5">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none ${statusStyles[admin.status]}`}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-5 py-5">
                  <button type="button" className="rounded-md p-1 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
                    <Icon icon="lucide:ellipsis" className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
      <EditModal
        isOpen={selectedAdmin !== null}
        onClose={() => setSelectedAdmin(null)}
        adminName={selectedAdmin?.name ?? ""}
        currentRole={selectedAdmin?.role ?? "Super Admin"}
      />
    </section>
  );
};
