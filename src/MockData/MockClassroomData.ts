import { IGoogleClassroomInfo } from '../data_structure/GoogleClassroomInfo';

const dummyClassroomData1: IGoogleClassroomInfo = {
    className: "2018 Spring",
    studentName: ["Mike", "Charles", "Anna", "Dan", "Dan", "Dan", "Ben", "Anna"],
    studentNameIDMap: {}
}
  
const dummyClassroomData2: IGoogleClassroomInfo = {
    className: "Fall 2018 Math",
    studentName: ["Anna", "Charles", "Steve", "Jack"],
    studentNameIDMap: {}
}

const dummyClassroomData = [dummyClassroomData1, dummyClassroomData2]

export default dummyClassroomData;
