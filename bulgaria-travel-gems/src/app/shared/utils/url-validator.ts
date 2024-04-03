import { ValidatorFn, AbstractControl } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  const regExp =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;

  return (control: AbstractControl) => {
    const isUrlValid = regExp.test(control.value);
    return isUrlValid ? null : { urlInvalid: true };
  };
}
