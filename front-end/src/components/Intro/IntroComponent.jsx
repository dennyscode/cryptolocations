import {Intro, Intro__text, Intro__title } from "./Intro.style"

function IntroComponent({user}) {  

    return (
      <>
        <Intro>
            <Intro__title>Welcome!  { user && user.name }</Intro__title>
            <Intro__text>Shops Dashboard</Intro__text>
        </Intro>
    </>)
}
export default IntroComponent