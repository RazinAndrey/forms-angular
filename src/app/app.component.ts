import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormComponent } from "./forms/reactive-form/reactive-form.component";
import { TemplateDrivenFormsComponent } from "./forms/template-driven-forms/template-driven-forms.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormComponent, TemplateDrivenFormsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'forms-angular';
}
