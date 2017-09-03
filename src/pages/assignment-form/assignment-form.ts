import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Course } from "../../model/course"
import { DynamoServiceProvider } from "../../providers/dynamo-service/dynamo-service"
import { Assignment } from "../../model/assignment"

/**
 * Generated class for the AssignmentFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assignment-form',
  templateUrl: 'assignment-form.html',
})
export class AssignmentFormPage {
  assignmentId: string;
  assignment: Assignment;
  pageTitle: string = "";
  course: Course;
  title: string = "";
  possibleTypes: string[] = ["Final Exam", "Homework", "Midterm", "Paper", "Quiz", "Reading", "Test"]
  type: string = "";
  description: string = "";
  timeNeeded: number = 0;
  dueDate: string = "";
  possibleGrades: string[] = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","Fail"];
  grade: string;
  comments: string;
  addOrEdit: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private dynamo: DynamoServiceProvider, private alertCtrl: AlertController) {
    this.assignment = this.navParams.get("assignment");
    this.course = this.navParams.get("course");
    if (this.assignment) {
      this.addOrEdit = "Edit";
      this.loadData(this.assignment);
      this.pageTitle = "Edit Assignment";
    } else {
      this.pageTitle = "New Assignment";
      this.addOrEdit = "Add";
      this.dueDate = new Date().toISOString();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentFormPage');
  }

  submitForm() {  

    if(this.title === "" || this.type === "" || this.description === "" || this.timeNeeded == 0 || this.dueDate === "") {
      let alert = this.alertCtrl.create({
        title: "Whoops",
        message: "Make sure you fill out all inputs.",
        buttons: [{
          text: "Try Again"
        }]
      });

      alert.present();
      return;
    }
      //now we need to add this assignment to the courses list of assignments.
      console.log("Submitting assignment");
      var newAssignment = new Assignment((this.course ? this.course.courseId : this.assignment.courseId), this.assignmentId, this.title, this.type, this.description, this.timeNeeded, this.dueDate);

      if (this.grade && this.comments) {
        newAssignment.grade = this.grade;
        newAssignment.comments = this.comments;
      }
      if (this.addOrEdit === "Add") {
        this.dynamo.createAssignment(newAssignment).then(res => {
          console.log("Response from creating assignment: ", res);
          var json = res.json();
          var id = json.assignment.assignmentId;
          newAssignment.assignmentId = id;
          this.dynamo.addAssignmentToCourse(newAssignment);
          this.navCtrl.pop();
        })
      } else {
        this.dynamo.updateAssignment(newAssignment).then(res => {
          console.log("Response from updating assignment: ", res);
          this.dynamo.updateCourseAssignment(newAssignment);
          this.navCtrl.pop();
        })
      }
  }

  loadData(assignment: Assignment) {
    console.log("Loading this assignment: ", assignment);
    this.title = assignment.title ? assignment.title : "";
    this.type = assignment.type ? assignment.type : "";
    this.dueDate = assignment.dueDate ? assignment.dueDate : new Date().toISOString();
    this.description = assignment.description ? assignment.description : "";
    this.timeNeeded = assignment.timeNeeded ? assignment.timeNeeded : 0;
    this.grade = assignment.grade;
    this.comments = assignment.comments;
    this.assignmentId = assignment.assignmentId;
  }

}
