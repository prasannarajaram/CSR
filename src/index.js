	let Step, MW, PW;
	let EV850  = true;
	let LIT805 = 39;
	let PIT804 = 2.19;
	let PT810  = 1.2;
	let JT809  = 0;
	let JT854  = 0;
	let PT852  = 0;
	let TT807  = 35;
	let TT808  = 35; 
	let TT806  = 40;
	let TT853  = 40;
	let NC701TemperatureSP = 55;
	let counterInit = 30;
	let LineClearCounter = counterInit
	let LSH802 = false;
	let mp516a = false;
	let mp516t;
	let ABV811;
	let ABV812;
	let ABV813;
	let ABV814;
	let ABV815;
	let ABV816;
	let ABV850;
	let ABV851;

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
	
	function recycleTransferPump(){
		let mp516aStepPermissive = (Step == "Recycle" || Step == "Transfer");
		let mp516aProcessPermissive = (Step == "Recycle" && (ABV812 || ABV813) ) || ( Step == "Transfer" && ABV815 && ABV850) && ( LIT805 >= 10 )  && ABV811;
		mp516a = mp516aProcessPermissive && mp516aStepPermissive;
		document.getElementById('mp516a').innerHTML = mp516a;
		if (mp516a){
			document.getElementById('imgmp516a').src = "motorOn.png";
		} else {
			document.getElementById('imgmp516a').src = "motorOff.png";
		}
		return mp516a;
	}

	function unloadDirectTransferPump(){
		let mp516tStepPermissive = ( Step == "Unload" || Step == "DirectTransfer");
		let mp516tProcessPermissive = ( Step == "Unload" && ABV851 && ABV815 && ABV813 ) || ( Step == "DirectTransfer" && ABV851 && ABV850);
		let mp516tTrip = !LSH802;
		mp516t = mp516tStepPermissive && mp516tProcessPermissive && mp516tTrip && (readyToDirectTransfer || readyToUnload);
		document.getElementById('mp516t').innerHTML = mp516t;
		if (mp516t){
			document.getElementById('imgmp516t').src = "motorOn.png";
		} else {
			document.getElementById('imgmp516t').src = "motorOff.png";
		}
		return mp516t;
	}
	
	function mp516aDischargeValve(){
		let ABV811StepPermissive = ( Step == "Transfer" || Step == "Recycle" );
		let ABV811ProcessPermissive = true; // UPDATE if any process permissive.
		ABV811 = ABV811StepPermissive && ABV811ProcessPermissive;
		document.getElementById('ABV811').innerHTML = ABV811;
		if (ABV811){
			document.getElementById('imgABV811').src = "valveOpen.png";
		} else {
			document.getElementById('imgABV811').src = "valveClose.png";
		}
		return ABV811;
	}

	function E12516CExchInletValve(){
		let ABV812StepPermissive = ( Step == "Recycle" || Step == "Unload" );
		let ABV812ProcessPermissive = TT806 > NC701TemperatureSP; // UPDATE if any process permissive.
		ABV812 = ABV812StepPermissive && ABV812ProcessPermissive;
		document.getElementById('ABV812').innerHTML = ABV812;
		if (ABV812){
			document.getElementById('imgABV812').src = "valveOpen.png";
		} else {
			document.getElementById('imgABV812').src = "valveClose.png";
		}
		return ABV812;
	}

	function E12516HExchInletValve(){
		let ABV813StepPermissive = ( Step == "Recycle" || Step == "Unload");
		let ABV813ProcessPermissive = TT806 < NC701TemperatureSP; // UPDATE if any process permissive.
		ABV813 = ABV813StepPermissive && ABV813ProcessPermissive;
		document.getElementById('ABV813').innerHTML = ABV813;
		if (ABV813){
			document.getElementById('imgABV813').src = "valveOpen.png";
		} else {
			document.getElementById('imgABV813').src = "valveClose.png";
		}
		return ABV813;
	}

	function E12516HStmInletValve(){
		let ABV814StepPermissive = ( Step == "Recycle" );
		let ABV814ProcessPermissive = TT806 < NC701TemperatureSP; // UPDATE if any process permissive.
		ABV814 = ABV814StepPermissive && ABV814ProcessPermissive;
		document.getElementById('ABV814').innerHTML = ABV814;
		if (ABV814){
			document.getElementById('imgABV814').src = "valveOpen.png";
		} else {
			document.getElementById('imgABV814').src = "valveClose.png";
		}
		return ABV814;
	}

	function D301TransferValve(){
		let ABV815StepPermissive = ( Step == "Transfer" || Step == "Unload" );
		let ABV815ProcessPermissive = true; // UPDATE if any process permissive.
		ABV815 = ABV815StepPermissive && ABV815ProcessPermissive;
		document.getElementById('ABV815').innerHTML = ABV815;
		if (ABV815){
			document.getElementById('imgABV815').src = "valveOpenRotated.png";
		} else {
			document.getElementById('imgABV815').src = "valveCloseRotated.png";
		}
		return ABV815;
	}

	function N2SupplyValve(){
		let ABV816StepPermissive = ( Step == "LineClear" );
		let ABV816ProcessPermissive = true; // UPDATE if any process permissive.
		ABV816 = ABV816StepPermissive && ABV816ProcessPermissive;
		document.getElementById('ABV816').innerHTML = ABV816;
		if (ABV816){
			document.getElementById('imgABV816').src = "valveOpen.png";
		} else {
			document.getElementById('imgABV816').src = "valveClose.png";
		}
		return ABV816;
	}

	function mp516tDischargeValve(){
		let ABV851StepPermissive = ( Step == "DirectTransfer" || Step == "Unload" );
		let ABV851ProcessPermissive = true; // UPDATE if any process permissive.
		ABV851 = ABV851StepPermissive && ABV851ProcessPermissive;
		document.getElementById('ABV851').innerHTML = ABV851;
		if (ABV851){
			document.getElementById('imgABV851').src = "valveOpen.png";
		} else {
			document.getElementById('imgABV851').src = "valveClose.png";
		}
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

	function OpReadyToDirectTransfer(){
		readyToDirectTransfer = document.getElementById("readytodirecttransfer").checked;
	}

	function LineClearComplete(){
		if (Step == "LineClear" && !LineClearCounter <= 0){
			LineClearCounter = LineClearCounter - 1; 
		}
		document.getElementById('lineclearcountdown').innerHTML = LineClearCounter;
		if (Step == "PW" && LineClearCounter == 0) {
			LineClearCounter = counterInit;
		}
		return LineClearCounter;
	}

	function LIT805Sim(){
		if ( Step == "Unload" && mp516t ){
			LIT805 = LIT805 + 0.056789;
		}else if ( Step == "Transfer" && mp516a ){
			LIT805 = LIT805 - 0.056789;
		}
		document.getElementById('LIT805').innerHTML = LIT805.toFixed(2);
		return LIT805;
	}
	
	function LSH802Sim(){
		LSH802 = LIT805 >= 39.10;
		if (LSH802){
			document.getElementById('imglsh802').src = "levelSwitchHigh.png";
		}
		return LSH802;
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

	// The range of PT810 is 200 psig, however the max pump discharge pressure is only
	// 150 psig. The calculation shown below will generate a first order response curve
	// for pressure build up after pump starts

	// If the pump is off then pressure will fall at 50% per second
	function PT810Sim(){
		if ( mp516a ) {
			PT810 = ((150 - PT810) * 0.3) + PT810; 
		} else {
			PT810 = PT810 * 0.5;
			if (PT810 < 1) {
				PT810 = 0;
			}
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
	
	function JT854Sim(){
		if ( mp516t ) {
			JT854 = ((25 - JT854) * 0.5) + JT854; 
		} else {
			JT854 = JT854 * 0.5;
			if (JT854 < 1)
				JT854 = 0;
		}
		document.getElementById('JT854').innerHTML = JT854.toFixed(2);
		return JT854;
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

	function TT853Sim(){
        
        document.getElementById('TT853').innerHTML = TT853.toFixed(2);
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
			document.getElementById("readytounload").disabled = true;
			document.getElementById("readytodirecttransfer").disabled = true;
		}
		if ( Step == "PW" ){
			document.getElementById("stepMWButton").disabled = false;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = false; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = false; 			
			document.getElementById("stepDirectTransferButton").disabled = false; 			
			document.getElementById("stepLineClearButton").disabled = false;
			document.getElementById("readytounload").disabled = true;
			document.getElementById("readytodirecttransfer").disabled = true;
		}
		if ( Step == "Recycle" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = false;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = false; 			
			document.getElementById("stepUnloadButton").disabled = false; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = false;
			document.getElementById("readytounload").disabled = true;
			document.getElementById("readytodirecttransfer").disabled = true;
		}
		if ( Step == "Transfer" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = false;
			document.getElementById("readytounload").disabled = true;
			document.getElementById("readytodirecttransfer").disabled = true;
		}
		if ( Step == "Unload" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = false; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = true;
			document.getElementById("readytounload").disabled = false;
			document.getElementById("readytodirecttransfer").disabled = true;
		}		
		if ( Step == "DirectTransfer" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = false;
			document.getElementById("readytounload").disabled = false;
			document.getElementById("readytodirecttransfer").disabled = false;
		}
		if ( Step == "LineClear" ){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = false;
			document.getElementById("stepRecycleButton").disabled = false; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = true;
			document.getElementById("readytounload").disabled = true;
			document.getElementById("readytodirecttransfer").disabled = true;
		}
		if ( LineClearCounter < counterInit && LineClearCounter > 0){
			document.getElementById("stepMWButton").disabled = true;
			document.getElementById("stepPWButton").disabled = true;
			document.getElementById("stepRecycleButton").disabled = true; 			
			document.getElementById("stepTransferButton").disabled = true; 			
			document.getElementById("stepUnloadButton").disabled = true; 			
			document.getElementById("stepDirectTransferButton").disabled = true; 			
			document.getElementById("stepLineClearButton").disabled = true;
			document.getElementById("readytounload").disabled = true;
			document.getElementById("readytodirecttransfer").disabled = true;
		}
	}

	function updateDB(LIT805,PIT804,PT810,JT809,JT854,PT852,TT807,TT808,TT806,TT853,
		mp516a,mp516t,ABV811,ABV812,ABV813,ABV814,ABV815,ABV816,ABV850,ABV851,Step)  {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "insert.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// xhttp.send("temp=50&hum=90");
		// xhttp.send('temp=' + encodeURIComponent(temp) + '&hum=' + encodeURIComponent(hum));
		xhttp.send('LIT805Sim=' + encodeURIComponent(LIT805) + 
			'&PIT804Sim=' + encodeURIComponent(PIT804) +
		    '&PT810Sim=' + encodeURIComponent(PT810) +
		    '&JT809Sim=' + encodeURIComponent(JT809) +
		    '&JT854Sim=' + encodeURIComponent(JT854) +
		    '&PT852Sim=' + encodeURIComponent(PT852) +
  		    '&TT807Sim=' + encodeURIComponent(TT807) +
		    '&TT808Sim=' + encodeURIComponent(TT808) +
		    '&TT806Sim=' + encodeURIComponent(TT806) +
			'&TT853Sim=' + encodeURIComponent(TT853) +
			'&mp516a=' + encodeURIComponent(mp516a) +
			'&mp516t=' + encodeURIComponent(mp516t) +
			'&ABV811=' + encodeURIComponent(ABV811) +
			'&ABV812=' + encodeURIComponent(ABV812) +
			'&ABV813=' + encodeURIComponent(ABV813) +
			'&ABV814=' + encodeURIComponent(ABV814) +
			'&ABV815=' + encodeURIComponent(ABV815) +
			'&ABV816=' + encodeURIComponent(ABV816) +
			'&ABV850=' + encodeURIComponent(ABV850) +
			'&ABV851=' + encodeURIComponent(ABV851) +
			'&Step=' + encodeURIComponent(Step) );
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
		OpReadyToDirectTransfer();
		LineClearComplete();
  		DisableStepButton();
		LIT805Sim();
		LSH802Sim();
		PIT804Sim();
  		PT810Sim();
  		JT809Sim();
		JT854Sim();
		PT852Sim();
		TT807Sim();
		TT808Sim();
		TT806Sim();
		TT853Sim();
		updateDB(LIT805,PIT804,PT810,JT809,JT854,PT852,TT807,TT808,TT806,TT853,
			mp516a,mp516t,ABV811,ABV812,ABV813,ABV814,ABV815,ABV816,ABV850,ABV851,Step);
	}, 5000);

