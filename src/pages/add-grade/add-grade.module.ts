import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGradePage } from './add-grade';

@NgModule({
  declarations: [
    AddGradePage,
  ],
  imports: [
    IonicPageModule.forChild(AddGradePage),
  ],
})
export class AddGradePageModule {}
