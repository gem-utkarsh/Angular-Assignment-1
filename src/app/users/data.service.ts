import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData:
    {
      username:String,
      gender:String,
      email:String,
      contact: number,
      category:String,
      selectedTechnology:{},
      profilePhoto:String
    }[]=[];

  constructor() { }
}
