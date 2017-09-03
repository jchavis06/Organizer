import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Course } from "../../model/course"
import { DynamoServiceProvider } from "../../providers/dynamo-service/dynamo-service"
import { CourseDetailPage } from "../course-detail/course-detail"
import { CourseFormPage } from "../course-form/course-form"

@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html'
})
export class CoursesPage {

  courses: Course[];

  constructor(public navCtrl: NavController, private dynamo: DynamoServiceProvider) {
      //get the courses from dynamo service provider.
      this.courses = this.dynamo.getCourses();
      console.log("Courses found: ", this.courses);
  }

  ionViewWillDidLoad() {
  }

  goToCourse(course: Course) {
    this.navCtrl.push(CourseDetailPage, {course: course});
  }

  addCourse() { 
    this.navCtrl.push(CourseFormPage);
  }

}
