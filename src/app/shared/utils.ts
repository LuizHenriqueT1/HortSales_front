import { AbstractControl, ValidationErrors } from '@angular/forms';

export function trueIndexes(array: boolean[]): number[] {
  return array.map((bool, i) => (bool ? i : -1)).filter((num) => num >= 0);
}
export function profileChecked(array: string[]): boolean[] {

  return [
    array.includes('ADMIN'),
    array.includes('FUNCIONARIO'),
  ];
}
export function someTrue(control: AbstractControl): ValidationErrors | null {
  return !control.value.some((v: boolean) => v) ? { sometrue: true } : null;
}
