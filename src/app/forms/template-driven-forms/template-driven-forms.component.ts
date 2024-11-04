import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NoReactValidators } from './no-react-validator.directive';

@Component({
  selector: 'app-template-driven-forms',
  standalone: true,
  imports: [FormsModule, JsonPipe, NoReactValidators],
  templateUrl: './template-driven-forms.component.html',
})
export class TemplateDrivenFormsComponent {

  person = {
    login: '',
    name: '',
    lastName: '',
    address: {
      street: '',
      building: ''
    },
    stack: ''
  }

  hobby = '';

  onChange(value: string) {
    console.log(value);
    this.person.lastName = value;
  }

  onSubmit(form: NgForm) {
    // window.ng.getDirectives($0);
    console.log(form);
  }
}
