/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function () {
  "use strict";

  // Get the number from the input field
  var n = parseInt(document.getElementById("num").value, 10);
  
  // Validate the input
  if (isNaN(n) || n <= 0) {
      document.getElementById("pf").innerText = "Please enter a positive integer.";
      return;
  }

  function isPrime(num) {
      if (num <= 1) return false; // 0 and 1 are not prime numbers
      for (var i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
              return false;
          }
      }
      return true;
  }

  var sequence = [];

  // Check for factors of n
  for (var i = 2; i <= n; i++) {
      if (n % i === 0 && isPrime(i)) {
          sequence.push(i);
          // Divide n by the prime factor to reduce it
          while (n % i === 0) {
              n /= i;
          }
      }
  }

  // Display the result in the span element
  document.getElementById("pf").innerText = `The prime factors are: [${sequence.join(", ")}]`;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));