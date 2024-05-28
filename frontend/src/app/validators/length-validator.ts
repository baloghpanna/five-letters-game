import {AbstractControl, ValidatorFn} from "@angular/forms";

export function lengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = control.value && control.value.length === length;
    return isValid ? null : {
      exactLength: {
        requiredLength: length,
        actualLength: control.value ? control.value.length : 0
      }
    };
  };
}
