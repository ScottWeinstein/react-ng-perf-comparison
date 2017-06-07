import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <!--<input #tileCount type='number'-->
      <!--(keyup.enter)='setCount(tileCount.value)'-->
      <!--(blur)='setCount(tileCount.value); value="20"'>-->
      Tiles Instantiated: {{ initialQuantity }}
      <group-view [initialQuantity]="initialQuantity"></group-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  initialQuantity: number = 400;

}
