import { spinnerProps } from './types'
import { useSpinner } from './useSpinner'

export const Spinner: React.FC<spinnerProps> = (props) => {
  const {
    spinnerContainerStyle,
    spinnerDivStyle,
    spinnerDiv1Style,
    spinnerDiv2Style,
    spinnerDiv3Style,
    keyframes,
  } = useSpinner(props)

  return (
    <div style={spinnerContainerStyle}>
      <style>{keyframes}</style>
      <div style={{ ...spinnerDivStyle, ...spinnerDiv1Style }} />
      <div style={{ ...spinnerDivStyle, ...spinnerDiv2Style }}></div>
      <div style={{ ...spinnerDivStyle, ...spinnerDiv3Style }}></div>
    </div>
  )
}
