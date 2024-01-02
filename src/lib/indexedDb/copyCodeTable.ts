export const objectStoreIdentify = {
	name: 'CopyCodeTable'
};

export type CopyCodeTable = {
	id: number;
	tableName: string;
};

export type IDBCopyCodeTable = Omit<CopyCodeTable, 'id'>;

export class CopyCodeTableIndexedDB {
	constructor(private db: IDBDatabase) {}
	findAll(): Promise<CopyCodeTable[]> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreIdentify.name, 'readonly');
			const objectStore = transaction.objectStore(objectStoreIdentify.name);
			const request = objectStore.getAll();
			transaction.abort = () => {
				return reject(new Error('TransactionがAbortしました'));
			};

			request.onerror = () => {
				return reject(new Error('読み込みに失敗しました'));
			};
			request.onsuccess = () => {
				return resolve(request.result);
			};
			transaction.commit();
		});
	}
	insert(reference: IDBCopyCodeTable): Promise<number> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreIdentify.name, 'readwrite');
			const objectStore = transaction.objectStore(objectStoreIdentify.name);
			const request = objectStore.put(reference);
			transaction.abort = () => {
				return reject(new Error('TransactionがAbortしました'));
			};
			request.onerror = () => {
				return reject(new Error('保存に失敗しました'));
			};
			request.onsuccess = function () {
				return resolve(this.result as number);
			};
			transaction.commit();
		});
	}
}
