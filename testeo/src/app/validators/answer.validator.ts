import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneCorrectValidator(): ValidatorFn {
  return (formArray: AbstractControl): ValidationErrors | null => {
    const isValid = (formArray as FormArray).controls.some(control => control.value.correct);
    return isValid ? null : { atLeastOneCorrect: true };
  };
}