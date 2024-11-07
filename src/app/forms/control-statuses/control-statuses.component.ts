import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-statuses',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './control-statuses.component.html',
  styleUrl: './control-statuses.component.scss'
})
export class ControlStatusesComponent {
  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    surname: new FormControl<string>(''),
  })

  constructor() {

  }

  onSubmit() {
    // проверяем все контролы на invalid
    this.form.markAllAsTouched();
  }
}
