import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}

function getAddresForm() {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    apartment: new FormControl<number | null>(null)
  })
}

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss'
})
export class ReactiveFormsComponent {

  ReceiverType = ReceiverType

  #fb = inject(FormBuilder);

  // 1 вариант
  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>({ value: 'Значение 1', disabled: false }, Validators.required),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>('ЗНАЧЕНИЕ'),
    address: getAddresForm()
  });

  // 2 вариант (модный/молодежный)
  form2 = this.#fb.group({
    type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
    name: this.#fb.nonNullable.control<string>('Lucas'),
    inn: this.#fb.nonNullable.control<string>(''),
    lastName: this.#fb.control<string>(''),
    address: this.#fb.group({
      city: this.#fb.control<string>(''),
      street: this.#fb.control<string>(''),
      building: this.#fb.control<number | null>(null),
      apartment: this.#fb.control<number | null>(null),
    })
  })

  constructor() {
    // слежка за контролом
    this.form.controls.type.valueChanges
      .pipe(
        // отписка
        takeUntilDestroyed()
      )
      .subscribe(val => {

        console.log('type event');
        this.form.controls.inn.clearValidators();

        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
          ])
        }
      })

    // слежка за формой
    this.form.valueChanges.subscribe(val => console.log(val));


    // динамическое заполнение формы patchValue
    this.form.controls.type.patchValue(ReceiverType.LEGAL, {
      emitEvent: false, // чтоб слушатели молчали
      onlySelf: false // затрагиваем подписку ТОЛЬКО на контрол type
    });

    // динамическое заполнение формы setValue
    this.form.setValue({
      type: ReceiverType.PERSON, name: "Andrew", lastName: "Razin", inn: '',
      address: { city: '', street: '', building: 123, apartment: 123 }
    });

    this.form.controls.address.setValue({
      city: '', street: '', building: 123, apartment: 123
    });

    this.form.controls.address.controls.building.setValue(23);

    // disable
    this.form.controls.lastName.disable();
  }

  initialValuie = {
    type: ReceiverType.PERSON, name: "Andrew", lastName: "Razin", inn: '1112223334',
    address: { city: '111', street: '111', building: 123, apartment: 123 }
  };

  onSubmit() {

    // console.log(this.form.valid);
    // console.log(this.form.value);

    /* RESET */

    this.form.reset({
      type: ReceiverType.PERSON,
      name: "Lucas"
    }, {
      onlySelf: true
    });

    this.form.controls.name.reset();

    this.form.reset(this.initialValuie);


    // валидация 
    this.form.markAllAsTouched(); // все контролы Touch
    this.form.updateValueAndValidity(); // пробегается и смотрит всё ли окей

    if (this.form.invalid) return;

    // отличие в том что getRawValue() видит контрол дизейбл
    console.log(this.form.getRawValue());
    console.log(this.form.value);

  }
}