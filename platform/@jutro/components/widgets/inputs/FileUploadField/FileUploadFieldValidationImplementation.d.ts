/**
 * Implements all the validation methods used on FileUploadField.
 *
 * this.notifyChange now passes and object {fileName, file} instead of just a string.
 * fileName: string name of the file
 * file: object contraining the file data e.g. size (kb)
 *
 */
export class FileUploadFieldValidationImplementation extends FieldComponentValidationImplementation {
    handleChange(evt: any): void;
    pristine: boolean | undefined;
    focusPristine: boolean | undefined;
    handleClearFile(): void;
    getFileName(value: any): any;
}
import { FieldComponentValidationImplementation } from "../FieldComponent/FieldComponentValidationImplementation";
