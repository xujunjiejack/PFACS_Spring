
export enum StudentStatus {
    InProgress,
    Idle,
    Absent,
    Stuck
}

const IN_PROGRESS_TO_STUCK_SECONDS = 10
const STUCK_TO_DISCONNECTED_SECONDS = 30


export class Student {
    // constructor(public name:string, public status: StudentStatus, public id: string){
    // },
    private statusTimeout?: NodeJS.Timeout;

    constructor(public name:string, public status: StudentStatus, public id: string, 
      public lastActTime: number = 100000, public currentTurn: number= -1, public currentCash: number = 0,
      public currentScreen: string = "", public madeInsight: boolean = false, public successfulInsight: boolean = false, 
      public twoSongsReleased: boolean = true, public upgradedStorage: boolean = true, public barUse: number = 0,
      public lineUse: number = 0, public heatmapUse: number = 0, public barChartUsed: boolean = false, 
      public storageBuys: number = 0, public insightCount: number = 0, public successfulInsightCount: number = 0, 
      public releasedSongCount: number = 0, public collectViews: number = 0){
      
      this.statusReset = this.statusReset.bind(this)
      this.startTimer = this.startTimer.bind(this)
      this.statusTimeout = undefined;
    }
    
    public setStatus(newStatus: StudentStatus) {
      this.status = newStatus;
    }
    
    public statusReset( setStatusFunction : any ){
      
      if (this.statusTimeout !== undefined)
        clearTimeout(this.statusTimeout);
      // The bug is that when I switch between report and class overview, the timeout seems to have ended. Hmm. Actually, I don't
      // get the memory management. Does those status rect still. I think yes. Because this is a part of the student object which 
      // gets created in the specific session. 
      // Chain of timeout 
      this.status = StudentStatus.InProgress
      this.startTimer(setStatusFunction)
    }
    // Question, why does this get called multiple times?
    public startTimer (setStatusFunction : any ) : void {
      if (this.status === StudentStatus.InProgress){
        this.statusTimeout = setTimeout(()=>{
          console.log("stuck");
          console.log(this);
          setStatusFunction(this.id, StudentStatus.Stuck);
          
          this.statusTimeout = setTimeout( () =>{
            console.log("probably idle");
            console.log(this);
            setStatusFunction(this.id, StudentStatus.Idle);
          }, STUCK_TO_DISCONNECTED_SECONDS * 1000);
        }, 1000 * IN_PROGRESS_TO_STUCK_SECONDS);
      }
      else if (this.status === StudentStatus.Stuck){
        this.statusTimeout = setTimeout( () =>{
          setStatusFunction(this.id, StudentStatus.Idle);
        }, STUCK_TO_DISCONNECTED_SECONDS * 1000);
      }
    }

    public clearTimeout(){
        if (this.statusTimeout !== undefined)
          clearTimeout(this.statusTimeout)
    }

    // public status() {

    // }
    
}

// export class Student {
//     constructor(public name:string, public status: StudentStatus, public id: string){
//     }
// }
