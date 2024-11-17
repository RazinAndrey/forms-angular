import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NameValidatorService } from './name-validator.service';

// ф. замыкания - ф. внутри ф. и ф.,
// которая внутри принимает значение у другой функции

// ф. замыкания
function validateStartWith(forbiddenLetter: string) {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? { startsWith: { message: `${forbiddenLetter} Ошибка!` } }
      : null
  }
}

// ф. замыкания
function validateDateRange({ fromControlName, toControlName }: { fromControlName: string, toControlName: string }) {
  return (control: AbstractControl) => { // здесь у нас передается фома
    // получаем контролы
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    // проверка на наличе контролов 
    if (!fromControl || !toControl) return null;

    // далее распарсим дату
    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    // условие, если есть обе даты и дата начала больше даты конца
    if (fromDate && toDate && fromDate > toDate) {
      toControl.setErrors({ dateRange: { message: 'Дата начала не может быть позднее даты конца' } })
      return { dateRange: { message: 'Дата начала не может быть позднее даты конца' } }
    }
    return null;
  }
}


@Component({
  selector: 'app-reactive-forms-validators',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-forms-validators.component.html',
  styleUrl: './reactive-forms-validators.component.scss'
})
export class ReactiveFormsValidatorsComponent {

  nameValidator = inject(NameValidatorService);

  form = new FormGroup({
    // если мы оставим так this.nameValidator.validate, то ф. validate(ссылкой на ф.) будет где-то вызываться и будет потеря контекса 
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      updateOn: 'blur'
    }),
    surname: new FormControl<string>('', [
      Validators.required,
      validateStartWith('Admin')
    ]),
    dateRange: new FormGroup({
      from: new FormControl<string>(''),
      to: new FormControl<string>('')
    }, validateDateRange({ fromControlName: 'from', toControlName: 'to' }))
  })

  onSubmit() {
    console.log(this.form.value);
  }
}
