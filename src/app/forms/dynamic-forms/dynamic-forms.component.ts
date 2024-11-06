import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockService, Feature } from './mock.service';
import { KeyValuePipe } from '@angular/common';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}

interface Address {
  city?: string,
  street?: string,
  building?: number,
  apartment?: number
}

function getAddresForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null)
  })
}

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './dynamic-forms.component.html',
  styleUrl: './dynamic-forms.component.scss'
})
export class DynamicFormsComponent {

  mockService = inject(MockService);

  ReceiverType = ReceiverType

  features: Feature[] = []

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddresForm()]),
    // аналог FormGroup, но мы не объявляем имя какое будет у контроллов
    feature: new FormRecord({}),
  });

  constructor() {
    // Addresses
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addresses) => {
        // чистим значение array form // 1 вариант
        while (this.form.controls.addresses.controls.length > 0) {
          this.form.controls.addresses.removeAt(0);
        }
        // this.form.controls.addresses.clear(); // 2 вариант

        // строим новую форму
        for (const address of addresses) {
          this.form.controls.addresses.push(getAddresForm(address));
        }

        // заменить контрол
        // this.form.controls.addresses.setControl(1, getAddresForm(addresses[0]));

        // нужно вязть контрол по определенному индексу
        // console.log(this.form.controls.addresses.at(0));

        // disabled
        // this.form.controls.addresses.disable();
      });


    // Features
    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        // добавляем контрол
        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code, // key
            new FormControl(feature.value) // value
          );
        }
      })

    // слежка за контролом type
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
  }

  onSubmit() {
    console.log(this.form.value);
  }

  addAddress() {
    // this.form.controls.addresses.push(getAddresForm()); // добавление - 1 вариант 
    this.form.controls.addresses.insert(0, getAddresForm()); // добавление - 2 вариант 
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  // ф. сортировки, где не будет менятся порядок элементов
  // сортировка должна вернуть -1, 0, 1 
  // алгоритм quicksort
  sort = () => 0;
}

// задача: с бэка пришел массив из двух адрессов и нужно получив json заполнить форму
// form array - поддерживает все методы как form group и form control  