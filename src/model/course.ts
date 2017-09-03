import { Assignment } from "./assignment";
import { CourseTime } from "./course-time";

export class Course {

    constructor(courseId, title, startDate, endDate, courseTimes, color) {
        this.courseId = courseId;
        this.title = title;
        this.courseStartDate = startDate;
        this.courseEndDate = endDate;
        this.courseTimes = courseTimes;
        this.color = color;
    }

    courseId: string;
    userId: string;
    title: string;
    color: string; //to organize classes by
    grade: number;//grade in the overall class
    assignments: Assignment[];


    courseStartDate: string;
    courseEndDate: string;
    courseTimes: CourseTime[];
}