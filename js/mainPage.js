// Code for the main app page (Past Runs list).

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

function viewRun(runIndex)
{
    // Save the desired run to local storage so it can be accessed from View Run page.
    localStorage.setItem(APP_PREFIX + "-selectedRun", runIndex); 
    // ... and load the View Run page.
    location.href = 'viewRun.html';
}

function Run(begin, loacations){
	this.loacations = loacations;
	this.begin = begin;
	this.end;

} 