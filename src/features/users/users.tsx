import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchUsers } from "./userSlice";
import { Icon } from "@iconify/react";


const planOptions = ["Pro", "Growth", "Pro", "Starter", "Pro"] as const;

const planBadgeClass = (plan: (typeof planOptions)[number]) => {
  if (plan === "Pro") return "bg-emerald-100 text-emerald-700";
  if (plan === "Growth") return "bg-violet-100 text-violet-700";
  return "bg-amber-100 text-amber-700";
};

const UserManagement = () => {
  const { users, pagination, isLoading, error } = useAppSelector((state) => state.users);
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1)
  const initials = users?.map((user) => {
  const names = user?.business?.name?.split(" ") || [];
    return names.map((name) => name[0]).join(""); 
  }) || [];
  
 
  useEffect(() => {
    const controller = new AbortController();
    if (token) {
      dispatch(fetchUsers({ page, limit: 10 }));
    }
    return () => {
      controller.abort();
    };
  }, [page, token, dispatch]);
  

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

  const filteredRows = users.filter((row) => {
    // const matchesStatus = statusFilter === "All Status" || row.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      row.business?.name.toLowerCase().includes(query);
     return matchesSearch;
  });

     
  return (
    <section className="space-y-4">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-8 text-slate-900">User Accounts</h1>
          <p className="mt-1 text-sm text-slate-500">Search and filter all seller accounts</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-[#4b0082] px-3 py-2 text-sm font-medium text-white hover:bg-violet-800">
          <Icon icon="lucide:plus" className="h-4 w-4" />
          Export CSV
        </button>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
            <Icon icon="lucide:search" className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by transaction ID, order ID, or customer..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </label>
          <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Verified</button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="px-3 py-3 font-medium">Store</th>
                <th className="px-3 py-3 font-medium">Contact</th>
                <th className="px-3 py-3 font-medium">Plan</th>
                <th className="px-3 py-3 font-medium">KYC Status</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((user, index) => (
                <tr key={user.id} 
                onClick={() => navigate(`/dashboard/user-management/${user.id}`)}
                className="border-b border-slate-100 last:border-none cursor-pointer">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center uppercase rounded-full bg-emerald-700 text-xs font-semibold text-white">
                        {initials[index] || ''}
                      </div>
                      <div>
                        <Link to={`/dashboard/user-management/${user.id}`} className="font-medium text-slate-800 transition hover:text-violet-700">
                          {user.business?.name}
                          <p className="text-xs font-normal">{user.business?.slug} - {user.location || "N/A"}</p>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{user.phone || "N/A"}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${planBadgeClass(
                        planOptions[index % planOptions.length]
                      )}`}
                    >
                      {planOptions[index % planOptions.length]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        user.isVerified === true ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {user.isVerified === true ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">{user.status}</span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs   text-slate-500">
          <p>
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, pagination?.total ?? 0)} of{" "}
            {pagination?.total ?? 0} results
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded border px-3 py-1 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from(
              { length: pagination?.totalPages ?? 0 },
              (_, i) => i + 1
            ).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`rounded px-3 py-1 ${
                  page === pageNum
                    ? "bg-violet-700 text-white"
                    : "border"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={page === pagination?.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default UserManagement;