import { useAppDispatch } from "../hook/reduxHook";
import {banUSer, warnUser, sendMessage, forcePassword, changlePlan} from "../features/users/userSlice";

// useStoreActions.ts
export const useUserActions = (userId?: string) => {
  const dispatch = useAppDispatch();

   const handleBan = async (reason: string, noteToSeller: string) => {
        try {
        if (!userId) return;
            const result = await dispatch(
                banUSer({
                userId: userId,
                reason,
                noteToSeller,
                })
            ).unwrap();

        console.log("SUSPEND API RESULT:", result);
        console.log("STORE ID RECEIVED:", userId);
        } catch (error) {
        console.error(error);
        }
    }
    const handleWarn = async (message: string) => {
        try {
        if (!userId) return;

        const result = await dispatch(
            warnUser({
            userId: userId,
            message,
            })
        ).unwrap();

        console.log("SUSPEND API RESULT:", result);

        // setWarn(false);
        } catch (error) {
        console.error(error);
        }
    }
    const handleSendMessage = async (subject: string, message: string) => {
        try {
        if (!userId) return;
        const result = await dispatch(
            sendMessage({
            userId: userId,
            subject,
            message
            })
        ).unwrap();

        console.log("SUSPEND API RESULT:", result);
        console.log("STORE ID RECEIVED:", userId);
        } catch (error) {
        console.error(error);
        }
    }

    const handleForcePassword = async (reason:string) => {
        try {
        if (!userId) return;
        const result = await dispatch(
            forcePassword({
            userId: userId,
            reason
            })
        ).unwrap();

        console.log("SUSPEND API RESULT:", result);
        console.log("STORE ID RECEIVED:", userId);
        } catch (error) {
        console.error(error);
        }
    }
    const handleChangePlan = async (plan:string) => {
        try {
        if (!userId) return;
        const result = await dispatch(
            changlePlan({
            userId: userId,
            plan
            })
        ).unwrap();

        console.log("SUSPEND API RESULT:", result);
        console.log("STORE ID RECEIVED:", userId);
        } catch (error) {
        console.error(error);
        }
    }

  return {
    handleBan,
    handleWarn,
    handleSendMessage,
    handleForcePassword,
    handleChangePlan
   
  };
};