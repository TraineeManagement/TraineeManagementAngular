import { AbstractControl, ValidatorFn } from '@angular/forms';

export function conditionalRequired(required: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (required && control.value === '') {
      return { required: true };
    }
    return null;
  };
}
