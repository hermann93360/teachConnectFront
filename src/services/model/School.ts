import {Offer} from "./Offer";

export class School{
  constructor(
    public name: string,
    public login: string,
    public password: string,
    public offer: Offer[]

  ) {
  }
}
