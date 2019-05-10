import { NgModule } from '@angular/core';

import { MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule],
  exports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule]
})
export class MaterialModule {}
