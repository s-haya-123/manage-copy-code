import { objectStoreName } from '$lib/indexedDb/copyCodeDb';

export const dbName = 'ManageCopyCode';
const ver = 1;

const objectStoreNames = [objectStoreName];

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
			for (const objectStoreName of objectStoreNames) {
				if (!db.objectStoreNames.contains(objectStoreName)) {
					db.createObjectStore(objectStoreName, {
						keyPath: 'id',
						autoIncrement: true
					});
				}
			}
		};
	});
};
