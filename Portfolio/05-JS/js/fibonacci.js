// This object will keep memory of the previous Fibonacci numbers
var memo = {};

function fibonacci() {
    "use strict";
    var n = parseInt(document.getElementById("num").value, 10);
    if (isNaN(n) || n < 0) {
        document.getElementById("fibonacciLbl").innerText = "Please enter a non-negative integer.";
        return;
    }
    var val = f(n);
    // Display the result in the span element
    document.getElementById("fibonacciLbl").innerText = `Fibonacci(${n}) = ${val}`;
}

function f(n) {
    // Base cases
    if (n <= 0) return 0; // Fibonacci(0) = 0
    if (n === 1) return 1; // Fibonacci(1) = 1

    // Check if the memory object already contains the requested number
    if (memo.hasOwnProperty(n)) {
        return memo[n];
    } else {
        // Calculate Fibonacci number recursively and store it in memo
        var value = f(n - 1) + f(n - 2);
        memo[n] = value; // Store the computed value in memo
        return value;
    }
}

// Add event listener to the button
document.getElementById("btn").addEventListener("click", fibonacci);