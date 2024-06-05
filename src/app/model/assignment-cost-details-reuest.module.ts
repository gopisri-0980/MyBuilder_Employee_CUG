
export class AssignmentCostDetailsReuestModule {
  assignmentTransferFeeChargeDesc:any;
    units:any;
    quantity:any;
    rate:any;
    basicAmount:any;

    constructor(modificationChargeDesc:any,units:any,quantity:any,rate:any,basicAmount:any){
     this.assignmentTransferFeeChargeDesc = modificationChargeDesc;
     this.units = units;
     this.quantity = quantity;
     this.rate = rate;
     this.basicAmount = basicAmount;
    }
 }
