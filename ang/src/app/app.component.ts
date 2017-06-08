import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
     Angular Tickets Instantiated: {{ initialQuantity }}
      <group-view [initialQuantity]="initialQuantity"></group-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  initialQuantity: number = 500;
}
