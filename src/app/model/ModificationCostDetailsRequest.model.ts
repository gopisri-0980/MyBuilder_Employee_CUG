export class ModificationCostDetailsRequest{
    modificationChargeDesc:any;
    units:any;
    quantity:any;
    rate:any;
    basicAmount:any;

    constructor(modificationChargeDesc:any,units:any,quantity:any,rate:any,basicAmount:any){
     this.modificationChargeDesc = modificationChargeDesc;
     this.units = units;
     this.quantity = quantity;
     this.rate = rate;
     this.basicAmount = basicAmount;
    }
}