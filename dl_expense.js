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
      changingCells[i].addEventListener('change', calcExp); }
   // Run the validateSummary function when the element with the id submitButton is changed
   document.getElementById('submitButton').onclick = function() {
      validateSummary(); }
});

// Creating the validateSummary function
function validateSummary() {
   // Creates a variable that will go for the text area with the id summary
   var summary = document.getElementById('summary');
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
   var sumFields = document.getElementsByClassName(sumClass);
   // Variable to keep a running total of the total values in the sumFields object collection
   var sumTotal = 0;

   for (var i = 0; i < sumFields.length; i++) {
      var itemValue = parseFloat(sumFields[i].value);
      if (isNaN(itemValue) === false) {
        sumTotal += itemValue;
      }
   }
   return sumTotal;
}

// calculate the row and column totals from the travelExp table
function calcExp() {
   // expTable referencing all the tr elements within the table body of the travelExp table
   var expTable = document.querySelectorAll('table#travelExp tbody tr');

   // For each row in the expTable object collection set the value of input value with the id subtotalIndex from the returned value of the calcClass function with the parameter dateIndex
   for (var i = 0; i < expTable.length; i++) {
      document.getElementById(`subtotal${i}`).value = formatNumber(calcClass(`date${i}`),2);
   }

   // Setting the values for cost for the trans,lodge, meal and other total variables.
   document.getElementById('transTotal').value = formatNumber(calcClass("trans"),2 );
   document.getElementById('lodgeTotal').value = formatNumber(calcClass("lodge"),2 );
   document.getElementById('mealTotal').value = formatNumber(calcClass("meal"),2 );
   document.getElementById('otherTotal').value = formatNumber(calcClass("other"),2 );

   document.getElementById('expTotal') = formatUSCurrency(calcClass('sum'));
}


// Division -----------------------------------------------------
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}