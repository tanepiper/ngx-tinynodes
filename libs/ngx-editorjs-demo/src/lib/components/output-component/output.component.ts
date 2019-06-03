import { Component, Input } from '@angular/core';

@Component({
  selector: 'nxg-tinynodes-demo-output',
  template: `
    <mat-card class="output-card">
      <mat-card-header>
        <mat-card-title>Output</mat-card-title>
        <mat-card-subtitle>Data from the <code>EditorJS</code> instance</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ngx-json-viewer [json]="json"></ngx-json-viewer>
      </mat-card-content>
    </mat-card>`
})
export class NgxTinynodesOutputComponent {

  @Input()
  json: any;
}
