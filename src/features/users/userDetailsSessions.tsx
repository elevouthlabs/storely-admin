import { Link, useParams } from "react-router-dom";
import { TopNavbar } from "../../component/topNavbar";
import { UserQuickActions } from "./utils/UserQuickActions";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchSessionById } from "./userSlice";
import { useEffect } from "react";

export const UserDetailsSessions = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch()
  const {session, isFetchingOne, error} = useAppSelector((state)=> state.users)

  useEffect(()=>{
    if(userId){
      dispatch(fetchSessionById(userId))
    }
  }, [dispatch, userId])

  if(isFetchingOne) return <p>Loading users</p>
  if(error) return <p>{error}</p>

  console.log(session);
  
  return (
    <section className="space-y-4 font-sans">
      <TopNavbar searchPlaceholder="Type to search..." />

      <p className="text-[11px] text-[#878293]">
        &lt; User Accounts / <span className="font-medium text-[#484056]">John Adetola</span>
      </p>

      <div className="rounded-[14px] border border-[#ece9f2] bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-semibold leading-none text-[#1f1a2c]">John Adetola</h1>
            <p className="mt-1 text-[12px] text-[#868192]">john@gmail.com</p>
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

          <div className="rounded-[12px] px-4 py-10 text-center text-[11px] text-[#9a95a2]">Sessions content coming soon.</div>
        </div>

        <UserQuickActions />
      </div>
    </section>
  );
};
