import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseTime } from "../../model/course-time";
/**
 * Generated class for the AddCourseTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'course-time-form',
  templateUrl: 'course-time-form.html',
})
export class CourseTimeFormPage {

  incomingCourseTime: CourseTime;
  callback: any;
  startHour: number;
  startMinutes: number;
  endHour: number;
  endMinutes: number;
  daysOfWeek: string[];
  weekDays:string[] = ["Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday", "Sunday"]
  title: string;

  startTime: Date;
  endTime: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.incomingCourseTime = this.navParams.get("courseTime");
    if (this.incomingCourseTime) {
      //need to load in the course to the view
      this.loadCourseTime();
      this.title = "Edit Course Time";
    } else {
      this.title = "Add Course Time";
    }
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback");
  }


  submit() { 

    //need to transfer the date objects into numerical values.
    console.log("Type of this thing: ", typeof this.startTime);
    this.callback(this.daysOfWeek, this.startTime, this.endTime).then(() => {
      this.navCtrl.pop();
    })
    // this.callback(this.daysOfWeek, this.startHour, this.startMinutes, this.endHour, this.endMinutes).then(() => {
    //   this.navCtrl.pop();
    // })
  }

  loadCourseTime() {
    var course = this.incomingCourseTime;
    // this.startHour = this.incomingCourseTime.startHour;
    // this.endHour = this.incomingCourseTime.endHour;
    // this.startMinutes = this.incomingCourseTime.startMinutes;
    // this.endMinutes = this.incomingCourseTime.endMinutes;
    this.daysOfWeek = course.daysOfWeek;
    this.startTime = course.startTime;
    this.endTime = course.endTime;
  }

}
