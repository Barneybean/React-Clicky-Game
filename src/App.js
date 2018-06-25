import React, {Component} from "react";
import Wrapper from "./components/wrapper";
import Container from "./components/container";
import Characters from "./components/Characters";
import Footer from "./components/footer";
import pictures from "./Pictures.json";
import "./App.css";


class App extends Component {
    state ={
        images: pictures,
        lastClikedId: "",
        score: 0,
        topScore: 0,
        life: 3,
        notice: "Click an image to begin! Scores start counting after first click"
    };

    shuffle = (arr, id) => {
        let currentIndex = arr.length;
        let tempVal = 0;
        let randomIndex = 0;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1;
            tempVal = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = tempVal;
        };

        this.setState({images: arr});
        this.compare(id);
    };

    compare = id => {
        console.log(id, this.state.lastClickedId)
        if (this.state.lastClickedId === undefined) {
            this.setState({lastClickedId: id, notice: "Click an image to begin!"});
            
        } else if (id !== this.state.lastClickedId) {
            this.setState({
                lastClickedId: id, 
                score: this.state.score + 1,
                notice: "You guessed correctly!",
            })
            console.log(this.state.score) 
            //this will not reflect new change but i can do a if in render and call a function to setstate again
            
            if (this.state.topScore <= this.state.score) {
                this.setState({
                    topScore: this.state.score + 1
                })
            }

        } else if (id === this.state.lastClickedId) {
            //add shaking effect here
            this.setState({
                notice: "You guessed incorrectly!",
                life: this.state.life -1
            })
            console.log(this.state.life)
            if (this.state.life === 1) {
                this.setState({
                    lastClikedId: "",
                    score: 0,
                    life: 3,
                    notice: `Game over, Your topScore is ${this.state.topScore}, Click an image to begin!`
                })
            }
            
        }
    }
    
    render() {
        return (
        <Wrapper>
            <nav className="navbar navbar-dark fixed-top">
                <div className="col-md-3">
                    <a className="navbar-brand font-weight-bold mx-auto pr-0" to="/">
                        Click-Click Boom!!
                    </a>
                </div>
                <div className= {this.state.notice === "You guessed incorrectly!" ? "col-md-5 notice pr-5 text-danger" : "col-md-5 notice pr-5 text-success"}> 
                    {this.state.notice}
                </div>
                <div className="col-md-4 counter pl-5"> 
                    Score: {this.state.score} | Top Score: {this.state.topScore} | Life: {this.state.life}
                </div>
            </nav>

            <Container notice={this.state.notice}>
                {this.state.images.map(pictures => (
                    <Characters
                        // feed funciton to front end on lick function aka characters component
                        shuffle = {this.shuffle}
                        id = {pictures.id}
                        key = {pictures.id}
                        image={pictures.image}
                        arr = {this.state.images}
                    />
                ))}
            </Container>

            <Footer />
        </Wrapper>
      )
    }
}

export default App;