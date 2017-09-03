import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Assignment } from "../../model/assignment"
import { Course } from "../../model/course"
import { DynamoServiceProvider } from "../../providers/dynamo-service/dynamo-service"
/**
 * Generated class for the TrackTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-track-time',
  templateUrl: 'track-time.html',
})
export class TrackTimePage {

  dateCompleted: string;
  timeTracked: string;
  possibleTimes: number[] = [1,2,3,4,5,6,7,8,9,10];
  assignment: Assignment;
  adjust: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController, private dynamo: DynamoServiceProvider) {
    this.assignment = this.navParams.get("assignment");
    console.log("This assignment: ", this.assignment);
    this.dateCompleted = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackTimePage');
  }

  submit() {
    if (this.timeTracked === "" || this.dateCompleted === "") {
      var alert = this.alert.create({
        title:"Whoops",
        message: "Please fill in all fields.",
        buttons: [{
          text: "Try Again"
        }]
      });
      alert.present();
    } else {
      this.dynamo.trackTimeForAssignment(this.assignment, parseInt(this.timeTracked), this.adjust).then(res => {
        console.log("Resposne from tracking time: ", res);
        if (res.status == 200) {
          this.dynamo.trackTimeForCourseAssignment(this.assignment, parseInt(this.timeTracked), this.adjust);
          this.navCtrl.pop();
        }
      })
    }
  }

}
