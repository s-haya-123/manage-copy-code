export const objectStoreIdentify = {
	name: 'CopyCode',
	index: 'tableId'
};

export type IDBCopyCode = {
	id: number;
	code: string;
	date: string;
	tableId: number;
};

export type CopyCode = Omit<IDBCopyCode, 'id'>;

export class CopyCodeIndexedDB {
	constructor(private db: IDBDatabase) {}
	findAll(tableId: number): Promise<IDBCopyCode[]> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreIdentify.name, 'readonly');
			const objectStore = transaction.objectStore(objectStoreIdentify.name);
			const index = objectStore.index(objectStoreIdentify.index);
			const request = index.getAll(tableId);
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
	find(id: string): Promise<IDBCopyCode> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreIdentify.name, 'readonly');
			const objectStore = transaction.objectStore(objectStoreIdentify.name);
			const request = objectStore.get(id);
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
	insert(reference: CopyCode): Promise<number> {
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
