export class CourseTime {
    daysOfWeek: string[]; //ex: ["tuesday", "thursday"]
    startHour: number;
    startMinutes: number;
    endHour: number;
    endMinutes: number;
    startTime: any; 
    endTime: any;
    startTimeString:string;
    endTimeString: string;
    /*
        Ex: class is MWF from 9-9:50
        new CourseTime(["monday", "wednesday", "friday"], 9, 0, 9, 50);
    */
    // constructor(daysOfWeek, startHour, startMinutes, endHour, endMinutes) {
    //     this.daysOfWeek = daysOfWeek;
    //     this.startHour = startHour;
    //     this.startMinutes = startMinutes;
    //     this.endHour = endHour;
    //     this.endMinutes = endMinutes;
    // }

    constructor(daysOfWeek, startTime:Date, endTime:Date) {
        this.daysOfWeek = daysOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        console.log("start time: ", startTime);
        //this.getStrings();
    }

    getStrings(){ 
        this.startTimeString = this.startTime;
        this.endTimeString = this.endTime;
    }
}