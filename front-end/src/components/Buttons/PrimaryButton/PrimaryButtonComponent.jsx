import { PrimaryButton, PrimaryButton_Text } from "./PrimaryButton.style"
import {Link } from 'react-router-dom'

function PrimaryButtonComponent({label, icon, onClick=null, linkTo=null}) {
  return (
    <PrimaryButton>
        <PrimaryButton_Text>
            {label}    
        </PrimaryButton_Text>
    </PrimaryButton>  
)
}
export default PrimaryButtonComponent