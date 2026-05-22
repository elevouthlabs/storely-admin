import { Link, useParams } from "react-router-dom";
import { TopNavbar } from "../../component/topNavbar";
import { UserQuickActions } from "./utils/UserQuickActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchUserById } from "./userSlice";
import { Icon } from "@iconify/react";

const tabs = ["Profile", "Stores", "Sessions"] as const;

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="rounded-[10px] border border-[#ece9f2] bg-white px-4 py-3">
    <div className="flex items-start justify-between gap-3">
      <span className="text-[10px] font-medium text-[#9893a3]">{label}</span>
      {icon}
    </div>
    <p className="mt-2 text-[20px] font-semibold leading-none text-[#18212f]">{value}</p>
  </div>
);

export const UserDetailsProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isFetchingOne, error } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
  if (userId) {
    dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  if (isFetchingOne) return <p>Loading user...</p>;

  if (error) return <p>{error}</p>;

  if (!user) return <p>User not found</p>;

  return (
    <section className="space-y-4 font-sans">
      <TopNavbar searchPlaceholder="Type to search..." />

      <p className="text-[11px] text-[#878293]" onClick={()=> navigate(-1)}>
        &lt; User Accounts / <span className="font-medium text-[#484056]">{user.fullName}</span>
      </p>

      <div className="rounded-[14px] border border-[#ece9f2] bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3ff]">
               <Icon icon="lucide:user" className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-[30px] font-semibold leading-none text-[#1f1a2c]">{user.fullName}</h1>
              <p className="mt-1 text-[12px] text-[#868192]">{user.email}</p>
              <p className="mt-1 text-[12px] text-[#868192]">{user.phone}</p>
              <p className="mt-1 text-[11px] text-[#a29cab]">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#edf9f0] px-2 py-1 text-[10px] font-semibold text-[#299152]">Active</span>
            <span className="rounded-full bg-[#eef2ff] px-2 py-1 text-[10px] font-semibold text-[#5572c3]">Pro</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-[14px] border border-[#ece9f2] bg-white">
          <div className="flex items-center gap-4 border-b border-[#ece9f2] px-4 pt-3">
            <Link to={`/dashboard/user-management/${userId}`} className="border-b border-[#6b21d8] pb-3 text-[11px] font-medium text-[#352a48]">
              {tabs[0]}
            </Link>
            <Link to={`/dashboard/user-management/${userId}/stores`} className="pb-3 text-[11px] font-medium text-[#928ca0] hover:text-[#6b21d8]">
              {tabs[1]}
            </Link>
            <Link to={`/dashboard/user-management/${userId}/sessions`} className="pb-3 text-[11px] font-medium text-[#928ca0] hover:text-[#6b21d8]">
              {tabs[2]}
            </Link>
          </div>

          <div className="space-y-4 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="KYC Tier" value="Verified" icon={<Icon icon="lucide:shield" />} />
              <StatCard label="BVN Status" value="Verified" icon={<Icon icon="lucide:shield-check" />} />
              <StatCard label="2FA Status" value="Enabled" icon={<Icon icon="lucide:lock" />} />
            </div>

            <div>
              <h2 className="text-[12px] font-semibold text-[#3b3347]">Uploaded Documents</h2>
              <div className="mt-2 rounded-[10px] border border-[#ece9f2] bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ece9f2] bg-[#f8f8fb]">
                      <Icon icon="lucide:user" className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#383146]">National ID Card</p>
                      <p className="text-[10px] text-[#9a95a2]">Uploaded on Jan 15, 2025.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-[6px] border border-[#ddd9e4] bg-white px-3 py-1.5 text-[10px] font-medium text-[#5f596a]"
                  >
                    View Document
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[12px] font-semibold text-[#3b3347]">Payment Methods on File</h2>
              <div className="mt-2 space-y-2">
                <div className="rounded-[10px] border border-[#ece9f2] bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:credit-card" className="h-4 w-4" />
                    <div>
                      <p className="text-[12px] font-medium text-[#383146]">
                        Visa •••• 4242 <span className="ml-1 rounded bg-[#eef2ff] px-1.5 py-0.5 text-[9px] text-[#5572c3]">Default</span>
                      </p>
                      <p className="text-[10px] text-[#9a95a2]">Expires 12/26</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[10px] border border-[#ece9f2] bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:credit-card" className="h-4 w-4" />
                    <div>
                      <p className="text-[12px] font-medium text-[#383146]">Mastercard •••• 5555</p>
                      <p className="text-[10px] text-[#9a95a2]">Expires 08/27</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <UserQuickActions />
      </div>
    </section>
  );
};
