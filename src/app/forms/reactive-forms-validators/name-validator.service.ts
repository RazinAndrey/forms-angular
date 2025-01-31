import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';

export interface Profile {
  id: number,
  username: string,
  avatarUrl: string | null,
  subscribersAmount: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  stack: string[],
  city: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class NameValidatorService implements AsyncValidator {

  http = inject(HttpClient);

  // async validator
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http.get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts')
      .pipe(
        delay(1000),
        map(users => {
          return users.filter(u => u.firstName === control.value).length > 0
            ? null
            : { nameValid: { message: `Имя должно быть одним из списка: ${users.map(u => u.firstName).join(', ')}` } }
        })
      );
  }
}
