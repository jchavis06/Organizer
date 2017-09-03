import { Course } from "../../model/course"
import { User } from "../../model/user"
import { Assignment } from "../../model/assignment"
import { Injectable } from "@angular/core"
import { Http, RequestOptions, Headers } from "@angular/http"
import 'rxjs/add/operator/toPromise';

const dynamoUrl = "https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/";
const usersUrl = dynamoUrl + "users/";
const coursesUrl = dynamoUrl + "courses/";

var headers = new Headers();
headers.append("Content-Type", "application/json");
var options = new RequestOptions({headers: headers});

/*

    (create user) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/users/{userId}/create
    (create course) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/users/{userId}/courses/create
    (create assignment) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/courses/{courseId}/assignments/create
    (get user) GET - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/users/{userId}
    (get user courses) GET - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/users/{userId}/courses
    (get course assignments) GET - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/courses/{courseId}/assignments
    (update course) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/users/{userId}/courses/update
    (update assignment) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/courses/{courseId}/assignments/update
    (add grade to course) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/users/{userId}/courses/grade
    (add grade to assignment) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/courses/{courseId}/assignmnets/grade
    (track time assignment) POST - https://1x9rmq1wtf.execute-api.us-east-1.amazonaws.com/dev/courses/{courseId}/assignments/time

*/
@Injectable()
export class DynamoServiceProvider {

    user: User; //before we can call any functions in this class, we need to get the 
                //user from the database.

    userCourses: Course[];
    
    constructor(private http: Http){
        this.user = new User();
        this.user.userId = "jake1234"
    }

    initializeUser(tokenId: string) {
        this.user = new User();
        this.user.userId = tokenId;
    }

    //dynamo
    createCourse(course: Course) {
        let url = usersUrl + this.user.userId + "/courses/create"
        console.log("Course in dynamo db to add: ", course);
        let body = {
            "title": course.title,
            "startDate": course.courseStartDate,
            "endDate": course.courseEndDate,
            "courseTimes": course.courseTimes,
            "color": course.color
        }

        return this.http.post(url, body, options).toPromise();
    }

    //dynamo
    createAssignment(assignment: Assignment){
        let url = coursesUrl + assignment.courseId + "/assignments/create";

        let body = {
            "title": assignment.title,
            "type": assignment.type,
            "description": assignment.description,
            "timeNeeded": assignment.timeNeeded,
            "dueDate": assignment.dueDate
        }

        return this.http.post(url, body, options).toPromise();
    }


    //local
    addUserCourse(course: Course) {
        var courses = this.userCourses;
        courses.push(course);
    }

    //local
    addAssignmentToCourse(assignment: Assignment) {
        this.userCourses.forEach(course => {
            if (course.courseId = assignment.courseId) {
                course.assignments.push(assignment);
            }
        })
    }

    //dynamo
    updateAssignment(assignment: Assignment) {
        console.log("Assignment to update: ", assignment);
        var url = coursesUrl + assignment.courseId + "/assignments/update";
        let body = {
            "assignmentId": assignment.assignmentId,
            "title": assignment.title,
            "type": assignment.type,
            "timeNeeded": assignment.timeNeeded,
            "dueDate": assignment.dueDate,
            "description": assignment.description,
            "grade": assignment.grade,
            "comments": assignment.comments
        }

        return this.http.post(url, body, options).toPromise();
    }


    //dynamo
    updateCourse(course: Course) {
        var url = usersUrl + this.user.userId + "/courses/update";
        var body = {
            "courseId": course.courseId,
            "title": course.title,
            "courseStartDate": course.courseStartDate,
            "courseEndDate": course.courseEndDate,
            "courseTimes": course.courseTimes,
            "color": course.color
        }

        return this.http.post(url, body, options).toPromise();
    }


    //local
    updateCourseAssignment(assignmentUpdating: Assignment) {
        var courses = this.userCourses;
        courses.forEach(course => {
            if (course.courseId === assignmentUpdating.courseId) {
                var assignments = course.assignments;
                assignments.forEach(assignment => {
                    if (assignment.assignmentId === assignmentUpdating.assignmentId) {
                        assignment.title = assignmentUpdating.title;
                        assignment.type = assignmentUpdating.type;
                        assignment.timeNeeded = assignmentUpdating.timeNeeded;
                        assignment.dueDate = assignmentUpdating.dueDate;
                        assignment.description = assignmentUpdating.description;
                        assignment.grade = assignmentUpdating.grade;
                        assignment.comments = assignmentUpdating.comments;
                    }
                })
            }
        })
    }

    //local
    trackTimeForCourseAssignment(assignmentUpdating: Assignment, timeTracked: number, adjust: boolean) {
        var courses = this.userCourses;
        courses.forEach(course => {
            if (course.courseId === assignmentUpdating.courseId) {
                var assignments = course.assignments;
                assignments.forEach(assignment => {
                    if (assignment.assignmentId === assignmentUpdating.assignmentId) {
                        assignment.timeTracked = assignment.timeTracked + timeTracked;
                        if (adjust) {
                            assignment.timeNeeded = assignment.timeNeeded - timeTracked
                        }
                    }
                })
            }
        })
    }

    //local
    updateUserCourse(courseToUpdate: Course) {
        var courses = this.userCourses;
        courses.forEach(course => {
            if (course.courseId === courseToUpdate.courseId) {
                course.title = courseToUpdate.title;
                course.courseStartDate = courseToUpdate.courseStartDate;
                course.courseEndDate = courseToUpdate.courseEndDate;
                course.courseTimes = courseToUpdate.courseTimes;
                course.color = courseToUpdate.color;
            }
        })
    }


    //dynamo
    inputGradeForAssignment(assignment: Assignment, grade: string, comments: string) {

        let url = coursesUrl + assignment.courseId + "/assignments/grade";

        let body = {
            "assignmentId": assignment.assignmentId,
            "grade": grade,
            "comments": comments
        }

        return this.http.post(url, body, options).toPromise();
    }

    inputGradeForCourseAssignment(assignmentToGrade: Assignment, grade: string, comments: string) {
        var courses = this.userCourses;
        courses.forEach(course => {
            if (course.courseId === assignmentToGrade.courseId) {
                var assignments = course.assignments;
                assignments.forEach(assignment => {
                    if (assignment.assignmentId === assignmentToGrade.assignmentId) {
                        assignment.grade = grade;
                        assignment.comments = comments;
                    }
                })

            }
        })
    }
    //dynamo
    trackTimeForAssignment(assignment: Assignment, timeTracked: number, adjust: boolean){
        let url = coursesUrl + assignment.courseId + "/assignments/time";

        let body = {
            "assignmentId": assignment.assignmentId,
            "timeTracked": timeTracked,
            "adjust": adjust
        }

        return this.http.post(url, body, options).toPromise();
    }

    //dynamo ==> local
    getAndStoreCourses() {
        let url = usersUrl + this.user.userId + "/courses";
        this.http.get(url, options).toPromise().then(res => {
            console.log("Response: ", res);
            var json = res.json();
            var courses = json.courses;
            this.userCourses = courses;
            this.userCourses.forEach(course => {
                this.getAndStoreAssigmentsForCourse(course);
            })

        })
    }

    //dynamo ==> local
    getAndStoreAssigmentsForCourse(course: Course) {
        console.log("Getting this courses assignments: ", course.courseId);
        let url = coursesUrl + course.courseId + "/assignments";
        this.http.get(url, options).toPromise().then(res => {
            var json = res.json();
            var assignments = json.assignments;
            course.assignments = assignments;
        })
    }

    //local
    getCourses() {
        return this.userCourses;
    }

    //local
    getAssignmentsForCourse(courseToGet: Course) {
        this.userCourses.forEach( function(course, index) {
            if (course.courseId = courseToGet.courseId) {
                return course.assignments;
            }
        })

        return [];
    }
}