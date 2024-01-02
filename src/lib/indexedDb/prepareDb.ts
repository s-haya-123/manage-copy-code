import { objectStoreIdentify as copyCodeObjectStore } from '$lib/indexedDb/copyCodeDb';
import { objectStoreIdentify as copyCodeTableObjectStore } from '$lib/indexedDb/copyCodeTable';

export const dbName = 'ManageCopyCode';
const ver = 1;

const objectStores: {
	name: string;
	index?: string;
}[] = [copyCodeObjectStore, copyCodeTableObjectStore];

export const prepareDb = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const dbRequest = indexedDB.open(dbName, ver);
		dbRequest.onsuccess = () => {
			resolve(dbRequest.result);
		};
		dbRequest.onerror = (e) => {
			reject(e);
		};
		dbRequest.onupgradeneeded = function () {
			const db = dbRequest.result;
			for (const objectStore of objectStores) {
				if (!db.objectStoreNames.contains(objectStore.name)) {
					const store = db.createObjectStore(objectStore.name, {
						keyPath: 'id',
						autoIncrement: true
					});
					if (objectStore.index) {
						store.createIndex(objectStore.index, objectStore.index, { unique: false });
					}
				}
			}
		};
	});
};
