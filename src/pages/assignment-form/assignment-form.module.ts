import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignmentFormPage } from './assignment-form';

@NgModule({
  declarations: [
    AssignmentFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignmentFormPage),
  ],
})
export class AssignmentFormPageModule {}
