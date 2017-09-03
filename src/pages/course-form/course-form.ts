import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Course } from "../../model/course"
import { Assignment } from "../../model/assignment"
import { DynamoServiceProvider } from "../../providers/dynamo-service/dynamo-service"
import { CourseTime } from "../../model/course-time";
import { CourseTimeFormPage } from "../../pages/course-time-form/course-time-form"
/**
 * Generated class for the CourseFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-form',
  templateUrl: 'course-form.html',
})
export class CourseFormPage {

  course: Course;
  addOrEditing: string;
  pageTitle: string;
  title: string;
  courseStartDate: string;
  courseEndDate: string;
  courseTimes: CourseTime[] = [];
  color: string;
  possibleDays: string[] = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  possibleColors: string[]=["Red","Blue","Green","Orange", "Yellow", "Purple", "Pink", "Black"]
  courseId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dynamo: DynamoServiceProvider,
          private alertCtrl: AlertController) {
    this.course = this.navParams.get("course");
    if (this.course) {
      this.addOrEditing = "Edit";
      this.pageTitle = "Edit Course";
      this.loadCourse(this.course);
    } else {
      this.addOrEditing = "Add";
      this.pageTitle = "New Course";
      this.courseStartDate = new Date().toISOString();
      this.courseEndDate = new Date().toISOString();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseFormPage');
  }

  // addCourseTime(daysOfWeek, startHour, startMinutes, endHour, endMinutes) {
  //   var courseTime = new CourseTime(daysOfWeek, startHour, startMinutes, endHour, endMinutes);
  //   this.courseTimes.push(courseTime);
  // }

  addCourseTime(daysOfWeek, startTime: Date, endTime: Date) {
    return new Promise((resolve, reject) => {
      console.log("start time before constructor: ", startTime);
      var courseTime = new CourseTime(daysOfWeek, startTime, endTime);
      this.courseTimes.push(courseTime);
      resolve();
    });
  }

  goToAddCourseTime() {
    this.navCtrl.push(CourseTimeFormPage, {"callback": this.addCourseTime.bind(this)});
  }

  loadCourse(course: Course) {
    this.title = course.title;
    this.courseStartDate = new Date(course.courseStartDate).toISOString();
    this.courseEndDate = new Date(course.courseEndDate).toISOString();
    this.courseTimes = course.courseTimes ? course.courseTimes : [];
    this.color = course.color;
    this.courseId = course.courseId;
  }

  submit() {

    if (!this.title || this.title === "" || !this.color || this.color === "") {
      var alert = this.alertCtrl.create({
        title:"Whoops",
        message: "Please fill in all inputs.",
        buttons: [{
          text: "Try Again"
        }]
      });
      alert.present();
    }
    var newCourse = new Course(this.courseId, this.title, this.courseStartDate, this.courseEndDate, this.courseTimes, this.color);
    if (this.addOrEditing === "Add") {
      this.dynamo.createCourse(newCourse).then(res => {
        console.log("Response from creating course: ", res);
        if (res.status == 200) {
          var json = res.json();
          var course = json.course;
          this.dynamo.addUserCourse(course);
          this.navCtrl.pop();
        } else {
          this.displayAlert()
        }
      })
    } else {
      this.dynamo.updateCourse(newCourse).then(res => {
        if (res.status == 200) {
          console.log("Response from updating course: ", res);
          var json = res.json();
          this.dynamo.updateUserCourse(newCourse);
          this.navCtrl.pop();
        } else {
          this.displayAlert();
        }
      })
    }
  }

  displayAlert() {
    let alert = this.alertCtrl.create({
      title: "Whoops",
      message: "Something went wrong.",
      buttons: [{
        text: "Try Again"
      }]
    });

    alert.present();
  }
}
