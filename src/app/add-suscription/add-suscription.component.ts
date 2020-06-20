import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ClientServiceService } from '../services/client-service.service';
import { PriceServiceService } from '../services/price-service.service';
import { SubscribeServiceService } from '../services/subscribe-service.service';
import { Price } from '../models/Price';
import { Client } from '../models/Client';
import { element } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from '../models/Subscription';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-suscription',
  templateUrl: './add-suscription.component.html',
  styleUrls: ['./add-suscription.component.scss']
})
export class AddSuscriptionComponent implements OnInit {
  dateModelFrom: NgbDateStruct=null
  dateModelTo: NgbDateStruct=null
  clients: Client[] = new Array<Client>()
  plans: Price[] = new Array<Price>()
  planName: String = ""
  clientIdentification: string = ""
  private filteringPlan: Price[] = this.plans
  private filteringClient: Client[] = this.clients
  selectedClient: Client = null
  selectedPlan: Price = null
  constructor(private calendarService: NgbCalendar,
    private clientService: ClientServiceService,
    private planService: PriceServiceService,
    private subscriptionService: SubscribeServiceService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.fetchClientList()
    this.spinner.show()
    this.fetchPlanList()
  }

  fetchClientList() {
    this.clientService.fetchClients().subscribe(result => {
      result.docs.forEach(element => {
        let client: Client = element.data()
        client.id = element.id
        this.clients.push(client)
        this.spinner.hide()
      })
    });
  }
  fetchPlanList() {
    this.planService.fetchPrices().subscribe(result => {
      result.docs.forEach(element => {
        let plan: Price = element.data()
        plan.idPlan = element.id
        this.plans.push(plan)
        this.spinner.hide()
      })
    })
  }
  clientFilter(value: string) {

    this.clients = this.filteringClient.filter(x => {
      return x.identification.includes(value)
    })
  }
  planFilter(value: string) {

    this.plans = this.filteringPlan.filter(x => {
      return x.name.toLowerCase().includes(value.toLowerCase())
    })
  }
  selectPlan(plan: Price) {
    this.selectedPlan = plan as Price
    this.planName = plan.name
    this.plans.length = 0
  }
  selectClient(client: Client) {
    this.selectedClient = client as Client
    this.clientIdentification = client.identification
    this.clients.length = 0
  }
  dismissClient() {
    this.selectedClient = null
    this.clientIdentification = ""
    this.fetchClientList()
  }
  dismissPlan() {
    this.selectedPlan = null
    this.planName = ""
    this.dateModelFrom = null
    this.dateModelTo = null
    this.fetchPlanList()
  }
  addSubscription(){
 
    let newSubscription:Subscription={
      idClient:this.selectedClient.id,
      clientName:this.selectedClient.name +" "+this.selectedClient.lastName,
      idPlan:this.selectedPlan.idPlan,
      planPrice:this.selectedPlan.price,
      planName:this.selectedPlan.name,
      totalPrice:this.selectedPlan.price,
      initDate:new Date(`${this.dateModelFrom.year}-${this.dateModelFrom.month}-${this.dateModelFrom.day}`),
      finalDate:new Date(`${this.dateModelTo.year}-${this.dateModelTo.month}-${this.dateModelTo.day}`),
      idSubscription:""
    }

    this.subscriptionService.postSubscription(newSubscription).subscribe(result=>{
      Swal.fire({
        title:'Subscription Done!!',
        text:'You have suscribed a client to one of our amazing plans',
        icon:'success',
        confirmButtonText:'Awesome!'
      })
      this.dismissClient()
      this.dismissPlan()
    })
  }
  calculateDate() {

    this.dateModelTo={
      year:this.dateModelFrom.year,
      month:this.dateModelFrom.month,
      day:this.dateModelFrom.day
    }
    let num: number = parseInt("" + this.selectedPlan.quantity)
    if (this.selectedPlan.period.toLowerCase().includes("month")) {
      if (this.dateModelFrom.month == 12) {
        this.dateModelTo.year += 1
        this.dateModelTo.month = num
      } else {
        this.dateModelTo.month = this.dateModelTo.month + num
  
      }
    } else if (this.selectedPlan.period.toLowerCase().includes("year")) {
      this.dateModelTo.year += num
     
    } else if (this.selectedPlan.period.toLowerCase().includes("week")) {
      if (this.dateModelFrom.month == 1 || this.dateModelFrom.month == 3 || this.dateModelFrom.month == 5 || this.dateModelFrom.month == 7 || this.dateModelFrom.month == 8 || this.dateModelFrom.month == 10 || this.dateModelFrom.month == 12) {
        if (this.dateModelFrom.day + (num * 7) >= 31) {
          if (this.dateModelFrom.year == 12) {
            this.dateModelTo.year += 1
            this.dateModelTo.day = this.dateModelFrom.day + (num * 7) - 31
            this.dateModelTo.month = 1
          } else {
            this.dateModelTo.day = this.dateModelFrom.day + (num * 7) - 31
            this.dateModelTo.month += 1
          }
        } else {
          this.dateModelTo.day = this.dateModelFrom.day + (num * 7)
        }
      } else if (this.dateModelFrom.month == 2) {
        if (this.dateModelFrom.day + (num * 7) >= 28) {
          if (this.dateModelFrom.year == 12) {
            this.dateModelTo.year += 1
            this.dateModelTo.day = this.dateModelFrom.day + (num * 7) - 28
            this.dateModelTo.month = 1
          } else {
            this.dateModelTo.day = this.dateModelFrom.day + (num * 7) - 28
            this.dateModelTo.month += 1
          }
        } else {
          this.dateModelTo.day = this.dateModelFrom.day + (num * 7)
        }
      } else {

        if (this.dateModelFrom.day + (num * 7) >= 30) {
          if (this.dateModelFrom.year == 12) {
            this.dateModelTo.year += 1
            this.dateModelTo.day = this.dateModelFrom.day + (num * 7) - 30
            this.dateModelTo.month = 1
          } else {
            this.dateModelTo.day = this.dateModelFrom.day + (num * 7) - 30
            this.dateModelTo.month += 1
          }
        } else {
          this.dateModelTo.day = this.dateModelFrom.day + (num * 7)
        }
      }
    } else if (this.selectedPlan.period.toLowerCase().includes('day')) {
      if (this.dateModelFrom.month == 1 || this.dateModelFrom.month == 3 || this.dateModelFrom.month == 5 || this.dateModelFrom.month == 7 || this.dateModelFrom.month == 8 || this.dateModelFrom.month == 10 || this.dateModelFrom.month == 12) {

        if (this.dateModelFrom.day + num >= 31) {
          if (this.dateModelFrom.month == 12) {
            this.dateModelTo.year += 1
            this.dateModelTo.day = this.dateModelFrom.day + num - 31
            this.dateModelTo.month = 1
          } else {
            this.dateModelTo.day = this.dateModelFrom.day + num - 31
            this.dateModelTo.month += 1
          }
        }else{
          this.dateModelTo.day = this.dateModelFrom.day + num
        }
      }else if(this.dateModelFrom.month==2){
        if (this.dateModelFrom.day + num >= 28) {
            this.dateModelTo.day = this.dateModelFrom.day + num - 28
            this.dateModelTo.month += 1
    
        }else{
          this.dateModelTo.day = this.dateModelFrom.day + num
        }
      }else{
        if (this.dateModelFrom.day + num >= 30) {
    
            this.dateModelTo.day = this.dateModelFrom.day + num - 30
            this.dateModelTo.month += 1
          
        }else{
          this.dateModelTo.day = this.dateModelFrom.day + num
        }
      }
    }
  }

}

