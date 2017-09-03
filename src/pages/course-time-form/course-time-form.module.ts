import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseTimeFormPage } from './course-time-form';

@NgModule({
  declarations: [
    CourseTimeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseTimeFormPage),
  ],
})
export class CourseTimeFormPageModule {}
