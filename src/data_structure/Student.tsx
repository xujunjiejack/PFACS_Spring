export enum StudentStatus {
    InProgress,
    Idle,
    Absent,
    Stuck
}

export class Student {
    constructor(public name:string, public status: StudentStatus, public id: string){
    }
}

