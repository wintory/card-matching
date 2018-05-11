import React, { Component } from 'react'
import '../App.css'
import logo from './pokemon/188987.svg'

export default class CardBox extends Component {
    render() {
        return (
            <div className='col-12'>
                <div className={this.props.loading === false && this.props.gameStart === true ? 'form-inline' : 'form-inline hidden'}>
                    {this.props.imgPick.map((img, i) => {
                        return (
                            <div key={i} className='col-2 offset-1' onClick={() => this.props.pushPickup(img, i)} >
                                <div className={this.props.pickCard === i ? 'hidden' : ''} style={{ border: 'black', backgroundColor: 'black', height: 150, marginBottom: '2%' }} ></div>
                                <img src={logo} className={this.props.pickCard === i ? '' : 'hidden'} style={{ height: 150, marginBottom: '2%' }} />
                            </div>
                        )
                    })}
                </div>
                <div className={this.props.loading === true ? 'App offset-5 form-inline loader' : ' form-inline hidden'} />
            </div >

        )
    }
}