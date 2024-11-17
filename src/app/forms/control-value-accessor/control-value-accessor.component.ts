import { Component, OnInit } from '@angular/core';
import { TtInputComponent } from "./tt-input/tt-input.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-value-accessor',
  standalone: true,
  imports: [TtInputComponent, ReactiveFormsModule],
  templateUrl: './control-value-accessor.component.html',
  styleUrl: './control-value-accessor.component.scss'
})
export class ControlValueAccessorComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl<string | null>('13221', Validators.required),
    password: new FormControl<string | null>('', Validators.required)
  })

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    })

    this.form.controls.username.disable();
  }
}

// ControlValueAccessor
// 1 задача
// задача обновления при изменении модели измениние view
// 2 задача
// задача обновления при изменении view измениние модели
