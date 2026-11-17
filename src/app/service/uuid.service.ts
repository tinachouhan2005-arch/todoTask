import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  getUuid():string{
    return crypto.randomUUID()
  }
  constructor() { }
}
