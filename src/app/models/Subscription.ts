export class Subscription{
    idClient:string
    clientName:string
    idPlan:string
    planPrice:number
    planName:string
    totalPrice:number
    initDate:Date
    finalDate:Date
    idSubscription:string

    constructor(data?:Subscription){
        if(data!=null){
            this.idClient=data.idClient
            this.clientName=data.clientName
            this.idPlan=data.idPlan
            this.planPrice=data.planPrice
            this.planName=data.planName
            this.totalPrice=data.totalPrice
            this.initDate=data.initDate
            this.finalDate=data.finalDate
            this.idSubscription=data.idSubscription
        }
        this.idClient=this.idClient
        this.clientName=this.clientName
        this.idPlan=this.idPlan
        this.planPrice=this.planPrice
        this.planName=this.planName
        this.totalPrice=this.totalPrice
        this.initDate=this.initDate
        this.finalDate=this.finalDate
        this.idSubscription=this.idSubscription
    }
}