export enum StudentStatus {
    InProgress,
    Idle,
    Absent,
    Stuck
}

export class Student {
    // constructor(public name:string, public status: StudentStatus, public id: string){
    // },

    constructor(public name:string, public status: StudentStatus, public id: string, public lastActTime: number = 100000){

    }

    public setStatus(newStatus: StudentStatus) {
      this.status = newStatus;
    }
}

// export class Student {
//     constructor(public name:string, public status: StudentStatus, public id: string){
//     }
// }
