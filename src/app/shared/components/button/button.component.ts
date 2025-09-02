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

  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  setText(newText: string): void {
    this.text = newText;
  }

  setColor(newColor: 'primary' | 'orange' | 'red'): void {
    this.color = newColor;
  }

}
