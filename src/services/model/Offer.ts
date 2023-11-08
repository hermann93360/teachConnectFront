import {Teacher} from "./Teacher";

export class Offer{
  constructor(
    public skills: string,
    public constraint: string,
    public period: string,
    public notes: string,
    public teacherInterested: Teacher[]
  ) {
  }
}
