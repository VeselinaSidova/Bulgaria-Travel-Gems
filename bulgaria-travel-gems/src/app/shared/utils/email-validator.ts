import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const regExp = new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`);

  return (control: AbstractControl) => {
    const isEmailValid = regExp.test(control.value);
    return isEmailValid ? null : { emailInvalid: true };
  };
}
