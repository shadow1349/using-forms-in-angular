import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: true } : null;
  };
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <p>
      Your Name Is:
      {{ myName.get('firstName')?.value }} {{ myName.get('lastName')?.value }}
    </p>

    <form [formGroup]="myName">
      <p>
        <input
          type="text"
          formControlName="firstName"
          placeholder="First Name"
        />
        <span
          [style.color]="'red'"
          *ngIf="
            myName.get('firstName')?.touched &&
            myName.get('firstName')?.hasError('required')
          "
        >
          Enter your first name
        </span>
      </p>
      <p>
        <input type="text" formControlName="lastName" placeholder="Last Name" />
        <span
          [style.color]="'red'"
          *ngIf="
            myName.get('lastName')?.touched &&
            myName.get('lastName')?.hasError('forbiddenName')
          "
        >
          You cannot use that name!
        </span>
      </p>
    </form>
  `,
})
export class AppComponent {
  myName = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [forbiddenNameValidator(/doe/gi)]),
  });
}
