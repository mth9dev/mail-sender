import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeMailComponent } from './compose-mail/compose-mail.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ComposeMailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class PagesModule { }
