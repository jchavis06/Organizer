import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Assignment } from "../../model/assignment"
import { AssignmentFormPage } from "../../pages/assignment-form/assignment-form"
import { Course } from "../../model/course"
import { TrackTimePage } from "../../pages/track-time/track-time"
import { AddGradePage } from "../../pages/add-grade/add-grade"

/**
 * Generated class for the AssignmentDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assignment-detail',
  templateUrl: 'assignment-detail.html',
})
export class AssignmentDetailPage {

  assignment: Assignment;
  course: Course;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.assignment = this.navParams.get("assignment");
    this.course = this.navParams.get("course");
    console.log("Assignment detail: ", this.assignment);
    


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentDetailPage');
  }

  editAssignment() {
    this.navCtrl.push(AssignmentFormPage, {assignment: this.assignment});
  }

  trackTime() {
    this.navCtrl.push(TrackTimePage, {assignment: this.assignment});
  }

  addGrade() {
    this.navCtrl.push(AddGradePage, {assignment: this.assignment});
  }

}
