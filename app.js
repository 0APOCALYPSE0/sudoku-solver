const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-button');
const solutionDisplay = document.querySelector('#solution');

const squares = 81;
let submission = [];

for(let i=0; i<squares; i++){
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'number');
  inputElement.setAttribute('min', 1);
  inputElement.setAttribute('max', 9);
  if(
    ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i < 21) ||
    ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i < 27) ||
    ((i % 9 === 3 || i % 9 === 4 || i % 9 === 5) && (i > 27 && i < 53)) ||
    ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i > 53) ||
    ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i > 53)
  ){
    inputElement.classList.add('odd-section');
  }
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    if(input.value){
      submission.push(input.value);
    }else{
      submission.push('.');
    }
  });
  // console.log(submission);
}

const populateValues = (response) => {
  const inputs = document.querySelectorAll('input');
  if(response.solvable && response.solution){
    inputs.forEach((input, index) => {
      input.value = response.solution[index];
    });
    solutionDisplay.innerHTML = "This is the answer.";
  }else{
    solutionDisplay.innerHTML = "This is not solvable.";
  }
}

const solve = () => {
  joinValues();
  const puzzleData = submission.join('');
  // console.log(puzzleData);
  let data = {
    'puzzle': puzzleData
  }
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/solve',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: JSON.stringify(data)
  }

  console.log(options);
  axios.request(options)
  .then(response => { populateValues(response.data); submission = []; })
  .catch(error => console.log(error));
}

solveButton.addEventListener('click', solve);