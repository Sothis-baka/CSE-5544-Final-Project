const compareSet = (setA, setB) => {
    if(setA.size !== setB.size)
        return false;

    for(let temp of setA){
        if(!setB.has(temp))
            return false;
    }

    return true;
}

export default compareSet;