
let button = document.querySelector('.control-buttons');
let buttonSpan = document.querySelector('.control-buttons span');
let userName = document.querySelector('.info-container .name span');
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from((blocksContainer.children));
let orderRange = Array.from(Array(blocks.length).keys());
let duration = 500;
let time = document.querySelector('.timer span');
let pop = document.querySelector('.pop');
let reset = document.querySelector('.pop .reset');
let reset2 = document.querySelector('.succeeded-pop .reset');
buttonSpan.onclick = function () {
  let yourName = prompt('what is your name?');
  if (yourName == null || yourName == '' || yourName[0] == ' ') {
    return false;
  } else {
    userName.innerHTML = yourName;
  }
  button.remove();

  let counter = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML == 0) {
      clearInterval(counter);
      pop.classList.add('failed');
      blocksContainer.classList.add('no-clicking');
      document.getElementById('fail').play();

    }
  }, 1000);

}
shuffle(orderRange);
blocks.forEach((a, b) => {
  a.style.order = orderRange[b];
  a.addEventListener('click', function () {
    flipping(a);
  })
})
function flipping(block) {
  block.classList.add('flipped');
  let flippedBlocks = blocks.filter((a) => a.classList.contains('flipped'));
  if (flippedBlocks.length == 2) {
    stopClick();
    checkMatched(flippedBlocks[0], flippedBlocks[1]);
  }
  let matchedBlocks = blocks.filter((a) => a.classList.contains('match'));
  if (matchedBlocks.length == 20) {
    clearInterval(counter);
    document.querySelector('.succeeded-pop').classList.add('succeeded');
    blocksContainer.classList.add('no-clicking');
    document.getElementById('success').play();

  }
}
function stopClick() {
  blocksContainer.classList.add('no-clicking');
  setTimeout(() => {
    blocksContainer.classList.remove('no-clicking');

  }, duration)
}
function checkMatched(a, b) {
  let tries = document.querySelector('.tries span');
  if (a.dataset.technology === b.dataset.technology) {
    a.classList.remove('flipped');
    b.classList.remove('flipped');

    a.classList.add('match');
    b.classList.add('match');

    document.getElementById('success').play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      document.getElementById('fail').play();
    }, duration)
  }

}
function shuffle(arr) {
  let current = arr.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
  }
  return arr;
}
reset.addEventListener('click', () => {
  document.location.reload(true);
})
reset2.addEventListener('click', () => {
  document.location.reload(true);
})
