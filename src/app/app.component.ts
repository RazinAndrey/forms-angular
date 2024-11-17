import { Component } from '@angular/core';
import { ControlValueAccessorComponent } from './forms/control-value-accessor/control-value-accessor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ControlValueAccessorComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'forms-angular';
}
