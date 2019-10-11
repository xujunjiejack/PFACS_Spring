
export enum StudentStatus {
    InProgress,
    Idle,
    Absent,
    Stuck
}

const IN_PROGRESS_TO_STUCK_SECONDS = 120
const STUCK_TO_DISCONNECTED_SECONDS = 300


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
        clearInterval(this.statusTimeout);
      // The bug is that when I switch between report and class overview, the timeout seems to have ended. Hmm. Actually, I don't
      // get the memory management. Does those status rect still. I think yes. Because this is a part of the student object which 
      // gets created in the specific session. 
      // Chain of timeout 
      this.status = StudentStatus.InProgress
      this.startTimer(setStatusFunction)
    }
    // Question, why does this get called multiple times?
    public startTimer (setStatusFunction : any ) : void {
      // if (this.status === StudentStatus.InProgress){
      //   this.statusTimeout = setTimeout(()=>{
      //     setStatusFunction(this.id, StudentStatus.Stuck);  
      //     this.statusTimeout = setTimeout( () =>{
      //       setStatusFunction(this.id, StudentStatus.Idle);
      //     }, STUCK_TO_DISCONNECTED_SECONDS * 1000);
      //   }, 1000 * IN_PROGRESS_TO_STUCK_SECONDS);
      // }
      // else if (this.status === StudentStatus.Stuck){
      //   this.statusTimeout = setTimeout( () =>{
      //     setStatusFunction(this.id, StudentStatus.Idle);
      //   }, STUCK_TO_DISCONNECTED_SECONDS * 1000);
      // }
      if (this.statusTimeout === undefined){
        setStatusFunction(this.id, this.calculateWhetherOnline(this.lastActTime))
        this.statusTimeout = setInterval(()=>{
          console.log("calculating whether online")
          setStatusFunction(this.id, this.calculateWhetherOnline(this.lastActTime))
          this.statusTimeout = undefined
        }, 1000)
      }

    }

    public clearTimeout(){
        if (this.statusTimeout !== undefined)
          clearInterval(this.statusTimeout)
    }

    private calculateWhetherOnline = (lastActiveTime): StudentStatus => {
      let currentDate = new Date()
      let timeStampInSecond = Math.floor(currentDate.getTime()/1000)
      let timeDifference = timeStampInSecond - lastActiveTime
      if (timeDifference < IN_PROGRESS_TO_STUCK_SECONDS){
        return StudentStatus.InProgress
      } else if (timeDifference >= IN_PROGRESS_TO_STUCK_SECONDS && timeDifference < STUCK_TO_DISCONNECTED_SECONDS){
        return StudentStatus.Stuck
      } 
      return StudentStatus.Idle
    }

    // public status() {

    // }
    
}

// export class Student {
//     constructor(public name:string, public status: StudentStatus, public id: string){
//     }
// }
