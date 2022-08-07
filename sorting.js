let arr = [];
randomize();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Creates a random array of integers to be sorted.
// Edits HTML to show rectangles of varying heights.
function randomize() {
  arr = [];
  let sortingRange = document.querySelector("#sortingRange").value;

  // Randomly select values for each of the items
  for (let i = 0; i < sortingRange; i++) {
    arr.push((Math.floor(Math.random() * 430) + 20))
  }

  let newHTML = "";
  let color = "";
  let colorModulo = 0;

  // Decide the color of each div, and assign each div a unique id
  // to help synchronize them with the items in arr.
  for (const item of arr) {
    if (colorModulo % 3 === 0) {
      color = "A5C9CA";
    }
    else if (colorModulo % 3 === 1) {
      color = "395B64";
    }
    else {
      color = "2C3333";
    }

    let height = (item / 500) * 100.0;

    newHTML += '<div class="col item" name="' + item.toString() + '" id="' + colorModulo + '"';
    newHTML += ' style="background-color: #' + color + '; height: ' + height + '%;"></div>';
    colorModulo++;
  }

  document.querySelector("#sortingSpace").innerHTML = newHTML;
}


// Takes two indices, a and b, and swaps the positions of arr[a] and arr[b]
// and the corresponding divs in the HTML document.
function swap(a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;

  let docA = document.getElementById(a.toString());
  let docB = document.getElementById(b.toString());

  //docA.id = b.toString();
  //docB.id = a.toString();

  temp = docA.style.height;
  docA.style.height = docB.style.height;
  docB.style.height = temp;

  temp = docA.name;
  docA.name = docB.name;
  docB.name = temp;
}


async function bubbleSort() {
  let i, j;
  for (i = 0; i < arr.length - 1; i++) {
    for (j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        await sleep(1);
        swap(j, j + 1);
      }
    }
  }
}

// Sorts the array with the given settings
// The user must choose the number of items to be sorted, the algorithm
// that should be used, and the direction of the sort (Ascending vs Descending)
function sort() {

  // Get all of the user settings from the document
  let sortingRange = document.querySelector("#sortingRange").value;
  let sortingAlgorithm = document.querySelector("input[name=AlgorithmRadio]:checked").value;
  let sortingDirection = document.querySelector("input[name=DirectionRadio]:checked").value;

  if (sortingAlgorithm === "Bubble Sort") {
    bubbleSort();
  }

}
