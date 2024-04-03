import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function enumValidator(enumObj: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const values = Object.values(enumObj);
    if (values.includes(control.value)) {
      return null;
    }
    return { enumInvalid: true };
  };
}
