import { Course } from "./course"

export class Assignment {
    constructor(courseId, assignmentId, title, type, description, timeNeeded, dueDate) {
        this.courseId = courseId;
        this.assignmentId = assignmentId;
        this.title = title;
        this.type = type;
        this.description = description;
        this.timeNeeded = timeNeeded;
        this.dueDate = dueDate;
    }

    courseId: string;
    assignmentId: string;
    title: string;
    type: string;
    description: string;
    timeNeeded: number; //hours
    timeTracked: number; //hours
    dueDate: string;
    grade: string;
    comments: string;//for grading purposes.



}