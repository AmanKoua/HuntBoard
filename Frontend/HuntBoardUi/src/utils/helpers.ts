import type { Profile } from "./types"

export const panic = (msg: string) => {
    throw new Error(msg)
}

export const assert = (condition: boolean, msg: string) => {
    if (!condition) {
        panic(msg)
    }
}

export const getLocalProfile = (): Profile => {

    const profileString = localStorage.getItem("profile")

    assert(!!profileString, "expected profile to exist in localStorage, but was blank!")

    let profile: Profile

    try {
        profile = JSON.parse(profileString!)
    } catch (e) {
        panic("failed to parse local profile")
    }

    return profile!

}

export const getChangeHandler = (setterFunc: (val: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        setterFunc(e.target.value)
    }
}

export const formatPhoneNum = (num: string) => {
    return `${num.substring(0,3)}-${num.substring(3,6)}-${num.substring(6)}`
}