import styled from 'styled-components'


export const PrimaryButton = styled.button`
    padding: 10px 20px;
    border: 1px solid #000;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    appearance: button;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const PrimaryButton_Text = styled.span`
    margin-left: 8px;
`

export const PrimaryButtonCallForAttention = styled(PrimaryButton)`
    position: absolute;
    bottom: 24px;
    left: 50%;
    width: 208px;
    transform: translateX(-50%);
`
