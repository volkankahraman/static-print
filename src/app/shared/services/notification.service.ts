import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
	providedIn: 'root'
})

export class NotificationService {
	warning(text:string) { 
		Swal.fire({
			text: text,
			icon: "warning",
			confirmButtonText: "Tamam"
		});
	}

	error(text:string) { 
		Swal.fire({
			text: text,
			icon: "error",
			confirmButtonText: "Tamam"
		});
	}

	success(text:string) { 
		Swal.fire({
			text: text,
			icon: "success",
			confirmButtonText: "Tamam"
		});
	}

	confirm(text:string){
		return Swal.fire({
			title: text,
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: "Tamam",
			denyButtonText: "İptal",
		})
	}
}