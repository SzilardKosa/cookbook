import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircleButtonComponent } from './circle-button/circle-button.component';



@NgModule({
  declarations: [
    CircleButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CircleButtonComponent
  ]
})
export class SharedModule { }
