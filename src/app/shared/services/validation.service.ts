import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ValidationService {
    checkEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            return true;
        return (false)
    }

    checkFullName(fullName) {
        if (/^[a-zA-Z ]+$/.test(fullName))
            return true;
        return (false)
    }
}