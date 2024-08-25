export default interface IMessageRequest {
  title: string;
  text: string;
  date: string;
  isOpened: boolean;
  sender: string;
  parentId: number;
  professorId: number;
}
