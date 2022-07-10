window.addEventListener('load', () => {
  const canvas = document.querySelector("#canvas")
  const context = canvas.getContext("2d")
  const brushSize = document.querySelector('[data-id="line-size"]')
  
  const options = document.querySelector(".options")
  options.width = window.innerWidth
  
  canvas.height = window.innerHeight - 44
  canvas.width = window.innerWidth
  
  let painting = false
  let color = 'black'
  let lineModifier = '1'

  function startPosition(e) {
    if(e.which !== 1) return
    painting = true
    draw(e)
  }
  
  function finishedPosition() {
    painting = false
    context.beginPath()
  }
  
  function draw(e) {
    if(!painting) return
    context.lineWidth = 10 * lineModifier
    context.lineCap = 'round'
    context.strokeStyle = color
    
    context.lineTo(e.clientX, e.clientY - 40)
    context.stroke()
    context.beginPath()
    context.moveTo(e.clientX, e.clientY - 40)
  }
  
  window.addEventListener('mousedown', startPosition)
  window.addEventListener('mouseup', finishedPosition)
  window.addEventListener('mousemove', draw)
  brushSize.addEventListener("input", changeLineModifier, false);

  document.querySelectorAll("[data-color").forEach((element) => {
    element.addEventListener('click', () => {
      color = element.dataset.color
    })
  })  

  function changeLineModifier(event) {
    lineModifier = brushSize.value;
  }
})
