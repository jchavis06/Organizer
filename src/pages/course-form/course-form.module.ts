import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseFormPage } from './course-form';

@NgModule({
  declarations: [
    CourseFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseFormPage),
  ],
})
export class CourseFormPageModule {}
