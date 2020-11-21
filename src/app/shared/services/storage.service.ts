import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Upload } from '../models/upload';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	constructor(private storage: AngularFireStorage) {}

	uploadFile(document: Upload, filePath: string) {
		const file = document.file;
		const task = this.storage.upload(filePath, file);

		return task;
	}
}
