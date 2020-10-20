class Ground
{
    constructor(x,y,height)
    {
       var options=
        {
            isStatic:true,
            friction:5
        }
        this.body = Bodies.rectangle(x,y,displayWidth*5,height, options);
        this.width = displayWidth*5;
        this.height = height;
        World.add(world,this.body);
    }

    display()
    {
        var position = this.body.position;
        push();
        rectMode(CENTER);
        fill("brown");
        rect(position.x , position.y , this.width , this.height);
        pop();
    }
}