window.addEventListener("load",function(){


    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let flowFieldAnimation;
    
    window.addEventListener("resize", () => {
      cancelAnimationFrame(flowFieldAnimation);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const flowField = new FlowFieldEffect(
          context,
          canvas.width,
          canvas.height
        );
        flowField.animate(0);
    });
    
  
  class FlowFieldEffect{
      #context;
      #width;
      #height;
      constructor(context,width,height) {
          this.#context=context;
          this.#width=width;
          this.#height=height;
          this.angle = 0;
          this.lastTime=0;
          this.interval = 40;
          this.timer = 0;
          this.cellSize=20;
          this.length=25;
          this.#context.lineWidth=1;
          this.#context.lineCap='round';
          this.gradient;
          this.#createGradient();
          this.#context.strokeStyle=this.gradient;
          this.radius=0;
          this.vr=0.01;
          
          
      }
      #createGradient(){
        this.gradient=this.#context.createLinearGradient(0,0,this.#width,this.#height);
        
        
        this.gradient.addColorStop(0, 'rgb(255, 248, 155)');
        this.gradient.addColorStop(0.5, 'rgb(252, 110, 188)');
        this.gradient.addColorStop(1,"rgb(113,255,212)");
      }
      #drawLine(angle,x,y){
        this.#context.beginPath();
        this.#context.moveTo(x, y);
        this.#context.lineTo(x+Math.cos(angle)*this.length, y+Math.sin(angle)*this.length);
        this.#context.stroke();
      }
      animate(timeStamp){
          const deltaTime = timeStamp - this.lastTime;
          this.lastTime = timeStamp;
          if (this.timer > this.interval) {
            this.#context.fillStyle='rgba(0,0,0,0.1)';
            this.#context.fillRect(0,0,this.#width,this.#height);
            this.#createGradient();
            this.radius+=this.vr;
            if(this.radius>10 || this.radius <-8)this.vr*=-1;
            for (let y = 0; y < this.#height; y += this.cellSize) {
              for (let x = 0; x < this.#width; x += this.cellSize) {
                const angle =
                  (Math.cos(x * 0.01) + Math.sin(y * 0.01))*this.radius ; 
                this.#drawLine(angle, x, y);
              }
            }
            this.timer=0;
      }else{
        this.timer+=deltaTime;
      }
      flowFieldAnimation = requestAnimationFrame(this.animate.bind(this)); 
  }
}
   
    
   
     
  
  const  flowField = new FlowFieldEffect(context, canvas.width, canvas.height);
      flowField.animate(0);



});