const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const popup = document.getElementById("popup")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const size = 40

const images = {
  rock : new Image(),
  paper : new Image(),
  scissor : new Image(),
}

images.rock.src = "images/granite.png"
images.paper.src = "images/leaf.png"
images.scissor.src = "images/scissor.png"

const elements = []


function createElement(elem, tries = 0) {

  const newEl = {
    x : Math.random() * (canvas.width - size) + size/2,
    y : Math.random() * (canvas.height - size) + size/2,
    dx : 3 * (Math.random > 0.5 ? 1 : -1),
    dy : 2 * (Math.random > 0.5 ? 1 : -1),
    elem,
    img : images[elem],
    size
  }

  for(let i = 0 ; i<elements.length ; i++){
    if(isColliding(elements[i], newEl)){
      return createElement(elem, tries + 1)
    }
  }
  return newEl
}

for(let i = 0 ; i<8 ; i++){
  elements.push(createElement("rock"))
  elements.push(createElement("paper"))
  elements.push(createElement("scissor"))
}

function draw() {
  // Clean the context for each frame
  if(checkWins()){
    return
  }
  context.clearRect(0, 0, canvas.width, canvas.height)

  elements.forEach((el) => {
    el.x += el.dx
    el.y += el.dy

    if(el.x + size/2 >= canvas.width){
      el.x = canvas.width - size /2
      el.dx = -el.dx
    } 
    if(el.x - size/2 <= 0){
      el.x = size/2
      el.dx = -el.dx
    } 
    if(el.y + size/2 >= canvas.height){
      el.y = canvas.height - size/2
      el.dy = -el.dy
    } 
    if(el.y - size/2 <= 0){
      el.y = size/2
      el.dy = -el.dy
    } 
  })

  for(let i = 0 ; i<elements.length ; i++){
    for(j = i+1 ; j<elements.length ; j++){
      if(isColliding(elements[i], elements[j])){
        elements[i].dx = -elements[i].dx
        elements[i].dy = -elements[i].dy
        elements[j].dx = -elements[j].dx
        elements[j].dy = -elements[j].dy
        
        transform(elements[i], elements[j])
      }
    }
  }

  elements.forEach((el) => {
    context.drawImage(el.img, el.x - size/2, el.y - size/2, size, size)
  })

  requestAnimationFrame(draw)
} 

function isColliding(a, b) {
  return (
    Math.abs(a.x - b.x) <= size &&
    Math.abs(a.y - b.y) <= size
  )
}

function transform(el1, el2) {
  const rules = {
    rock : "scissor",
    scissor : "paper",
    paper : "rock"
  }

  if(rules[el1.elem] === el2.elem){
    el2.elem = el1.elem
    el2.img = el1.img
  } else if(rules[el2.elem] === el1.elem) {
    el1.elem = el2.elem
    el1.img = el2.img
  }
}

function checkWins(){
  let total = elements.length
  let count = {
    rock : 0,
    paper : 0,
    scissor : 0
  }

  elements.forEach((el) => count[el.elem]++)

  if(count.rock === total || count.paper === total || count.scissor === total){
    const popupImg = document.getElementById("popup-img")
    if(count.rock === total){
      popupImg.src = "images/humanStone.png"
    }
    else if(count.paper === total){
      popupImg.src = "images/humanLeaf.avif"
    }
    else{
      popupImg.src = "images/humanScissor.png"
    }
    popup.style.display = "flex"
    return true
  }
  return false
}

function restart(){
  location.reload()
}

let loadedImgCount = 0
const totalImg = Object.keys(images).length
Object.values(images).forEach((img) => {
  img.onload = () => {
    loadedImgCount++
    if(loadedImgCount === totalImg){
      draw()
    }
  }
})

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})