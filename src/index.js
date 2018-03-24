	
	let Step, MW, PW;
	let EV850  = true;
	let LIT805 = 39;
	let TT806  = 40;
	let PT810  = 0;
	let PT852  = 0;
	let JT809  = 0;
	let NC701TemperatureSP = 55;
	let LSH802 = LIT805 >= 85;
	let PIT804 = 2.19;

	window.onload = function(){
	 	init();
	};

	function init(){
		Step = "MW";
		document.getElementById('activestep').innerHTML = Step;
		return Step;
	}

	// Calculations
	// 1. Temperature set point limits
	// 2. Operator ready to unload 
	function TempSP(){
		NC701TemperatureSP = document.getElementById("TempSP").value;
		if (isNaN(NC701TemperatureSP) || NC701TemperatureSP < 35 || NC701TemperatureSP > 55) {
        	alert ("NC-701 Temperature Set point not within 35 to 55 degC range");
    	}
    }
	
	function OpReadyToUnload(){
		readyToUnload = document.getElementById("OpReadyToUnload");
	}
	function recycleTransferPump(){
		let mp516aStepPermissive = (Step == "Recycle" || Step == "Transfer");
		let mp516aProcessPermissive = (Step == "Recycle" && (ABV812 || ABV813) ) || ( Step == "Transfer" && ABV815 && ABV850) && ( LIT805 >= 10 );
		mp516a = mp516aProcessPermissive && mp516aStepPermissive;
		document.getElementById('mp516a').innerHTML = mp516a;
		return mp516a;
	}

	function unloadDirectTransferPump(){
		let mp516tStepPermissive = ( Step == "Unload" || Step == "DirectTransfer");
		let mp516tProcessPermissive = [( Step == "Unload" && ABV851 && ABV815 && ABV813 ) || ( Step == "DirectTransfer" && ABV851 && ABV850)];
		let mp516tTrip = !LSH802;
		mp516t = mp516tStepPermissive && mp516tProcessPermissive && mp516tTrip && readyToUnload;
		document.getElementById('mp516t').innerHTML = mp516t;
		return mp516t;
	}
	
	function mp516aDischargeValve(){
		let EV811StepPermissive = ( Step == "Transfer" || Step == "Recycle" );
		let EV811ProcessPermissive = true; // UPDATE if any process permissive.
		EV811 = EV811StepPermissive && EV811ProcessPermissive;
		document.getElementById('EV811').innerHTML = EV811;
		return EV811;
	}

	function E12516CExchInletValve(){
		let ABV812StepPermissive = ( Step == "Recycle" || Step == "Unload" );
		let ABV812ProcessPermissive = TT806 > NC701TemperatureSP; // UPDATE if any process permissive.
		ABV812 = ABV812StepPermissive && ABV812ProcessPermissive;
		document.getElementById('ABV812').innerHTML = ABV812;
		return ABV812;
	}

	function E12516HExchInletValve(){
		let ABV813StepPermissive = ( Step == "Recycle" || Step == "Unload");
		let ABV813ProcessPermissive = TT806 < NC701TemperatureSP; // UPDATE if any process permissive.
		ABV813 = ABV813StepPermissive && ABV813ProcessPermissive;
		document.getElementById('ABV813').innerHTML = ABV813;
		return ABV813;
	}

	function E12516HStmInletValve(){
		let ABV814StepPermissive = ( Step == "Recycle" );
		let ABV814ProcessPermissive = TT806 < NC701TemperatureSP; // UPDATE if any process permissive.
		ABV814 = ABV814StepPermissive && ABV814ProcessPermissive;
		document.getElementById('ABV814').innerHTML = ABV814;
		return ABV814;
	}

	function D301TransferValve(){
		let ABV815StepPermissive = ( Step == "Transfer" || Step == "Unload" );
		let ABV815ProcessPermissive = true; // UPDATE if any process permissive.
		ABV815 = ABV815StepPermissive && ABV815ProcessPermissive;
		document.getElementById('ABV815').innerHTML = ABV815;
		return ABV815;
	}

	function N2SupplyValve(){
		let ABV816StepPermissive = ( Step == "LineClear" );
		let ABV816ProcessPermissive = true; // UPDATE if any process permissive.
		ABV816 = ABV816StepPermissive && ABV816ProcessPermissive;
		document.getElementById('ABV816').innerHTML = ABV816;
		return ABV816;
	}

	function mp516tDischargeValve(){
		let ABV851StepPermissive = ( Step == "DirectTransfer" || Step == "Unload" );
		let ABV851ProcessPermissive = true; // UPDATE if any process permissive.
		ABV851 = ABV851StepPermissive && ABV851ProcessPermissive;
		document.getElementById('ABV851').innerHTML = ABV851;
		return ABV851;
	}

	function d301InletValve(){
		let ABV850StepPermissive = ( Step == "LineClear" || Step == "DirectTransfer" );
		let ABV850ProcessPermissive = true; // UPDATE if any process permissive.
		ABV850 = ABV850StepPermissive && ABV850ProcessPermissive;
		document.getElementById('ABV850').innerHTML = ABV850;
		if (ABV850){
			document.getElementById('imgABV850').src = "valveOpen.png";
		} else {
			document.getElementById('imgABV850').src = "valveClose.png";
		}
		return ABV850;
	}

	function OpReadyToUnload(){
		readyToUnload = document.getElementById("readytounload").checked;
	}

	function LIT805Sim(){
		if ( Step == "Unload" && mp516t ){
			LIT805 = LIT805 + 0.56789;
		}else if ( Step == "Transfer" && mp516a ){
			LIT805 = LIT805 - 0.56789;
		}
		document.getElementById('LIT805').innerHTML = LIT805.toFixed(2);
		return LIT805;
	}

	// The range of PT810 is 200 psig, however the max pump discharge pressure is only
	// 150 psig. The calculation shown below will generate a first order response curve
	// for pressure build up after pump starts

	// If the pump is off then pressure will fall at 50% per second
	function PT810Sim(){
		if ( mp516a ) {
			PT810 = ((150 - PT810) * 0.3) + PT810; 
		} else {
			PT810 = PT810 * 0.5;
			if (PT810 < 1)
				PT810 = 0;
		}
		document.getElementById('PT810').innerHTML = PT810.toFixed(2);
		return PT810;
	}

	function JT809Sim(){
		if ( mp516a ) {
			JT809 = ((25 - JT809) * 0.5) + JT809; 
		} else {
			JT809 = JT809 * 0.5;
			if (JT809 < 1)
				JT809 = 0;
		}
		document.getElementById('JT809').innerHTML = JT809.toFixed(2);
		return JT809;
	}
	
	function PT852Sim(){
		if ( mp516t ) {
			PT852 = ((150 - PT852) * 0.3) + PT852; 
		} else {
			PT852 = PT852 * 0.5;
			if (PT852 < 1)
				PT852 = 0;
		}
		document.getElementById('PT852').innerHTML = PT852.toFixed(2);
		return PT852;
	}

	function PIT804Sim(){
		if ( PIT804 > 2 && PIT804 < 2.5){
			PIT804 = PIT804 + (PIT804 * 0.001);
			}else if (PIT804 > 2.5){
				PIT804 = PIT804 - (PIT804 * 0.001);
			}
		document.getElementById('PIT804').innerHTML = PIT804.toFixed(3);
		return PIT804;
	}

	function TT807Sim(){
        if ( Step == "Recycle" && ABV812 ){
            TT807 = TT808 + (TT808 * 0.01);
        } else if ( Step == "Recycle" && ABV813 ){
            TT807 = TT808 - (TT808 * 0.01);
        }
        document.getElementById('TT807').innerHTML = TT807.toFixed(2);
		return TT807;
    }

	function TT808Sim(){
        TT808 = TT806;
        document.getElementById('TT808').innerHTML = TT808.toFixed(2);
		return TT808;
    }

	function TT806Sim(){
        
        document.getElementById('TT806').innerHTML = TT806.toFixed(2);
		return TT806;
	}

	function MaintWait(){
		if (Step == "PW"){
			Step = "MW";
			
		} else {
			alert("Error: Can't go to Maintenance Wait from current step");
		}
		return Step;
	}
	function ProcessWait(){
		if (Step == "MW" || Step == "Recycle" || Step == "LineClear"){
			Step = "PW";
		} else {
			alert("Error: Can't go to Process Wait from current step");
		}
		return Step;
	}

	function Recycle(){
		if ((Step == "PW" || Step == "Unload" || Step == "LineClear") && LIT805 >= 20){
			Step = "Recycle";
			
		} else {
			alert("Error: Can't go to Recycle from current step");
		}
		return Step;
	}
	function Transfer(){
		if (Step == "Recycle" && LIT805 >= 40){
			Step = "Transfer";
			
		} else {
			alert("Transfer possible only if level > 40 %");
		}
		return Step;
	}
	function Unload(){
		if ((Step == "Recycle" || Step == "PW" ) && LIT805 <= 40){
			Step = "Unload";
			
		} else {
			alert("Error: Can't go to Unload from current step");
		}
		return Step;
	}
	function DirectTransfer(){
		if (Step == "PW" ){
			Step = "DirectTransfer";
			
		} else {
			alert("Error: Can't go to DirectTransfer from current step");
		}
		return Step;		
	}
	function LineClear(){
		if (Step == "PW" || Step == "Recycle" || Step == "Transfer" || Step == "DirectTransfer"){
			Step = "LineClear";
			
		} else {
			alert("Error: Can't go to LineClear from current step");
		}
		return Step;		
	}


	function DisableStepButton(){
		if ( Step == "MW" ) {
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = false;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = true;
		}
		if ( Step == "PW" ){
			document.getElementById("stepMWButton").disabled = false;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = false; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = false; 			
			document.getElementById("stepDirectTransferButton").disabled = false; 			
			document.getElementById("stepLineClearButton").disabled = false;
		}
		if ( Step == "Recycle" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = false;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = false; 			
			document.getElementById("stepUnloadButton").disabled = false; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = false;
		}
		if ( Step == "Transfer" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = false;
		}
		if ( Step == "Unload" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = false; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = true;
		}		
		if ( Step == "DirectTransfer" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = false;
		}
		if ( Step == "LineClear" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = false;
			document.getElementById("stepRecycleButton").disabled = false; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = true;
		}
	}
	window.setInterval(function(){
  		recycleTransferPump();
  		unloadDirectTransferPump();
  		mp516aDischargeValve();
  		E12516CExchInletValve();
  		E12516HExchInletValve();
  		E12516HStmInletValve();
  		D301TransferValve();
  		N2SupplyValve();
  		mp516tDischargeValve();
  		d301InletValve();
  		OpReadyToUnload();
  		DisableStepButton();
  		LIT805Sim();
  		PT810Sim();
  		JT809Sim();
  		PT852Sim();
  		PIT804Sim();
            	TT807Sim();
            	TT807Sim();
            	TT807Sim();
	}, 2000);
