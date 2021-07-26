import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatRippleModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatRadioModule
  ],
  exports: [
    MatSidenavModule,
    MatRippleModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
