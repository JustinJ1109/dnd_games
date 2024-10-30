// Die.js File
import React, { Component } from 'react'
import '../styles/die.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo } from '@fortawesome/free-solid-svg-icons'
class Die extends Component {
    render() {
        const { face, rolling } = this.props

        const dice = {
            one: faDiceOne,
            two: faDiceTwo,
            three: faDiceThree,
            four: faDiceFour,
            five: faDiceFive,
            six: faDiceSix
        }

        // Using font awesome icon to show
        // the exactnumber of dots
        return (
            <div>
                <FontAwesomeIcon icon={dice[face]} className={`Die 
                ${rolling && 'Die-shaking'}`} />
            </div >
        )
    }
}

export default Die
