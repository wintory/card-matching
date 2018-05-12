import React, { Component } from 'react';
import '../App.css';
import styled from 'styled-components'
import { Select } from 'antd';
import CardBox from './CardBox'
const shuffle = require("shuffle-array");

class App extends Component {
  img = ['https://image.flaticon.com/icons/svg/188/188987.svg',
    'https://image.flaticon.com/icons/svg/189/189001.svg',
    'https://image.flaticon.com/icons/svg/188/188990.svg',
    'https://image.flaticon.com/icons/svg/188/188989.svg',
    'https://image.flaticon.com/icons/svg/188/188993.svg',
    'https://image.flaticon.com/icons/svg/189/189000.svg',
    'https://image.flaticon.com/icons/svg/188/188988.svg',
    'https://image.flaticon.com/icons/svg/188/188995.svg',
    'https://image.flaticon.com/icons/svg/188/188997.svg',
    'https://image.flaticon.com/icons/svg/188/188996.svg',
    'https://image.flaticon.com/icons/svg/188/188998.svg',
    'https://image.flaticon.com/icons/svg/189/189006.svg',
    'https://image.flaticon.com/icons/svg/188/188991.svg',
    'https://image.flaticon.com/icons/svg/188/188992.svg',
    'https://image.flaticon.com/icons/svg/189/189004.svg',
    'https://image.flaticon.com/icons/svg/189/189005.svg']
  newImg = [...this.img]
  state = {
    img: [],
    gameStart: false,
    cardRange: 12,
    loading: false,
    pickUp: [],
    same: null,
    score: 0
  }

  async newGame(val) {
    await setTimeout(this.shuffleCard(val), 3000)
    await this.stopLoading()
  }

  stopLoading = () => {
    this.setState({ loading: false })
  }

  endGame = (val) => {
    if (val !== null) {
      alert('congratulation!!')
      this.setState({
        gameStart: false,
        showAll: true,
        loading: false,
        score: 0
      })
    } else {
      alert('game over!!')
      this.setState({
        gameStart: false,
        showAll: true,
        loading: false,
        score: 0
      })
    }
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
        alert('card not match!!')
        this.setState({ pickUp: [], same: null })
      } else {
        this.deleteCard(img)
      }
    } else {
      alert('do not pick the same card!!')
      this.setState({ pickUp: [], same: null })
    }
    this.chkScore()
  }

  deleteCard = (img) => {
    this.setState({
      img: this.state.img.filter(thisimg => {
        if (thisimg !== img) {
          return thisimg
        }
      }),
      pickUp: [],
      same: null,
      score: this.state.score + 1
    })
  }

  chkScore = () => {
    if (this.state.score === (this.state.cardRange / 2)) {
      this.deleteCard('complete')
    }
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
              <h3 className={this.state.gameStart === true ? '' : 'hidden'}>  score : {this.state.score}</h3>
            </div>
          </div>

          <div className='row'>
            <CardBox showAll={this.state.showAll} pickCard={this.state.same} pushPickup={this.pushPickup} loading={this.state.loading} gameStart={this.state.gameStart} imgPick={this.state.img} />
          </div>
        </div>
      </div >
    );
  }
}

export default App;
