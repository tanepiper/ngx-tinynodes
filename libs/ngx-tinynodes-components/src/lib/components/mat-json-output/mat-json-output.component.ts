import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ngx-tinynodes-mat-json-output',
  templateUrl: 'mat-json-output.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTinynodesMatJsonOutputComponent implements OnChanges {

  @Input()
  json: any;

  @Input()
  expand = true;

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  public toggleExpand() {
    this.expand = !this.expand;
  }

  ngOnChanges(): void {
    this.cd.markForCheck();
  }
}
