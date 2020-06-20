import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Price } from '../models/Price';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceServiceService {
  collectionName:string='pricing'
  private recieveCollection: AngularFirestoreCollection<Price>;
  collectionItems:Observable<Price[]>
  constructor(private db:AngularFirestore) {
    this.recieveCollection=this.db.collection<Price>(this.collectionName)
    this.collectionItems=this.recieveCollection.valueChanges()
   }

   fetchPrices():Observable<any>{
    return this.db.collection<Price>(this.collectionName).get()
   }
   postPrice(price:Price):Observable<any>{
     this.recieveCollection.add(price)
     return this.collectionItems
   }
   putPrice(id:string, price:Price):Observable<any>{
    this.recieveCollection.doc(id).set(price)
    return this.collectionItems
   }
   deletePrice(id:string):Observable<any>{
     this.recieveCollection.doc(id).delete()
     return this.collectionItems
   }
   fetchPrice(id:string):Observable<any>{
    let recievePrice=this.db.doc<Price>(this.collectionName+"/"+id)
    let docItem=recievePrice.valueChanges()
    return docItem
   }

}
