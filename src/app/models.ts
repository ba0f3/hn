
export enum Page {
  FRONT_PAGE = 1,
  ASK_HN,
  SHOW_HN,
  NEWEST
}




export class Item {
  id: number;
  deleted: boolean;
  type: string;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: string[];
  descendants: number;

}
