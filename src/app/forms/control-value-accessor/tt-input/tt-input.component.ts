import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-tt-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TtInputComponent),
      multi: true,
    },
  ],
})
export class TtInputComponent implements ControlValueAccessor {
  type = input<'text' | 'password'>('text');
  placeholder = input<string>('');

  disabled = signal<boolean>(false);

  value: string | null = null;

  onChange: any;
  onTouched: any;

  // изменения из модели во view
  writeValue(value: string | null): void {
    this.value = value;
  }

  // изменения от view к модели
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // проверять тронули или не тронули контрол 
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // сделать не кликабельным контрол
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onModelChange(value: string | null) {
    this.onChange(value);
  }
}
