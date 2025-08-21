const generateShortCode = (): string => {
    const chars: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let result = ""

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        result += chars[randomIndex]
    }

    return result

}

export default generateShortCode;