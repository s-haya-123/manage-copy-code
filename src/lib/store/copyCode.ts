import { CopyCodeIndexedDB, type CopyCode, type IDBCopyCode } from '$lib/indexedDb/copyCodeDb';
import { CopyCodeTableIndexedDB, type CopyCodeTable } from '$lib/indexedDb/copyCodeTable';
import { prepareDb } from '$lib/indexedDb/prepareDb';
import { writable } from 'svelte/store';

const db = await prepareDb();

const createCopyCodeStore = () => {
	const { subscribe, set, update } = writable<IDBCopyCode[]>([]);

	const copyCodeDb = new CopyCodeIndexedDB(db);
	copyCodeDb.findAll().then((copyCodes) => {
		set(copyCodes);
	});

	return {
		subscribe,
		insert: async (copyCode: CopyCode) => {
			const id = await copyCodeDb.insert(copyCode);
			update((copyCodes) => {
				return [...copyCodes, { ...copyCode, id }];
			});
		}
	};
};
const createCopyCodeTableStore = () => {
	const { subscribe, set, update } = writable<CopyCodeTable[]>([]);

	const copyCodeTableDb = new CopyCodeTableIndexedDB(db);
	copyCodeTableDb.findAll().then((copyCodes) => {
		set(copyCodes);
	});

	return {
		subscribe,
		insert: async (tableName: string) => {
			const id = await copyCodeTableDb.insert({ tableName });
			update((copyCodeTables) => {
				return [...copyCodeTables, { tableName, id }];
			});
		}
	};
};

export const copyCode = createCopyCodeStore();
export const copyCodeTable = createCopyCodeTableStore();
