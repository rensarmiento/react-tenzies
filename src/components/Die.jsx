import React from "react"

export default function Die(props) {
    /**
     * List if props
     * - isHeld: boolean used to check if user has kept the value
     * - holdDice: function to keep dice number
     * - value: value of die (1-6)
     */
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}