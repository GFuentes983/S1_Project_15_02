"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Gabriel Fuentes
   Date: 4.18.19  
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

window.addEventListener('load', function() {
   // Set changingCells to the collection of input elements with the class sum from the table with the id travelExp
   var changingCells = document.querySelectorAll('table#travelExp input.sum');
   // Set all in the changingCells collection to run the calcExp function when changed
   for (var i = 0; i < changingCells.length; i++) {
      //changingCells[i].onchange = calcExp();
   // Run the validateSummary function when the element with the id submitButton is changed
   document.getElementById('submitButton').onchange = validateSummary();
   }
   calcClass();
});

// Creating the validateSummary function
function validateSummary() {
   // Creates a variable that will go for the text area with the id summary
   var summary = document.querySelector('textarea#summary');
   // Display a message if the field value is missing otherwise set to an empty text string
   if (summary.validity.valueMissing) {
      summary.setCustomValidity("You must include a summary of the trip in your report");
   } else {
      summary.setCustomValidity("");
   }
}

// Creating the calcClass function and passing it a parameter of sumClass
function calcClass(sumClass) {
   // Variable of sumFields containing an object collection of elements to the sumClass class
   var sumFields = document.querySelectorAll('.sumClass');
   // Variable to keep a running total of the total values in the sumFields object collection
   var sumTotal = 0;

   for (var i = 0; i < sumFields.length; i++) {
      var itemValue = parseFloat(sumFields[i]);
      if (itemValue.NaN() === false) {
        sumTotal = sumTotal + itemValue;
      }
   }
   return sumTotal;
}



// Division -----------------------------------------------------
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}