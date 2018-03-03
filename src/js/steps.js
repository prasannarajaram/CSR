// This script is to program steps and step transition 

function steps(stepChange, stepValue){
    let mw = True;
    let pw = recycle = transfer = unload = directTransfer = lineClear = False;

    function mw(){
        let pw_mw = pw == True && stepChange == True && stepValue == 100
        if pw_mw {
            mw = True;
        }
    }

    function pw(){
        let mw_pw = mw == True && stepChange == True && targetStepNo == 101;
        let recycle_pw = recycle == True && LIT805 <= 10;
        if  mw_pw || recycle_pw {
            return pw = True;
	    else {
		return pw = False;
	    }
        }
    }

    function recycle(){
        let pw_recycle = pw == True && stepChange == True && targetStepNo == 102;
        if pw_recycle {
            return recycle = True;
	    else {
		return recycle = False;
	    }
        }
    }

    function transfer(){
        let recycle_transfer = recycle == True && D301readyToReceive == True;
        if recycle_transfer {
            return transfer = True;
	    else {
		return transfer = False;
	    }
        }
    }

    function unload(){
        let pw_unload = pw == True && stepChange == True && targetStepNo == 104;
        let recycle_unload = recycle == True && stepChange == True && targetStepNo == 104;
        if (pw_unload && LIT805 <= 60) || (recycle_unload && LIT805 <= 60){
            return unload = True;
	    else {
		return unload = False;
	    }
        }

    }

    function directTransfer(){
	let pw_directTransfer = pw == True && stepChange == True && targetStepNo == 105;
	if pw_directTransfer{
	    return directTransfer = True;
	    else {
		return directTransfer = False;
	    }
	    
	}
    }

    function lineClear(){
	let pw_lineClear = pw == True && stepChange == True && targetStepNo == 106;
	let recycle_lineClear == recycle == True && stepChange == True && targetStepNo == 106;
	let transfer_lineClear = transfer == True && transferComplete == True;
	if (pw_lineClear || recycle_lineClear || transfer_lineClear){
	    return lineClear = True;
	    else {
		return lineClear = False;
	    }
	}
	
    }
    }
}

// Logic to retain the step variable as they are during every scan of the code to be added
// transferComplete to be calculated
// Create step diagram using boxes and fill bg-color=green for active step
