import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component(
  {
    selector: 'app-root',
    template: `
		Source Repo: <a href="https://github.com/ScottWeinstein/react-ng-perf-comparison"> 
        https://github.com/ScottWeinstein/react-ng-perf-comparison</a>
		<br/>
    Angular Tickets Instantiated: {{ initialQuantity }} | Update Speed: 50ms
		<group-view [initialQuantity]="initialQuantity"></group-view>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class AppComponent {
  initialQuantity: number = 500;
}
