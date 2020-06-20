import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceServiceService } from '../services/price-service.service';
import { Price } from '../models/Price';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { swalWithBootstrapButtons } from 'src/assets/SwalOption';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})

export class PricesComponent implements OnInit {
  priceForm:FormGroup
  priceList:Price[]=new Array<Price>()
  edit:boolean=false
  toEditId:string=""

  constructor(private fb:FormBuilder,private priceService:PriceServiceService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.priceForm=this.fb.group({
      name:['', Validators.required],
      price:['', Validators.required],
      quantity:['',Validators.required],
      period:['',Validators.required]
    })

  
    this.fetchPlans()
  }

  fetchPlans(){
    this.spinner.show()
    this.priceService.fetchPrices().subscribe(result=>{
      result.docs.forEach(element => {
        let plan:Price=element.data()
        plan.idPlan=element.id
        this.priceList.push(plan)
        this.spinner.hide()
      });
    })
  }
  addPlan(){
    let plan:Price=this.priceForm.value as Price
    this.priceService.postPrice(plan).subscribe(result=>{
      Swal.fire({
        title:'Added!',
        text:'Plan added succesfully',
        icon:'success',
        confirmButtonText:'Ok'
      })
    })
    this.priceList=new Array<Price>()
    this.fetchPlans()
    this.priceForm.reset()
  }
  toEditPlan(plan:Price){
    this.priceForm.setValue({
      name:plan.name,
      price:plan.price,
      quantity:plan.quantity,
      period:plan.period
    })
    this.toEditId=plan.idPlan
    this.edit=true
  }

  editPlan(){
    let plan:Price=this.priceForm.value as Price
    this.priceService.putPrice(this.toEditId,plan).subscribe(result=>{
      Swal.fire({
        title:'Edit performed!',
        text:'Plan had edit succesfully',
        icon:'warning',
        confirmButtonText:'Ok'
      })
    })
    this.priceList=new Array<Price>()
    this.fetchPlans()
    this.priceForm.reset()
  }
  
  deletePlan(plan:Price){
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.priceService.deletePrice(plan.idPlan).subscribe(result=>{
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'This plan has been deleted.',
            'success'
          )
          this.priceList=new Array<Price>()
          this.fetchPlans()
        })
      
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'This plan is safe now',
          'error'
        )
      }
    })
  
  }


}
