import React from 'react'

export const  getScreensize = () => {
    return new Promise((resolve, reject) => {
        console.log("starting getScreensize...")
        const output = {
            "winWidth": window.innerWidth,
            "winHeight": window.innerHeight,
        }
        console.log("Window:", output)
        resolve(output)
    });
}
