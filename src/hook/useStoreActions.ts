import { useAppDispatch } from "../hook/reduxHook";
import { fetchStoreById, verifyStore, suspendStore, SendMessage } from "../features/store-directory/storeDirectory";

// useStoreActions.ts
export const useStoreActions = (storeId?: string) => {
  const dispatch = useAppDispatch();

  const handleVerify = async () => {
    if (!storeId) return;


    await dispatch(verifyStore(storeId)).unwrap();
    dispatch(fetchStoreById(storeId));
  };

  const handleSuspend = async (
    reason: string,
    noteToSeller: string
  ) => {
    if (!storeId) return;

    await dispatch(
      suspendStore({
        storeId,
        reason,
        noteToSeller,
      })
    ).unwrap();
  };

  const handleSendMessage = async (
    subject: string,
    message: string
  ) => {
    if (!storeId) return;

    await dispatch(
      SendMessage({
        storeId,
        subject,
        message,
      })
    ).unwrap();
  };

  return {
    handleVerify,
    handleSuspend,
    handleSendMessage,
  };
};