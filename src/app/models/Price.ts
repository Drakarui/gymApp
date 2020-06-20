import { isDate } from 'util'

export class Price{
    name:string
    price:number
    quantity:number
    period:string
    idPlan:string
    constructor(data?:Price){
        if(data!=null){
            this.name=data.name
            this.price=data.price
            this.quantity=data.quantity
            this.period=data.period
            this.idPlan=data.idPlan
        }
        this.name=this.name
        this.price=this.price
        this.quantity=this.quantity
        this.period=this.period
        this.idPlan=this.idPlan
    }
}