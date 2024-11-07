import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateDrivenFormsComponent } from "./forms/template-driven-forms/template-driven-forms.component";
import { ReactiveFormsComponent } from "./forms/reactive-forms/reactive-forms.component";
import { DynamicFormsComponent } from "./forms/dynamic-forms/dynamic-forms.component";
import { ControlStatusesComponent } from "./forms/control-statuses/control-statuses.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplateDrivenFormsComponent, ReactiveFormsComponent, DynamicFormsComponent, ControlStatusesComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'forms-angular';
}
