export enum StudentStatus {
    InProgress,
    Idle,
    Absent,
    Stuck
}

export class Student {
    // constructor(public name:string, public status: StudentStatus, public id: string){
    // },
    private statusTimeout: NodeJS.Timeout;

    constructor(public name:string, public status: StudentStatus, public id: string, 
      public lastActTime: number = 100000, public currentTurn: number= -1, public currentCash: number = 0,
      public currentScreen: string = ""){

      this.statusReset = this.statusReset.bind(this);
      this.statusTimeout = setTimeout(() => {
        console.log("timer def");
      }, 0);
    }
    
    public setStatus(newStatus: StudentStatus) {
      this.status = newStatus;
    }
    
    public statusReset( setStatusFunction : any ){
      clearTimeout(this.statusTimeout);
      
      // Chain of timeout 
      this.status = StudentStatus.InProgress
      this.statusTimeout = setTimeout(()=>{
        console.log("stuck");
        console.log(this);
        setStatusFunction(this.id, StudentStatus.Stuck);
        
        this.statusTimeout = setTimeout( () =>{
          console.log("probably idle");
          console.log(this);
          setStatusFunction(this.id, StudentStatus.Idle);
        }, 30 * 1000);
      }, 1000 * 10);
    }

    // public status() {

    // }
    
}

// export class Student {
//     constructor(public name:string, public status: StudentStatus, public id: string){
//     }
// }
