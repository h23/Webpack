let A = [1,2,3];
coding = ()=>{
    console.log(...A);
    return `${A} I'm coding`;
}

document.getElementById('app').innerText=coding();