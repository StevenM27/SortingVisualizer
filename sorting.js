randomize();

function sort() {
  let sortingRange = document.querySelector("#sortingRange").value;
  let sortingAlgorithm = document.querySelector("input[name=AlgorithmRadio]:checked").value;
  let sortingDirection = document.querySelector("input[name=DirectionRadio]:checked").value;
  //document.getElementById("mainDisplay").innerHTML = sortingAlgorithm + " (" + sortingDirection + "): " + sortingRange.toString();
}

function randomize() {
  let arr = [];
  let sortingRange = document.querySelector("#sortingRange").value;

  for (let i = 0; i < sortingRange; i++) {
    arr.push((Math.floor(Math.random() * 430) + 20))
  }

  let newHTML = "";
  let color = "";
  let colorModulo = 0;

  for (const item of arr) {
    if (colorModulo % 3 == 0) {
      color = "A5C9CA";
    }
    else if (colorModulo % 3 == 1) {
      color = "395B64";
    }
    else {
      color = "2C3333";
    }

    let height = (item / 500) * 100.0;

    colorModulo++;
    newHTML += '<div class="col item" name="' + item.toString() + '"';
    newHTML += ' style="background-color: #' + color + '; height: ' + height + '%;"></div>';
  }

  document.querySelector("#sortingSpace").innerHTML = newHTML;
}
