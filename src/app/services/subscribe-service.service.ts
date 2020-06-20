import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import {Observable } from 'rxjs';
import {Subscription} from './../models/Subscription'
@Injectable({
  providedIn: 'root'
})
export class SubscribeServiceService {
  private recieveCollection:AngularFirestoreCollection<Subscription>
  collectionItems:Observable<Subscription[]>
  collectionName:string='subscriptions'
  constructor(private db:AngularFirestore) { 
    this.recieveCollection=this.db.collection<Subscription>(this.collectionName)
    this.collectionItems=this.recieveCollection.valueChanges()
  }

  fetchSubscriptions():Observable<any>{
    return this.db.collection<Subscription>(this.collectionName).get()
  }
  postSubscription(subscription:Subscription):Observable<any>{
    this.recieveCollection.add(subscription)
    return this.collectionItems
  }
  putSubscription(subscription:Subscription, id:string):Observable<any>{
    this.recieveCollection.doc(id).set(subscription)
    return this.collectionItems
  }
  deleteSubscription(id:string):Observable<any>{
   this.recieveCollection.doc(id).delete()
    return this.collectionItems
  }

fetchOne(id:string):Observable<any>{
  let recieveDoc=this.db.doc<Subscription>(this.collectionName+"/"+id)
  let docItem=recieveDoc.valueChanges()
  return docItem
}
}
