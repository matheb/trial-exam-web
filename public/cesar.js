var solution = document.querySelector('.solution');
var decoded = document.querySelector('.solved_text');

var sendButton = document.querySelector('button');

var prevList =  document.querySelector('.prev_list');
var prev = document.querySelector('.prev');

function postText() {
  var encodedText =  document.querySelector('textarea').value;
  var shift =  document.querySelector('input').value;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', "http://localhost:3000/decode", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({'shift': shift, 'text': encodedText}));
  xhr.onreadystatechange = function (){
    if (xhr.readyState === XMLHttpRequest.DONE){
      console.log(xhr.response)
      console.log(JSON.parse(xhr.response)['text']);
      decoded.textContent = JSON.parse(xhr.response)['text'];
      if (solution.classList.contains('unsolved')) {
        solution.classList.remove('unsolved');
      };
    };
  };
};

function getAll() {
  prevList.innerHTML = '';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://localhost:3000/decode/all", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  xhr.onreadystatechange = function (){
    if (xhr.readyState === XMLHttpRequest.DONE){
      console.log(JSON.parse(xhr.response).all)
      var all = JSON.parse(xhr.response).all;
      for (var i = 0; i < all.length; i++){
        var newDecoded = document.createElement('li');
        newDecoded.textContent = '" '+all[i]+' "';
        prevList.appendChild(newDecoded);
      }
      if (prev.classList.contains('unsolved')) {
        prev.classList.remove('unsolved');
      };
    };
  };
};

function happening(){
  postText();
  getAll();
}
sendButton.addEventListener('click', happening);
