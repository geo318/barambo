import { CSSProperties } from 'react'
import { spinnerProps } from './types'

export const useSpinner = ({
  size = 64,
  unit = 'px',
  color = 'black',
}: spinnerProps) => {
  const spinnerContainerStyle: CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    height: `${size + Math.sqrt(size)}${unit}`,
    width: `${size + Math.sqrt(size)}${unit}`,
  }

  const spinnerDivStyle: CSSProperties = {
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    width: size,
    height: size,
    margin: `${Math.sqrt(size)}${unit}`,
    border: `${Math.sqrt(size)}${unit} solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
    borderColor: `${color} transparent transparent transparent`,
  }

  const spinnerDiv1Style: CSSProperties = {
    animationDelay: '-0.45s',
  }

  const spinnerDiv2Style: CSSProperties = {
    animationDelay: '-0.3s',
  }

  const spinnerDiv3Style: CSSProperties = {
    animationDelay: '-0.15s',
  }

  const keyframes = `
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }`

  return {
    spinnerContainerStyle,
    spinnerDivStyle,
    spinnerDiv1Style,
    spinnerDiv2Style,
    spinnerDiv3Style,
    keyframes,
  }
}
