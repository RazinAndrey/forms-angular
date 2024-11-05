import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateDrivenFormsComponent } from "./forms/template-driven-forms/template-driven-forms.component";
import { ReactiveFormsComponent } from "./forms/reactive-forms/reactive-forms.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplateDrivenFormsComponent, ReactiveFormsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'forms-angular';
}
