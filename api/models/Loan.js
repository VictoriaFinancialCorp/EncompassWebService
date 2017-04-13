/**
 * Loan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'loans',
  migrate: 'safe',
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
      type:'integer'
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
    currentStatus:{
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
    investorLockType:{
      type:'string',
      default: null
    },

    //milestone dates
    startedDate:{
      type: 'date',
      default: null
    },
    submittalDate:{
      type: 'date',
      default: null
    },
    CTCDate:{
      type:'date',
      default: null
    },
    docsDrawnDate:{
      type:'date',
      default: null
    },
    docsSignedDate:{
      type:'date',
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
    completionDate:{
      type: 'date',
      default: null
    },
    //milestone comments
    startedComments:{
      type: 'text',
      default: null
    },
    processingComments:{
      type: 'text',
      default: null
    },
    submittalComments:{
      type: 'text',
      default: null
    },
    conditionalComments:{
      type: 'text',
      default: null
    },
    resubmittedComments:{
      type: 'text',
      default: null
    },
    approvalComments:{
      type: 'text',
      default: null
    },
    CTCComments:{
      type: 'text',
      default: null
    },
    readyForDocComments:{
      type: 'text',
      default: null
    },
    docsDrawnComments:{
      type: 'text',
      default: null
    },
    docSignedComments:{
      type: 'text',
      default: null
    },
    fundedComments:{
      type: 'text',
      default: null
    },
    purchasedComments:{
      type: 'text',
      default: null
    },
    shippedComments:{
      type: 'text',
      default: null
    },
    completionComments:{
      type: 'text',
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
      type: 'string'
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
    },

    //servicing
    servicingStatus:{
      type:'string'
    },
    firstPaymentDate:{
      type:'date',
      default: null
    },
    firstPaymentDateInvestor:{
      type:'date',
      default: null
    },
    mortgageStatementLastPrinted:{
      type:'date',
      default: null
    },
    paymentsCollected:{
      type:'integer',
      default: 0
    },
    loanFolder:{
      type:'string'
    },
    nextPayment: function(){
      var moment = require('moment');
      if(this.fundedDate != null && this.firstPaymentDateInvestor == null) {
        if(moment.duration(moment().add(1, 'months').set('date', 1).diff(moment() ) ).asDays() > 15 ) {
          if(moment().set('date', 1) < moment(this.firstPaymentDate)){
            return this.firstPaymentDate
          }else{
            return moment().set('date', 1).format('MM/DD/YY')
          }
        }else{
          return moment().add(1, 'months').set('date', 1).format('MM/DD/YY')
        }
      }else if(this.fundedDate != null){
        return moment(this.firstPaymentDateInvestor).format('MM/DD/YY')
      }else{ //file not funded
         return null;
      }
    }

  },

};
