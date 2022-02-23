import './css/main.css';
import './css/font-awesome.css';
import './js/jquery.js';


import { selectMode, addMode, setColor, board } from './lib/mode.js';
/**
 * MODEs
 */
import marker from './modes/marker.js';
import rect from './modes/rect.js';
import circle from './modes/circle.js';
import arrow from './modes/arrow.js';
import eraser from './modes/eraser.js';
import stampNumber from './modes/stamp-number.js';
import undo from './modes/undo.js';
import line from './modes/line.js';
import lineWidth from './modes/line-width.js';
/**
 * 
 */


addMode('marker', marker);
addMode('rect', rect);
addMode('circle', circle);
addMode('arrow', arrow);
addMode('eraser', eraser);
addMode('stampNumber', stampNumber);
addMode('line', line);
addMode('undo', undo);
addMode('lineWidth', lineWidth);





selectMode('marker', 2, '#fc0505');
setColor('#63676b');


/**
 * Получаем URL изображения
 */
window.addEventListener("message", event=>{
        let IMG = event.data.IMG;
        board.setBackground(IMG);
});

/**
 * 
 */
$('.paint-board__tools').on('mousedown', '.tool', function (){
    let tool = $(this).data('id') 
    let param = $(this).data('param')
    /**
     * 2 - Отрисовка инструмента после второго клика
     */
    selectMode(tool, 2, param) 
})

$('#undo').on('mousedown', function (){
  selectMode('undo', 0)
})


$('#weight').on('mousedown', function (){

  
})


/**
 * Numbers
 */

$('.number-nav').on('click', '.number-nav__item', function (){

    selectMode('stampNumber', 1, this.innerHTML)

})

/**
 * dashed
 */
board.ctx.dashed = []

var dashedFlag = false
$('#dashed').on('click', function (){
  if(dashedFlag){
    board.ctx.dashed = []
    dashedFlag = false
    $(this).removeClass('active-btn')
  }
  else{
    board.ctx.dashed = [10, 10]
    dashedFlag = true
    $(this).addClass('active-btn')
  }
})

/**
 * Change color
 */
var colorList = [
      "#63676b",
      "#ac725e",
      "#d06b64",
      "#f83a22",
      "#fa573c",
      "#ff7537",
      "#ffad46",
      "#42d692",
      "#16a765",
      "#7bd148",
      "#b3dc6c",
      "#fbe983",
      "#fad165",
      "#92e1c0",
      "#9fe1e7",
      "#9fc6e7",
      "#4986e7",
      "#9a9cff",
      "#b99aff",
      "#c2c2c2",
      "#cabdbf",
      "#cca6ac",
      "#f691b2",
      "#cd74e6",
      "#a47ae2",
      '#11aff2',
      '#f2eb11',
      '#080700',
      '#a40cc9',
      '#f51dee',
      '#2ae7f5',
      '#fa0a0a'
]
colorList.map(color=>{

  let $tpl = $(`<div class="colorpicker__color"></div>`)
      $tpl.css({ background: color })
      $tpl.attr('data-color', color)
  $('#colorpicker').append($tpl)

})

var flag3 = false

$('.colorpicker__current').css('background', '#63676b')

$('.colorpicker__current').on('click', function() {
  if(flag3){
    $('#colorpicker').hide()
    flag3 = false
  }
  else{
      $('#colorpicker').css('display', 'flex')
      flag3 = true
  }


})

$('#colorpicker').on('mousedown', '.colorpicker__color', function() {

  let color = $(this).data('color')
  setColor(color)
  $('.colorpicker__current').css('background', color)
  $('#colorpicker').hide()
  flag3 = false
})
/**
 * weight marker
 */
board.weightMarker = 10
$('#weight-marker').on('mousedown', function (){

    if(board.weightMarker === 10){
      board.weightMarker = 20
    }
    else if(board.weightMarker === 20){
        board.weightMarker = 30
    }
    else if(board.weightMarker === 30){
       board.weightMarker = 10
    }
    this.innerHTML =  board.weightMarker

})


/**
 * Change weight
 */
var flag4 = false
$('.weight__current').on('mousedown', function (){
    if(flag4){
      flag4 = false
      $('.weight__list').hide()
    }
    else{
      flag4 = true
      $('.weight__list').css('display', 'flex')

    }
})

$('.weight__list').on('click', 'div', function (){

  let val = $(this).data('value')
  board.ctx.lineWidth = val
  $('.weight__current').html(val)
  flag4 = false
   $('.weight__list').hide()
})

