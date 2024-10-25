/*
Pig Latin
*/

function igpayAtinlay() {
  // Get the input value from the text field
  var input = document.getElementById("txtVal").value.trim();
  
  // Initialize the word array by splitting the input string into words
  var wordArray = input.split(" ");
  var returnArray = [];

  // Process each word in the word array
  for (var i = 0; i < wordArray.length; i++) {
      var word = wordArray[i];
      var beginning = word.charAt(0);

      // Check if the word starts with a vowel
      if (/[aeiouAEIOU]/.test(beginning)) {
          returnArray.push(word + "way"); // Add "way" for words starting with a vowel
          continue;
      }

      // For words starting with consonants
      for (var ii = 1; ii < word.length; ii++) {
          if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
              // Move the consonant(s) to the end and add "ay"
              var pigLatinWord = word.slice(ii) + beginning + word.slice(1, ii) + "ay";
              returnArray.push(pigLatinWord);
              break;
          } else {
              beginning += word.charAt(ii); // Build the beginning consonant cluster
          }
      }

      // If no vowels were found, just add "ay" to the end of the word
      if (ii === word.length) {
          returnArray.push(word + "ay");
      }
  }

  // Display the result in the span element
  document.getElementById("pigLatLbl").innerText = returnArray.join(" ");
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"