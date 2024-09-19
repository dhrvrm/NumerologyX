export const getBaseUrl = () => process.env.NEXT_PUBLIC_BASE_URL;
export const getPhonepeUrl = () => process.env.NEXT_PUBLIC_PHONEPE_API_URL;

export const getProjectID = () => process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
export const getProjectKey = () => process.env.APPWRITE_PROJECT_KEY;
export const getDatabaseID = () => process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const getProductsCollectionID = () =>
	process.env.NEXT_PUBLIC_APPWRITE_STORE_COLLECTION_ID;
export const getUsersCollectionID = () =>
	process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID;
export const getConsulationCollectionID = () =>
	process.env.NEXT_PUBLIC_APPWRITE_CONSULTATION_COLLECTION_ID;
export const getOrdersCollectionID = () =>
	process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID;
export const getOrderItemCollectionID = () =>
	process.env.NEXT_PUBLIC_APPWRITE_ORDER_ITEM_COLLECTION_ID;
export const getSlotsCollectionID = () =>
	process.env.NEXT_PUBLIC_APPWRITE_SLOTS_COLLECTION_ID;
export const getConsultationsCollectionID = () =>
	process.env.NEXT_PUBLIC_APPWRITE_CONSULTATIONS_COLLECTION_ID;
