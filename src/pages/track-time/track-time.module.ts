import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackTimePage } from './track-time';

@NgModule({
  declarations: [
    TrackTimePage,
  ],
  imports: [
    IonicPageModule.forChild(TrackTimePage),
  ],
})
export class TrackTimePageModule {}
