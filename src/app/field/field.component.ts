import { Component, Input } from '@angular/core';
import { Field } from '../Field';

@Component({
  selector: 'field',
  templateUrl: './field.component.html'
})
export class FieldComponent {
  @Input() data!: Field;

  getIcon() {
    if (this.data.isEmpty) return "";
    if (this.data.isHead) return "🔵";
    if (this.data.isFood) return "🍪";
    return "⚫";
  }
}
