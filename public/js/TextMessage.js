class TextMessage{
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement(){
        // create element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `)

        // init typewriter effect
        this.revealingtext = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text,

        })

        this.element.querySelector("button").addEventListener("click",()=>{
            // close message
            this.done();
        });


        this.actionListener = new KeyPressListener("Enter", ()=>{
           
            this.done()
        })
    }

    done(){

        if(this.revealingtext.isDone){
            this.element.remove();
            this.onComplete();
        }else{
            this.revealingtext.warpToDone();
        }
       

    }

    init(container){
        this.createElement();
        container.appendChild(this.element)
        this.revealingtext.init()
    }
}