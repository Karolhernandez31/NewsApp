import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false,
})
export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() color: 'primary' | 'orange' | 'red' = 'primary';
  @Input() fill: 'solid' | 'outline' | 'clear' = 'solid';
  @Input() shape: 'round' | 'default' = 'round';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() expand: 'full' | 'block' | undefined = undefined;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  // Iconos
  @Input() iconStart: string = '';
  @Input() iconEnd: string = '';

  // Evento de clic
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {}

  handleClick() {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit();
    }
  }

  // Método para cambiar el estado de loading
  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  // Método para habilitar/deshabilitar
  setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  // Método para cambiar el texto
  setText(newText: string): void {
    this.text = newText;
  }

  // Método para cambiar el color
  setColor(newColor: 'primary' | 'orange' | 'red'): void {
    this.color = newColor;
  }

}
