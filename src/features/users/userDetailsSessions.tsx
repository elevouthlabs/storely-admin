import { Link, useParams } from "react-router-dom";
import { UserQuickActions } from "./sidepanel/UserQuickActions";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchSessionById, fetchUserById } from "./userSlice";
import { useEffect, useState } from "react";
import { useUserActions } from "../../hook/useUserActions";
import { BanAccount } from "./modal/banAccount";
import { WarnAccount } from "./modal/warnAccount";
import { Reset2fa } from "./modal/reser2fa";
import { SendMessage } from "./modal/sendMessage";
import { PasswordReset } from "./modal/passwordReset";
import { DowngradePlan } from "./modal/downgrdePlan";

const UserDetailsSessions = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch()
  const [ban, setBan] = useState(false);
  const [warn, setWarn] = useState(false);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState(false);
  const [password, setPassword] = useState(false)
  const [plan, setPlan] = useState(false)
  const {data, user, isFetchingOne, error} = useAppSelector((state)=> state.users)

  console.log(data);
  


  const { handleBan, 
    handleWarn, 
    handleSendMessage, handleForcePassword, handleChangePlan} = useUserActions(userId)

  useEffect(()=>{
    if(!userId) return;
  
      dispatch(fetchUserById(userId));
      dispatch(fetchSessionById(userId));
 
  }, [dispatch, userId])

  if(isFetchingOne) return <p>Loading users</p>
  if(error) return <p>{error}</p>
  if (!user) return <p>User not found</p>;
  
  return (
    <section className="space-y-4 font-sans">
  
      <p className="text-[11px] text-[#878293]">
        &lt; User Accounts / <span className="font-medium text-[#484056]">{user?.fullName}</span>
      </p>

      <div className="rounded-[14px] border border-[#ece9f2] bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-semibold leading-none text-[#1f1a2c]">{user?.fullName}</h1>
            <p className="mt-1 text-[12px] text-[#868192]">{user?.email}</p>
          </div>
          <span className="rounded-full bg-[#edf9f0] px-2 py-1 text-[10px] font-semibold text-[#299152]">Active</span>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-[14px] border border-[#ece9f2] bg-white">
          <div className="flex items-center gap-4 border-b border-[#ece9f2] px-4 pt-3">
            <Link to={`/dashboard/user-management/${userId}`} className="pb-3 text-[11px] font-medium text-[#928ca0] hover:text-[#6b21d8]">
              Profile
            </Link>
            <Link to={`/dashboard/user-management/${userId}/stores`} className="pb-3 text-[11px] font-medium text-[#928ca0] hover:text-[#6b21d8]">
              Stores
            </Link>
            <Link to={`/dashboard/user-management/${userId}/sessions`} className="border-b border-[#6b21d8] pb-3 text-[11px] font-medium text-[#352a48]">
              Sessions
            </Link>
          </div>

          <div className="p-3 rounded-xl bg-white">
            <div className="overflow-x-auto bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs text-slate-500 bg-white">
                  <tr className="border-b border-slate-200">
                     <th className="px-3 py-3 font-medium">Date</th>
                     <th className="px-3 py-3 font-medium">Device</th>
                     <th className="px-3 py-3 font-medium">IP Address</th>
                     <th className="px-3 py-3 font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sessions?.map((sess) => (
                    <tr key={sess.id} className="border-b border-slate-100 last:border-none">
                      <td className="px-3 py-3 text-slate-700">{sess.createdAt}</td>
                      <td className="px-3 py-3 text-slate-700">{sess.device}</td>
                      <td className="px-3 py-3 text-slate-700">{sess.ip}</td>
                      <td className="px-3 py-3">{sess.location}</td>  
                    </tr>
                  ))}
                </tbody>
              </table>
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
              fullName={user?.fullName}
              email={user?.email}
              onBan={handleBan}
              />
            <WarnAccount
              isOpen={warn}
              onClose={()=> setWarn(false)}
              fullName={user?.fullName}
              email={user?.email} 
              onWarn={handleWarn}
              />
            <Reset2fa isOpen={reset} onClose={()=> setReset(false)} fullName={user?.fullName}
              email={user?.email} />
            <SendMessage 
            isOpen={message} 
            onClose={()=> setMessage(false)} 
            fullName={user?.fullName}
            email={user?.email} 
            onSendMessage={handleSendMessage}
            />
            <PasswordReset 
            isOpen={password} 
            onClose={()=> setPassword(false)} 
            fullName={user?.fullName}
            email={user?.email} 
            onForcePassword={handleForcePassword}
            />
            <DowngradePlan 
              isOpen={plan} 
              onClose={()=> setPlan(false)} 
              fullName={user?.fullName}
              onChangePlan={handleChangePlan}
            />  
    </section>
  );
};

export default UserDetailsSessions;
