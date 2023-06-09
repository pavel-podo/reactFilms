import React from "react"
import Svg, {  G, Circle, Path } from "react-native-svg"
import {textC} from '../data/const'

export  function SVGnoImg() {
    return (
        <Svg 
        height="100%" width="80%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" stroke="grey" fill={textC}>
          <Path d="M213.4 433.2c38.4 0 69.7-31.4 69.7-69.8s-31.3-69.7-69.7-69.7c-38.4 0-69.7 31.2-69.7 69.7-.1 38.4 31.2 69.8 69.7 69.8zm0-105.9c19.9 0 36.1 16.2 36.1 36.1 0 20-16.2 36.1-36.1 36.1-20 0-36.2-16.2-36.2-36.1 0-19.9 16.2-36.1 36.2-36.1z" />
          <Path d="M10 165.9v668.2h980V165.9H10zm78.3 623.6l216.3-216.4L521 789.5H88.3zm857.2 0h-362L422 630.4l221.4-220.1 302 303.2v76zm0-139L643.6 348.6l-252.9 253-86.1-86.1-250 250V210.4h890.9v440.1z" />
        </Svg>
      )
}


export function SVGnoPhoto() {
  return (
    <Svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <G fill="gray">
        <Circle cx={256} cy={129.92} r={129.92} />
        <Path d="M461.696 512C459.456 387.904 368.32 288.016 256 288.016S52.544 387.904 50.304 512h411.392z" />
      </G>
    </Svg>
  )
}




