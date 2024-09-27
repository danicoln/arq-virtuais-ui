import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements ControlValueAccessor {
  
  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  private value!: string;

  showMessage(title: string, text: string, icon: SweetAlertIcon = 'info') {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(() => {
      if (this.onTouched) {
        this.onTouched();
      }
    });
  }

  showError(title: string, text: string) {
    this.showMessage(title, text, 'error');
  }

  showConfirmation(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => result.isConfirmed);
  }

  triggerMessage() {
    if (this.value) {
      this.showMessage('Mensagem', this.value);
      if (this.onChange) {
        this.onChange(this.value);
      }
    }
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
}
