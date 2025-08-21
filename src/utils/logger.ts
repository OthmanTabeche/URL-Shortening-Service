const info = (...parms: any[]) => {
    console.info(...parms);
}

const warn = (...parms: any[]) => {
    console.warn(...parms);
}

const error = (...parms: any[]) => {
    console.error(...parms);
}

export default {
    info,
    warn,
    error
};