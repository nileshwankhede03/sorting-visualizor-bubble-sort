let arr = [];
let comparisons = 0;
let swaps = 0;

function generateArray() {
  const input = document.getElementById('userArray').value;
  arr = input.split(',').map(Number);
  comparisons = 0;
  swaps = 0;
  renderArray();
}

function renderArray(high1 = -1, high2 = -1, sortedIndex = -1) {
  const container = document.getElementById('array');
  container.innerHTML = '';

  arr.forEach((value, index) => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerText = value;

    if (index === high1 || index === high2) {
      box.classList.add('compare');
    }

    if (index >= sortedIndex && sortedIndex !== -1) {
      box.classList.add('sorted');
    }

    container.appendChild(box);
  });

  document.getElementById('comparisons').innerText = comparisons;
  document.getElementById('swaps').innerText = swaps;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  let n = arr.length;
  let delay = document.getElementById('speed').value;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      renderArray(j, j + 1, n - i);
      await sleep(delay);

      if (arr[j] > arr[j + 1]) {
        swaps++;
        renderArray(j, j + 1, n - i);
        await sleep(delay);

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        renderArray(j, j + 1, n - i);
        await sleep(delay);
      }
    }

    if (!swapped) break;
  }

  renderArray(-1, -1, 0);
}
