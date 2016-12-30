/**
 * Loan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'loans',
  attributes: {
    guid:{
      type: 'string',
      primaryKey: true,
      required: true
    },
    // address
    address:{
      type: 'string'
    },
    city:{
      type: 'string'
    },
    state:{
      type: 'string'
    },
    zip:{
      type:'string'
    },
    // names
    b1_fname:{
      type: 'string'
    },
    b1_lname:{
      type: 'string'
    },
    b2_fname: {
      type:'string'
    },
    b2_lname:{
      type:'string'
    },
    loan_purpose:{
      type:'string'
    },
    loan_term:{
      type:'int'
    },
    occupancy:{
      type:'string'
    },
    int_rate:{
      type:'float'
    },
    currentMilestone:{
      type:'string'
    },
    // lock info
    lockedDate:{
      type:'date',
      default:null
    },
    victoriaLockDate:{
      type:'date',
      default:null
    },
    investorLockDate:{
      type:'date',
      default:null
    },
    investorLockExpDate:{
      type:'date',
      default:null
    },
    //dates
    startedDate:{
      type: 'date',
      default: null
    },
    submittalDate:{
      type: 'date',
      default: null
    },
    fundedDate:{
      type: 'date',
      default: null
    },
    purchasedDate:{
      type:'date',
      default: null
    },
    investor:{
      type:'string'
    },
    investorNum:{
      type:'string'
    },
    loanNum:{
      type: 'string'
    },
    loanAmt:{
      type: 'int'
    },
    processor:{
      type:'string'
    },
    loanOfficer:{
      type:'string'
    },

    //rebate
    baseYSP:{
      type:'float'
    },
    totalAdj:{
      type:'float'
    },
    netYSP:{
      type:'float'
    },
    netSRP:{
      type:'float'
    }

  }
};
