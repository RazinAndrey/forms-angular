import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    standalone: true,
    selector: '[noReact]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: NoReactValidators,
        multi: true // добавляем новую сущность NoReactValidators в NG_VALIDATORS
    }]
})

export class NoReactValidators implements Validator {

    change!: () => void;

    // ф. будет работать тогда, когда будет изменятся значение контрола
    validate(control: AbstractControl): ValidationErrors | null {
        console.log(control.value);
        return control.value?.toLowerCase() === 'react' ? {
            noReact: { message: `Никаких Реактов, ${control.status}` },
        } : null;
    }

    // дает нам зарегать функцию на каждом изменении валидатора
    registerOnValidatorChange(fn: () => void): void {
        this.change = fn;
    };
}