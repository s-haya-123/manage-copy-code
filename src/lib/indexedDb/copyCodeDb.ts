export const objectStoreName = 'CopyCode';

export type IDBCopyCode = {
	id: string;
	code: string;
	date: string;
	tableId: string;
};

export type CopyCode = Omit<IDBCopyCode, 'id'>;

export class CopyCodeIndexedDB {
	constructor(private db: IDBDatabase) {}
	findAll(): Promise<IDBCopyCode[]> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreName, 'readonly');
			const objectStore = transaction.objectStore(objectStoreName);
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
	find(id: string): Promise<IDBCopyCode> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreName, 'readonly');
			const objectStore = transaction.objectStore(objectStoreName);
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
	insert(reference: CopyCode): Promise<string> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreName, 'readwrite');
			const objectStore = transaction.objectStore(objectStoreName);
			const request = objectStore.put(reference);
			transaction.abort = () => {
				return reject(new Error('TransactionがAbortしました'));
			};
			request.onerror = () => {
				return reject(new Error('保存に失敗しました'));
			};
			request.onsuccess = function () {
				return resolve(this.result as string);
			};
			transaction.commit();
		});
	}
}
