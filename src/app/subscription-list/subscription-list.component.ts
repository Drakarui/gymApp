import { Component, OnInit } from '@angular/core';
import { SubscribeServiceService } from '../services/subscribe-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from '../models/Subscription';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  subs: Array<Subscription> = new Array<Subscription>()
  isLoading:boolean=true


  constructor(
    private subscriptionService: SubscribeServiceService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show()
     
    

      this.fetchActiveSubs()
    
 
  }
 

  fetchActiveSubs() {
    this.subscriptionService.fetchSubscriptions().subscribe(result => {

      result.docs.forEach(element => {
  
        let sub: Subscription = element.data()
        sub.idSubscription=element.id
        sub.initDate=new Date(element.data().initDate.seconds*1000)
        sub.finalDate=new Date(element.data().finalDate.seconds*1000)
     
        this.subs.push(sub)
       
      });
      this.isLoading=false
      this.spinner.hide()
    })
  }
  
  deleteSub(id:string,i:number){
    this.subscriptionService.deleteSubscription(id).subscribe(result=>{
      Swal.fire({
        title:'Subscription Declined!',
        icon:'warning',
        confirmButtonText:'Ok'
      })
      this.subs.splice(i,1)
    })
  }

}
