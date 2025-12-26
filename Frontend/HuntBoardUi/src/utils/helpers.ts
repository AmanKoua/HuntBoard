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