/**
 * Implements all the validation methods used on FileUploadField.
 */
export class OldFileUploadFieldValidationImplementation extends OldFieldComponentValidationImplementation {
    handleChange(evt: any): void;
    pristine: boolean | undefined;
    focusPristine: boolean | undefined;
    handleClearFile(): void;
    getFileName(value: any): any;
}
import { OldFieldComponentValidationImplementation } from "../FieldComponent/OldFieldComponentValidationImplementation";
