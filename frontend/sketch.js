let g, button;

class Graph {
    constructor() {
      this.nodes = {}
      this.connections = []
      this.currnode = 0
    }
    addNode(id,str,xpos,ypos,col) {
      this.nodes[id] = {
        x: xpos,
        y: ypos,
        info: str,
        colour: col,
      }
    }
    connectNodes(n1,n2) {
      if (this.connections[n1] === undefined) {
        this.connections[n1] = [n2]
      } else {
        this.connections[n1].push(n2)
      }
    }
    eventCheck(fn) {
      this.currnode = 0
      Object.keys(this.nodes).forEach(n => {
        if (this.nodes[n].x*windowWidth > mouseX - 5 
            && this.nodes[n].x*windowWidth < mouseX + 5
            && this.nodes[n].y > mouseY - 5
            && this.nodes[n].y < mouseY + 5) {
          this.currnode = n
          if (mouseIsPressed) {
            fn()
          }
        }
      })
    }
    display() {
      strokeWeight(0)
      fill('white')
      text(`Node: ${this.currnode}`, 20, 20)
      this.connections.forEach((arr, idx) => {
        strokeWeight(1)
        arr.forEach(el => {
          stroke(lerpColor(color(this.nodes[idx].colour),
                            color(this.nodes[el].colour),
                            0.5))
          line(this.nodes[idx].x*windowWidth, this.nodes[idx].y,
             this.nodes[el].x*windowWidth, this.nodes[el].y)
        })
      })
      Object.keys(this.nodes).forEach(n => {
        strokeWeight(10)
        stroke(this.nodes[n].colour)
        point(this.nodes[n].x*windowWidth, this.nodes[n].y)
      })
    }
  }
  
  function detColour(xpos) {
    let ret;
    if (xpos < 0.125) {
      ret = '#EE5475'
    } else if (xpos < 0.25) {
      ret = '#EE41BC'
    } else if (xpos < 0.375) {
      ret = '#E430FC'
    } else if (xpos < 0.5) {
      ret = '#C852FF'
    } else if (xpos < 0.625) {
      ret ='#A46CFF'
    } else if (xpos < 0.75) {
      ret = '#847AFF'
    } else if (xpos < 0.825) {
      ret = '#5285FF'
    } else {
      ret = '#208BFE'
    }
    return ret;
  }
  
  function setup() {
    let canvas = createCanvas(windowWidth, 300)
    canvas.parent('sketch')
    g = new Graph()
    button = createButton()
    button.html('<i class="fa-solid fa-paper-plane"></i>&nbsp;Submit')
    button.class('colourbutton')
    let em = document.getElementById('editmodal')
    button.parent(em)
    // idx, statement, xval\in[0,1], yval, col
    /*arr = [1,'',0.5,150]
    g.addNode(...arr,detColour(arr[2]))
    g.addNode(2,'',0.5,200,detColour(0.5))
    g.addNode(3,'',0.75,200,detColour(0.75))
    g.connectNodes(1,2)
    g.connectNodes(1,3)*/
  }
 
  function onClickFill(postdata) {
    httpPost(url, 'json', postdata, response => {
        
    })
  } 
  
  function draw() {
    background('#23242A')
    g.eventCheck(() => {console.log('hello')})
    g.display()
  }