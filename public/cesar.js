var solution = document.querySelector('.solution');
var decoded = document.querySelector('.solved_text');

var sendButton = document.querySelector('button');

var prevList =  document.querySelector('.prev_list');
var prev = document.querySelector('.prev');

var loadWindow = document.querySelector('.loading');

function postText() {
  var encodedText =  document.querySelector('textarea').value;
  var shift =  document.querySelector('input').value;
  if ( encodedText != '' && shift !=''){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:3000/decode", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({'shift': shift, 'text': encodedText}));
    xhr.onreadystatechange = function (){
      if (xhr.readyState === XMLHttpRequest.DONE){
        loadWindow.style.visibility = 'hidden';
        decoded.textContent = JSON.parse(xhr.response)['text'];
        if (solution.classList.contains('unsolved')) {
          solution.classList.remove('unsolved');
        };
      } else if (xhr.readyState === XMLHttpRequest.LOADING) {
        loadWindow.style.visibility = 'visible';
      };
    };
  } else {
    alert('Please add an iput!');
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
      loadWindow.style.visibility = 'hidden';
      var all = JSON.parse(xhr.response).all;
      for (var i = 0; i < all.length; i++){
        var newDecoded = document.createElement('li');
        newDecoded.textContent = '" '+all[i]+' "';
        prevList.appendChild(newDecoded);
      }
      if (prev.classList.contains('unsolved')) {
        prev.classList.remove('unsolved');
      };
    } else if (xhr.readyState === XMLHttpRequest.LOADING) {
      loadWindow.style.visibility = 'visible';
    };
  };
};

function happening(){
  postText();
  getAll();
}
sendButton.addEventListener('click', happening);
