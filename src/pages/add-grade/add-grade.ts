import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Assignment } from "../../model/assignment"
import { DynamoServiceProvider } from "../../providers/dynamo-service/dynamo-service"
/**
 * Generated class for the AddGradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-grade',
  templateUrl: 'add-grade.html',
})
export class AddGradePage {

  assignment: Assignment;
  grade: string;
  possibleGrades: string[] = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","Fail"]
  comments: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dynamo: DynamoServiceProvider, private alert: AlertController) {
    this.assignment = this.navParams.get("assignment");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGradePage');
  }

  submit() {

    if (this.grade === "") {
      var alert = this.alert.create({
        title: "Whoops",
        message: "You forgot to input the grade.",
        buttons: [{
          text: "Try Again"
        }]
      });

      alert.present();
      return;
    } else {
      this.dynamo.inputGradeForAssignment(this.assignment, this.grade, this.comments).then(res => {
        console.log("Response from adding grade: ", res);
        if (res.status == 200) {
          this.dynamo.inputGradeForCourseAssignment(this.assignment, this.grade, this.comments);
          this.navCtrl.pop();
        } else {
          var alert = this.alert.create({
            title: "Whoops",
            message: "Something went wrong.",
            buttons: [{
              text: "Try Again"
            }]
          });

          alert.present();
        }

      })
    }

  }

}
