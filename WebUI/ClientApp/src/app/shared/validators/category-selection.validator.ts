import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CategoryDto } from 'src/app/models';

function instanceOfCategory(category: any): category is CategoryDto {
    return !!category // truthy
    && typeof category !== 'string' // Not just string input in the autocomplete
    && 'name' in category; // Has some qualifying property of category type
}

export const CategorySelectionValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
		!instanceOfCategory(control?.value) ? { matchRequired: true } : null;

        