// Code for the View Run page.

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

var runIndex = localStorage.getItem(APP_PREFIX + "-selectedRun"); 
if (runIndex !== null)
{
    // If a run index was specified, show name in header bar title. This
    // is just to demonstrate navigation.  You should set the page header bar
    // title to an appropriate description of the run being displayed.
    var runNames = [ "Run A", "Run B" ];
    document.getElementById("headerBarTitle").textContent = runNames[runIndex];
}
