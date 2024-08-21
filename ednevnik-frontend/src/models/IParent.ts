export default interface IParent {
  parentId: number;
  userFirstName: string;
  userLastName: string;
}

export const initialParent: IParent = {
  parentId: 0,
  userFirstName: "",
  userLastName: "",
};
