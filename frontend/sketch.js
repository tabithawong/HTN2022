let g, button, count = 0;

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
            && this.nodes[n].y*100 + 100 > mouseY - 5
            && this.nodes[n].y*100 + 100 < mouseY + 5) {
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
          //console.log(`el: ${el}, cons: ${this.connections}`)
          if (el < this.nodes.size) {
            stroke(lerpColor(color(this.nodes[idx].colour),
                            color(this.nodes[el].colour),
                            0.5))
            line(this.nodes[idx].x*windowWidth, this.nodes[idx].y*100 + 100,
              this.nodes[el].x*windowWidth, this.nodes[el].y*100 + 100)
          }
        })
      })
      Object.keys(this.nodes).forEach(n => {
        strokeWeight(10)
        stroke(this.nodes[n].colour)
        point(this.nodes[n].x*windowWidth, this.nodes[n].y*100 + 100)
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
    button = createButton('')
    button.html('<i class="fa-solid fa-paper-plane"></i>&nbsp;Submit')
    button.class('colourbutton')
    let em = document.getElementById('editmodal')
    button.parent(em)
    button.mousePressed(onClickFill)
    // idx, statement, xval\in[0,1], yval, col
    /*arr = [1,'',0.5,150]
    g.addNode(...arr,detColour(arr[2]))
    g.addNode(2,'',0.5,200,detColour(0.5))
    g.addNode(3,'',0.75,200,detColour(0.75))
    g.connectNodes(1,2)
    g.connectNodes(1,3)*/
  }
 
  let url = 'http://localhost:6969/users';
  function onClickFill() {
    postdata = {'data': document.getElementById('data-input').value}
    httpPost(url, 'text', postdata, response => {
        console.log(response)
        const values = JSON.parse(response)
        console.log(values)
        let nodes = values['nodes']
        let edges = values['edges']
        console.log(edges)
        //let mean = values[2]
        //let varience = values[3]
        g = new Graph()
        nodes.forEach(node => {
            g.addNode(...node, detColour(node[2]))
        })
        if (edges.length == 2) {
            g.connectNodes(0,1)
        } else if (edges.length > 2) {
            edges.forEach(edge => {
                g.connectNodes(edge[0],edge[1][0])
                g.connectNodes(edge[0],edge[1][0])
            })
        }
    })
    count += 1
  } 

  function draw() {
    background('#23242A')
    g.eventCheck(() => {console.log('hello')})
    g.display()
  }