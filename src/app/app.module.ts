import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http"

import { SchedulePage } from '../pages/schedule/schedule';
import { CoursesPage } from '../pages/courses/courses';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CourseDetailPage } from "../pages/course-detail/course-detail"
import { AssignmentFormPage } from "../pages/assignment-form/assignment-form"
import { CourseFormPage } from "../pages/course-form/course-form"
import { AssignmentDetailPage } from "../pages/assignment-detail/assignment-detail"
import { TrackTimePage } from "../pages/track-time/track-time"
import { AddGradePage } from "../pages/add-grade/add-grade"
import { NgCalendarModule } from "ionic2-calendar"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DynamoServiceProvider } from "../providers/dynamo-service/dynamo-service"

import { CourseTimeFormPage } from "../pages/course-time-form/course-time-form"



@NgModule({
  declarations: [
    MyApp,
    CoursesPage,
    CourseDetailPage,
    SchedulePage,
    HomePage,
    TabsPage,
    AssignmentFormPage,
    CourseFormPage,
    AssignmentDetailPage,
    TrackTimePage,
    AddGradePage,
    CourseTimeFormPage,
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CoursesPage,
    CourseDetailPage,
    SchedulePage,
    HomePage,
    TabsPage,
    AssignmentFormPage,
    CourseFormPage,
    AssignmentDetailPage,
    TrackTimePage,
    AddGradePage,
    CourseTimeFormPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DynamoServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
