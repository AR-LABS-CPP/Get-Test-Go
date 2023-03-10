export const reduceDimensions = (arr) => {
    const dimReducedArr = []

    for (let idx = 0; idx < arr.length; idx++) {
        const item = arr[idx]

        if (Array.isArray(item)) {
            dimReducedArr.push(...reduceDimensions(item))
        }
        else {
            dimReducedArr.push(item)
        }
    }

    return dimReducedArr
}

export const combineTwoElements = (arr) => {
    const newArr = []

    for(let idx = 0; idx < arr.length; idx += 2) {
        newArr.push([arr[idx], arr[idx + 1]])
    }

    return newArr
}