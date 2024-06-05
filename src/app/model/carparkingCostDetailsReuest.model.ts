export class CarparkingCostDetailsRequest{
    carParkingChargeDesc:any;
    units:any;
    quantity:any;
    rate:any;
    basicAmount:any;

    constructor(modificationChargeDesc:any,units:any,quantity:any,rate:any,basicAmount:any){
     this.carParkingChargeDesc = modificationChargeDesc;
     this.units = units;
     this.quantity = quantity;
     this.rate = rate;
     this.basicAmount = basicAmount;
    }
}