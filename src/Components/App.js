import React, { Component } from 'react';
import '../App.css';
import styled from 'styled-components'
import { Select } from 'antd';
import CardBox from './CardBox'
const shuffle = require("shuffle-array");

class App extends Component {
  img = [188987, 188988, 188989, 188990, 188991, 188992, 188993, 188994, 188995, 188996, 188997, 188998, 188999, 189001, 189004, 189006]
  newImg = [...this.img]
  state = {
    img: [],
    gameStart: false,
    cardRange: 12,
    loading: false,
    pickUp: [],
    same: null,
  }

  async newGame(val) {
    await setTimeout(this.shuffleCard(val), 3000)
    await this.stopLoading()
  }

  stopLoading = () => {
    this.setState({ loading: false })
  }

  endGame = (val) => {
    this.setState({
      gameStart: false,
      img: [],
      loading: false
    })
  }

  shuffleCard = (num) => {
    let pick = num / 2
    let thisimg = shuffle.pick(this.newImg, { 'picks': pick })
    let final = shuffle([...thisimg, ...thisimg])
    this.setState({ img: [...final], loading: true, gameStart: true })
  }

  setRange = (value) => {
    this.setState({
      cardRange: value
    })
  }

  pushPickup = (img, i) => {
    if (this.state.same !== i) {
      if (this.state.pickUp.length === 0) {
        this.setState({ pickUp: [...this.state.pickUp, img], same: i })
      } else if (this.state.pickUp[0] !== img) {
        this.setState({ pickUp: [], same: null })
      } else {
        this.deleteCard(img)
      }
    } else {
      alert('do not pick the same card!!')
      this.setState({ pickUp: [], same: null })
    }
  }

  deleteCard = (img) => {
    this.setState({
      img: this.state.img.filter(thisimg => {
        if (thisimg !== img) {
          return thisimg
        }
      }),
      pickUp: [],
      same: null
    })
  }


  render() {
    const Button = styled.button`
    img: black;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid tomato;
    border-radius: 3px;
  `;


    return (
      <div className="App">
        <div className='container'>
          <div className='row'>
            <div className='form-inline'>
              <Button className={this.state.gameStart === false ? '' : 'hidden'} onClick={() => this.newGame(this.state.cardRange)}>New Game</Button>
              <Button className={this.state.gameStart === true ? '' : 'hidden'} onClick={() => this.endGame()}>End Game</Button>
              <div className="dropdown">
                <button className={this.state.gameStart === false ? 'btn btn-secondary dropdown-toggle' : 'hidden'} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.state.cardRange}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={() => this.setRange(12)} >12</a>
                  <a className="dropdown-item" onClick={() => this.setRange(20)}>20</a>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <CardBox pickCard={this.state.same} pushPickup={this.pushPickup} loading={this.state.loading} gameStart={this.state.gameStart} imgPick={this.state.img} />
          </div>
        </div>
      </div >
    );
  }
}

export default App;
