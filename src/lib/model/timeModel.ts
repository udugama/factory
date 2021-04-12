let buitTime: number = 0

export const addBuiltTime = (time: number) => {
    buitTime = buitTime + time;
}

export const getBuiltTime = () => {
    return buitTime;
}

export const resetBuiltTime = () => {
    buitTime = 0;
}
