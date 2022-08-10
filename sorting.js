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

  temp = docA.style.height;
  docA.style.height = docB.style.height;
  docB.style.height = temp;

  temp = docA.name;
  docA.name = docB.name;
  docB.name = temp;
}

// Compares the values of arr[a] and arr[b] according to the direction
// of the sort (Ascending vs Descending)
function compare(a, b, direction) {
  if (direction === "Ascending") {
    return arr[a] > arr[b];
  }
  else {
    return arr[a] < arr[b];
  }
}

// Sorts the array arr using bubble sort
async function bubbleSort(direction) {
  let i, j;
  for (i = 0; i < arr.length - 1; i++) {
    for (j = 0; j < arr.length - i - 1; j++) {
      if (compare(j, j + 1, direction)) {
        await sleep(1);
        swap(j, j + 1);
      }
    }
  }
}

// Changes the array item's color to the specified RGB value.
// If the color is not specified, the item's color at arr[idx] will
// be reverted back to its default color
function changeColor(idx, color="default") {
  item = document.getElementById(idx.toString());

  if (color === "default") {
    if (idx % 3 === 0) {
      color = "A5C9CA";
    }
    else if (idx % 3 === 1) {
      color = "395B64";
    }
    else {
      color = "2C3333";
    }
  }

  item.style.backgroundColor = "#" + color.toString();

}

// Sorts the array arr using selection sort.
async function selectionSort(direction) {
  let i, j, idx;

  for (i = 0; i < arr.length - 1; i++) {
    idx = i;

    changeColor(i, color="ff0000");

    for (j = i + 1; j < arr.length; j++) {
      await sleep(1);
      changeColor(j, color="ff0000");
      if (!compare(j, idx, direction)) {
        if (idx !== i){
          changeColor(idx);
        }
        idx = j;
        changeColor(idx, color="00ff00");
      }
      await sleep(1);
      if (idx !== j) {
        changeColor(j);
      }
    }
    await sleep(1);
    swap(idx, i);
    changeColor(idx);
    changeColor(i);
  }
}


// Sorts the array with the given settings
// The user must choose the number of items to be sorted, the algorithm
// that should be used, and the direction of the sort (Ascending vs Descending)
async function sort() {

  // Get all of the user settings from the document
  let sortingRange = document.querySelector("#sortingRange").value;
  let sortingAlgorithm = document.querySelector("input[name=AlgorithmRadio]:checked").value;
  let sortingDirection = document.querySelector("input[name=DirectionRadio]:checked").value;

  let settings = document.getElementsByClassName("setting");

  for (let i = 0; i < settings.length; i++) {
    settings.item(i).disabled = true;
  }

  if (sortingAlgorithm === "Bubble Sort") {
    await bubbleSort(sortingDirection);
  }
  else if (sortingAlgorithm === "Selection Sort") {
    await selectionSort(sortingDirection);
  }

  for (let i = 0; i < settings.length; i++) {
    settings.item(i).disabled = false;
  }

}
