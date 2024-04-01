import { ValidatorFn, AbstractControl } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  const regExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

  return (control: AbstractControl) => {
    const isUrlValid = regExp.test(control.value);
    return isUrlValid ? null : { urlInvalid: true };
  };
}
