/** Normalize @handle or @handle_4 → canonical store slug for /revenue/store/:storeId */
export function subscriptionStoreSlug(handle: string): string {
  return handle.replace(/^@/, "").split("_")[0];
}

export function subscriptionDetailPath(handle: string): string {
  return `/dashboard/revenue/store/${encodeURIComponent(subscriptionStoreSlug(handle))}`;
}
