import { Link, useParams } from "react-router-dom";
import { UserQuickActions } from "./sidepanel/UserQuickActions";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchUserById } from "./userSlice";
import { useUserActions } from "../../hook/useUserActions";
import { Icon } from "@iconify/react";
import { BanAccount } from "./modal/banAccount";
import { WarnAccount } from "./modal/warnAccount";
import { Reset2fa } from "./modal/reser2fa";
import { SendMessage } from "./modal/sendMessage";
import { PasswordReset } from "./modal/passwordReset";
import { DowngradePlan } from "./modal/downgrdePlan";

// type OwnedStore = {
//   id: string;
//   name: string;
//   handle: string;
//   plan: "Pro" | "Growth" | "Starter";
//   gmv: string;
// };

// const stores: OwnedStore[] = [
//   {
//     id: "1",
//     name: "Fashion Hub Lagos",
//     handle: "@fashionhub",
//     plan: "Pro",
//     gmv: "₦2.4M",
//   },
// ];

// const planBadge = (plan: OwnedStore["plan"]) => {
//   if (plan === "Pro") return "bg-[#eef2ff] text-[#5572c3]";
//   if (plan === "Growth") return "bg-[#f3ebff] text-[#7c3aed]";
//   return "bg-[#fff3e6] text-[#b45309]";
// };

export const UserDetailsStore = () => {
  const dispatch = useAppDispatch();
  const [ban, setBan] = useState(false);
  const [warn, setWarn] = useState(false);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState(false);
  const [password, setPassword] = useState(false)
  const [plan, setPlan] = useState(false)

  const { user, isFetchingOne, error } = useAppSelector(
    (state) => state.users
  );
  const { handleBan, 
    handleWarn, 
    handleSendMessage, handleForcePassword, handleChangePlan} = useUserActions(user?.id)

  const { userId } = useParams();

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

      <p className="text-[11px] text-[#878293]">
        &lt; User Accounts / <span className="font-medium text-[#484056]">{user.fullName}</span>
      </p>

      <div className="rounded-[14px] border border-[#ece9f2] bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3ff]">
              <svg className="h-4 w-4 text-[#5572c3]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.8" />
                <path d="M6.5 18C6.5 15.5 8.74 13.5 11.5 13.5H12.5C15.26 13.5 17.5 15.5 17.5 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
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
            <Link to={`/dashboard/user-management/${userId}`} className="pb-3 text-[11px] font-medium text-[#928ca0] hover:text-[#6b21d8]">
              Profile
            </Link>
            <Link to={`/dashboard/user-management/${userId}/stores`} className="border-b border-[#6b21d8] pb-3 text-[11px] font-medium text-[#352a48]">
              Stores
            </Link>
            <Link to={`/dashboard/user-management/${userId}/sessions`} className="pb-3 text-[11px] font-medium text-[#928ca0] hover:text-[#6b21d8]">
              Sessions
            </Link>
          </div>

          <div className="space-y-3 p-4">
            <div>
              <h2 className="text-[12px] font-semibold text-[#2f273b]">Owned Stores</h2>
              <p className="mt-0.5 text-[10px] text-[#a29cab]">2 stores owned by this user</p>
            </div>

            <div className="rounded-[12px] border border-[#ece9f2] bg-white p-4">
                <div  className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f4f2f8]">
                      <Icon icon="lucide:store" className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/dashboard/store-directory/`} className="text-[12px] font-semibold text-[#2f273b] hover:text-[#6b21d8]">
                          {user.business?.name}
                        </Link>
                        {/* <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${planBadge(store.plan)}`}>{store.plan}</span> */}
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold bg-[#eef2ff] text-[#5572c3]`}>{"pro"}</span>
                        <span className="rounded-full bg-[#edf9f0] px-2 py-0.5 text-[9px] font-semibold text-[#299152]">live</span>
                      </div>
                      <p className="mt-0.5 text-[10px] text-[#a29cab]"></p>
                      <p className="mt-2 text-[10px] text-[#6b6576]">
                        <span className="font-semibold text-[#2f273b]">GMV:</span>
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <UserQuickActions 
          actions={{
            ban: () => setBan(true),
            warn: () => setWarn(true),
            reset: () => setReset(true),
            message: () => setMessage(true),
            password: () => setPassword(true),
            plan: () => setPlan(true),
          }}
        />
      </div>
      <BanAccount 
        isOpen={ban} 
        onClose={()=> setBan(false)} 
        fullName={user.fullName}
        email={user.email}
        onBan={handleBan}
        />
      <WarnAccount
        isOpen={warn}
        onClose={()=> setWarn(false)}
        fullName={user.fullName}
        email={user.email} 
        onWarn={handleWarn}
        />
      <Reset2fa isOpen={reset} onClose={()=> setReset(false)} fullName={user.fullName}
        email={user.email} />
      <SendMessage 
      isOpen={message} 
      onClose={()=> setMessage(false)} 
      fullName={user.fullName}
      email={user.email} 
      onSendMessage={handleSendMessage}
      />
      <PasswordReset 
      isOpen={password} 
      onClose={()=> setPassword(false)} 
      fullName={user.fullName}
      email={user.email} 
      onForcePassword={handleForcePassword}
      />
      <DowngradePlan 
        isOpen={plan} 
        onClose={()=> setPlan(false)} 
        fullName={user.fullName}
        onChangePlan={handleChangePlan}
        />  
    </section>
  );
};
