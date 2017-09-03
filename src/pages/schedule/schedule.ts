import { Component, ViewChild,  } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';

import { DynamoServiceProvider } from "../../providers/dynamo-service/dynamo-service"
import { Course } from "../../model/course"
import { AssignmentDetailPage } from "../../pages/assignment-detail/assignment-detail"




@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  assignmentSubscription: any;
  isToday: boolean;
  calendarTitle: string;
  eventSource = [];
  loadedBefore: boolean;
  calendar = {
    mode: "month",
    currentDate: new Date(),
    dateFormatter: {
        formatMonthViewDay: function(date:Date) {
            return date.getDate().toString();
        },
        formatMonthViewDayHeader: function(date:Date) {
            return "testMDH";
        },
        formatMonthViewTitle: function(date:Date) {
            return 'testMT';
        },
        formatWeekViewDayHeader: function(date:Date) {
            return "testWDH";
        },
        formatWeekViewTitle: function(date:Date) {
            return "testWT";
        },
        formatWeekViewHourColumn: function(date:Date) {
            return "testWH";
        },
        formatDayViewHourColumn: function(date:Date) {
            return "testDH";
        },
        formatDayViewTitle: function(date:Date) {
            return "testDT";
        }
    }
  };        

  constructor(public navCtrl: NavController, private dynamo: DynamoServiceProvider) {
    //this.loadEvents();
  }

  ionViewWillEnter() {
    this.loadEvents();
  }

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  
      onCurrentDateChanged(event: Date) {
          console.log("Event data: ", event);
      }
  
      onEventSelected(event) {
          console.log("Event data: ", event);
          this.navCtrl.push(AssignmentDetailPage, {assignment: event.assignment});
      }
  
      onRangeChanged(event: { startTime: Date, endTime: Date}) {
  
      }
  
      onTimeSelected(event: {selectedTime: Date, events: any[]}) {
  
      }
  
      onViewTitleChanged(title: string) {
          console.log("New Title: ", title);
          this.calendarTitle = title;
      }

      loadEvents() {
        console.log("Loading events...");
        let that = this;
        this.eventSource = [];
        setTimeout(function() {
          var courses = that.dynamo.getCourses();
          console.log("Courses: ", courses);
          courses.forEach(course => {
            that.loadCourseTimes(course);
            var assignments = course.assignments;
  
            assignments.forEach(assignment => {
              that.eventSource.push({
                title: assignment.title,
                assignment: assignment,
                startTime: new Date(assignment.dueDate),
                endTime: new Date(assignment.dueDate),
                allDay: true
              })
            })
  
            that.myCalendar.loadEvents();
          })
        }, 100);
      }

      loadCourseTimes(course: Course) {
        //TODO
      }

      dayMode(fab: FabContainer) {
        fab.close();
        this.myCalendar.calendarMode = "day"
      }

      weekMode(fab: FabContainer) {
        fab.close()
        this.myCalendar.calendarMode = "week"
      }

      monthMode(fab: FabContainer) {
        fab.close();
        this.myCalendar.calendarMode = "month"
      }
}
