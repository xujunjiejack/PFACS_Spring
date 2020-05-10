import { ISessionData } from '../App';

const dummyDataStudentIds = ["aee6c2569ea2cf8b88d79a7c36a90015", "403870ae4811bcb15dcdfe7f0c2ad3f8", "a47746fa74fe8f3823d48dfdcbc13618", "e311f1a829e27d2f8a4aef242ad0f71c", "fe185d1d04a7d905953ed7455f0561ca", "3242fe1dc946799d204984d330975432"]
const dummyDataStudentIds2 = ["aee6c2569ea2cf8b88d79a7c36a90015", "403870ae4811bcb15dcdfe7f0c2ad3f8", "a47746fa74fe8f3823d48dfdcbc13618", "fe185d1d04a7d905953ed7455f0561ca", "3242fe1dc946799d204984d330975432"]

const dummyData1: ISessionData = {
    startTime: new Date(2017,7,23,16,50),
    ongoing: true,
    sessionName: "Test Session",
    studentNumber: dummyDataStudentIds.length,
    studentIds: dummyDataStudentIds,
    sessionId: Math.random().toString(36),
    emails: ["jj@gmail", "vishesh@gmail.com", "nathan@gmail.com", "matthew@gmail.com", "reina@gmail.com", "daisy@gmail.com"]
}

const dummyData2: ISessionData = {
    startTime: new Date(2019,6,1,16,50),
    ongoing: false,
    sessionName: "Fall 2019 Math Assessment",
    studentNumber: dummyDataStudentIds.length,
    studentIds: dummyDataStudentIds2,
    sessionId: Math.random().toString(36),
    emails: ["jj@gmail", "vishesh@gmail.com", "nathan@gmail.com", "matthew@gmail.com", "reina@gmail.com"]
}

const dummyData = [dummyData1, dummyData2]

export default dummyData;