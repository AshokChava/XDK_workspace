/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested initialization place for your code.
// It is completely optional and not required.
// It implements a Cordova "hide splashscreen" function, that may be useful.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */



window.app = window.app || {} ;         // there should only be one of these...



// Set to "true" if you want the console.log messages to appear.

app.LOG = app.LOG || false ;

app.consoleLog = function() {           // only emits console.log messages if app.LOG != false
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
} ;



// App init point (runs on custom app.Ready event from init-dev.js).
// Runs after underlying device native code and webview/browser is ready.
// Where you should "kick off" your application by initializing app events, etc.

// NOTE: Customize this function to initialize your application, as needed.

app.initEvents = function() {
    "use strict" ;
    var fName = "app.initEvents():" ;
    app.consoleLog(fName, "entry") ;

    // NOTE: initialize your third-party libraries and event handlers

    // initThirdPartyLibraryNumberOne() ;
    // initThirdPartyLibraryNumberTwo() ;
    // initThirdPartyLibraryNumberEtc() ;

    // NOTE: initialize your application code

    // initMyAppCodeNumberOne() ;
    // initMyAppCodeNumberTwo() ;
    // initMyAppCodeNumberEtc() ;

    // NOTE: initialize your app event handlers, see app.js for a simple event handler example

    // TODO: configure following to work with both touch and click events (mouse + touch)
    // see http://msopentech.com/blog/2013/09/16/add-pinch-pointer-events-apache-cordova-phonegap-app/

//...overly simple example...
//    var el, evt ;
//
//    if( navigator.msPointerEnabled || !('ontouchend' in window))    // if on Win 8 machine or no touch
//        evt = "click" ;                                             // let touch become a click event
//    else                                                            // else, assume touch events available
//        evt = "touchend" ;                                          // not optimum, but works
//
//    el = document.getElementById("id_btnHello") ;
//    el.addEventListener(evt, myEventHandler, false) ;

    // NOTE: ...you can put other miscellaneous init stuff in this function...
    // NOTE: ...and add whatever else you want to do now that the app has started...
    // NOTE: ...or create your own init handlers outside of this file that trigger off the "app.Ready" event...

    app.initDebug() ;           // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen() ;    // after init is good time to remove splash screen; using a splash screen is optional

    // app initialization is done
    // app event handlers are ready
    // exit to idle state and wait for app events...

    app.consoleLog(fName, "exit") ;
} ;
document.addEventListener("app.Ready", app.initEvents, false) ;
var gridNums=[];
var moveCount=0;
var freeSlot="";
document.formGrid=function(){
    gridNums=[];
    moveCount=0;
    freeSlot="";
    document.clearGrid();
    document.drawGrid(document.getElementById("gridSizeValue").value);
};
document.clearGrid=function(){
    var table=document.getElementById("GridLayout");
    table.innerHTML="";
};
document.drawGrid=function(gridSizeValue){
    var gridSizeArr=gridSizeValue.split("X");
    var gridTotal=gridSizeArr[0]*gridSizeArr[1];
    var rowNum=0;
    var colNum=0;
    var cellCount=0;
    var table=document.getElementById("GridLayout");
    var row=table.insertRow(rowNum);



        for(var i=1;i<=gridTotal;i++){
            if(colNum<=gridSizeArr[0]){
                if(cellCount<gridTotal-1){
                    var randomNum=document.getRandomNumber(gridTotal);
                    row.insertCell(colNum).innerHTML="<button  style='width:100%;height:100%;' class='btn btn-block btn-primary' onClick='playMove(this.id)' value='"+randomNum+"' id='"+(rowNum+1)+"-"+(colNum+1)+"'>"+randomNum+"</button>";
                }else{
                    row.insertCell(colNum).innerHTML="<button  style='width:100%;height:100%;' class='btn btn-block btn-primary' onClick='playMove(this.id)' value='' id='"+(rowNum+1)+"-"+(colNum+1)+"'></button>";
                }
                cellCount++;
                colNum++;
            }
            if(cellCount<gridTotal&&colNum>=gridSizeArr[0]){
                row=table.insertRow(++rowNum);

                colNum=0;

            }
        }
};
document.getValidMoves=function(clickedId,freeId,rows, cols){
    var validMoves=[];

    var freeRow=parseInt(freeId.split("-")[0]);
    var freeCol=parseInt(freeId.split("-")[1]);
    validMoves.push(freeRow+"-"+(freeCol+1));
    validMoves.push((freeRow+1)+"-"+freeCol);
    validMoves.push((freeRow-1)+"-"+freeCol);
    validMoves.push((freeRow)+"-"+(freeCol-1));
    return validMoves;


};

document.getFreeSlot=function(){
   var list=document.getElementsByTagName("button");
    for(var i=0;i<list.length;i++){

        if( list[i].value.trim().length===0){
            return(list[i].id);

        }
    }
           
};
document.playMove=function(clickedId){
   // alert(clickedId);
     var gridRowSize=document.getElementById("gridSizeValue").value.split("X")[0];
    var gridColSize=document.getElementById("gridSizeValue").value.split("X")[1];
    //document.isValidMove(clickedId,document.getFreeSlot(),gridRowSize,gridColSize
    if(moveCount===0){
        freeSlot=document.getFreeSlot();
    }
    var validMoves=document.getValidMoves(clickedId,freeSlot,gridRowSize,gridColSize);
   // alert(freeSlot);
    if(validMoves.indexOf(clickedId)>=0){
        //alert(clickedId+"--"+document.getElementById(clickedId).value);
        //alert(freeSlot+"--"+document.getElementById(freeSlot).value);
        moveCount++;
        document.getElementById(freeSlot).value=document.getElementById(clickedId).value;
       document.getElementById(freeSlot).innerHTML=document.getElementById(clickedId).value;
        document.getElementById(clickedId).value=" ";
        document.getElementById(clickedId).innerHTML=" ";
        freeSlot=clickedId;
        document.getElementById("moveCountValue").innerHTML="Move Count: <b>"+moveCount+"</b>";
    }
    return false;

};
document.getRandomNumber=function(gridSizeValue){
    var count=0;
    while(1){
        var randomNum=Math.floor(Math.random() * (gridSizeValue - 1) + 1);
        if(gridNums.indexOf(randomNum)===-1){
            gridNums.push(randomNum);
            return randomNum;
        }
        //count++;
    }
};
// Just a bunch of useful debug console.log() messages.
// Runs after underlying device native code and webview/browser is ready.
// The following is just for debug, not required; keep it if you want or get rid of it.

app.initDebug = function() {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;

    if( window.device && device.cordova ) {                     // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova) ;   // print the cordova version string...
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
    }

    if( window.cordova && cordova.version ) {                   // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version) ; // print new Cordova 3.x version string...

        if( cordova.require ) {                                 // print included cordova plugins
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    }

    app.consoleLog(fName, "exit") ;
} ;



// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.

app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;

    // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
    // Do the following if you disabled App Framework autolaunch (in index.html, for example)
    // $.ui.launch() ;

    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen() ;
    }

    app.consoleLog(fName, "exit") ;
} ;
