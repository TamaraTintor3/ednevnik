export const initialGradeArray: IGrade[] = [];

export const initialGrade : IGrade = {
  subjectGradesId : 0,
  grade : 0,
    date : '',
    description : ''
}



  export default interface IGrade {
    subjectGradesId : number;
    grade : number;
    date : string;
    description : string;
  }
