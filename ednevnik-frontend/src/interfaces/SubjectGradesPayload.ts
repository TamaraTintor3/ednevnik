export interface SubjectGradesPayload {
    subjectId: number;
    studentId: number;
    date: string;
    grade: number;
    description: string;
    schoolYearId: number;
    finalSubjectGrade: boolean;
}