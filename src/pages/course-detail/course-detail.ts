import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Course } from "../../model/course"
import { Assignment } from "../../model/assignment"
import { AssignmentFormPage } from "../../pages/assignment-form/assignment-form"
import { AssignmentDetailPage } from "../../pages/assignment-detail/assignment-detail"
import { CourseFormPage } from "../../pages/course-form/course-form"

/**
 * Generated class for the CourseDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {

  course: Course;
  assignments: Assignment[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.course = this.navParams.get("course");
    console.log("Course loaded: ", this.course);
    this.assignments = this.course.assignments;
  }

  ionViewDidLoad() {
    if (this.course.grade == null) {
      this.course.grade = 100;
    }
  }

  addAssignment() {
    this.navCtrl.push(AssignmentFormPage, {course: this.course});
  }

  goToAssignment(assignment: Assignment) {
    this.navCtrl.push(AssignmentDetailPage, {assignment: assignment, course: this.course});
  }

  editCourse() {
    this.navCtrl.push(CourseFormPage, {course: this.course});
  }




}
