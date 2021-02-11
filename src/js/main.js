import '../../node_modules/focus-visible/dist/focus-visible';

import '../scss/main.scss';
import '../index.html';
import male from '../img/male.png';
import female from '../img/female.png';
import {data} from'./data';

const triggerButton = document.getElementById('trigger-btn');
const playerAvatar = document.getElementById('player-avatar');
let slides = Array.from(document.querySelectorAll('.slide'));
const slideWidth = slides[0].getBoundingClientRect().width + 20;
const prev = document.getElementById('prev');
const next = document.getElementById('next');



let clickRight = 0;
let clickLeft = 0;

//assignment of eventListener for avatar animation trigger
triggerButton.addEventListener('click', () => {
  playerAvatar.classList.add('active');
})
//assignment of eventListeners for slider controls
prev.addEventListener('click', () => {
  moveLeft();
})
next.addEventListener('click', () => {
  moveRight();
})

// moves slider Left

function moveLeft() {
  clickLeft < slides.length - 1 ? (
    clickLeft++,
      clickRight--,
      slides.forEach((slide) => {
        slide.style.transform = `translateX(${-(slideWidth * clickLeft)}px)`
      })
  ) : null
};
// moves slider Right
function moveRight() {
  clickLeft ? (
    clickRight++,
      clickLeft--,
      slides.forEach((slide) => {
        slide.style.transform = `translateX(${slideWidth * clickRight}px)`
      })
  ) : null
};

//Rating list scripts
let listedFriends = [];
const ratingChart = document.getElementById('rating-chart');//rating chart itself
const ratingButton = document.getElementById('rating-btn');//button to show the chart
const  closeCross = document.getElementById('close-cross');//button to close the chart

//function to toggle show/hide class of the chart
function toggleRating() {
  ratingChart.classList.toggle('rating-chart__active');
}


//assignment of eventListener toshow/hide triggers
[ratingButton, closeCross].forEach(el => el.addEventListener('click',toggleRating));

//checks for identical players in Rating and Friends arrays
function checkForFriends() {
  for(let i in data.rating){
    for(let j in data.friends){
      data.rating[i].id === data.friends[j].id ? listedFriends.push(data.friends[j]) : null
    }
  }
}
//Lists all data from Rating array + highlights friends
function listRating () {
  if(data.rating) {
    checkForFriends();
    for (var i = 0; i < data.rating.length; i++) {
      let table = document.getElementById("data-output");
      let isFriend = listedFriends.filter(friend => friend.id === data.rating[i].id)
      let row = table.insertRow(i);
      isFriend.length ? row.classList.add('friend') : null;
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      cell1.innerHTML = data.rating[i].id,
        cell2.innerHTML = `<img src=${data.rating[i].img === '/male.png' ? male : female} alt="player" />` ,
        cell3.innerHTML = `${data.rating[i].name} ${data.rating[i].lastName}`,
        cell4.innerHTML = data.rating[i].points;
    }
  }
}


document.addEventListener('DOMContentLoaded', listRating);


