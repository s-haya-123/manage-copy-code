import { CopyCodeIndexedDB, type CopyCode, type IDBCopyCode } from '$lib/indexedDb/copyCodeDb';
import { CopyCodeTableIndexedDB, type CopyCodeTable } from '$lib/indexedDb/copyCodeTable';
import { prepareDb } from '$lib/indexedDb/prepareDb';
import { writable } from 'svelte/store';

const db = await prepareDb();

export const createCopyCodeStore = (tableId: number) => {
	const { subscribe, set, update } = writable<IDBCopyCode[]>([]);

	const copyCodeDb = new CopyCodeIndexedDB(db);
	copyCodeDb.findAll(tableId).then((copyCodes) => {
		set(copyCodes.sort((a, b) => -a.id + b.id));
	});

	return {
		subscribe,
		insert: async (copyCode: CopyCode) => {
			const id = await copyCodeDb.insert(copyCode);
			update((copyCodes) => {
				return [{ ...copyCode, id }, ...copyCodes];
			});
		}
	};
};
export const initializeCopyCodeDb = async (copyCode: CopyCode) => {
	const copyCodeDb = new CopyCodeIndexedDB(db);
	copyCodeDb.insert(copyCode);
};
const createCopyCodeTableStore = () => {
	const { subscribe, set, update } = writable<CopyCodeTable[]>([]);

	const copyCodeTableDb = new CopyCodeTableIndexedDB(db);
	copyCodeTableDb.findAll().then((copyCodes) => {
		set(copyCodes.sort((a, b) => -a.id + b.id));
	});

	return {
		subscribe,
		insert: async (tableName: string): Promise<number> => {
			const id = await copyCodeTableDb.insert({ tableName });
			update((copyCodeTables) => {
				return [{ tableName, id }, ...copyCodeTables];
			});
			return id;
		}
	};
};

export const copyCodeTable = createCopyCodeTableStore();
