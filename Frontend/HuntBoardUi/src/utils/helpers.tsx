import type { Profile, SetState } from "./types"

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

export const sanitizePhoneNumber = (val: string) => {

    let temp = val; 
    temp = temp.replaceAll(/(\D)/g,  "")

    if(temp.length > 10) {
        temp = temp.substring(0,11)
    }

    return temp;

}

export const getChangeHandler = (setterFunc: (val: string) => void, sanitizer?: (val: string) => string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        let data = sanitizer ? sanitizer(e.target.value) : e.target.value;
        setterFunc(data)
    }
}

export const formatPhoneNum = (num: string) => {
    return `${num.substring(0,3)}-${num.substring(3,6)}-${num.substring(6)}`
}

export const generateSectionToggleButton = (state: boolean, setState: SetState<boolean>) => {
    return <button onClick={() => {
        setState(val => !val)
    }}>
        {state ? '+' : '-'}
    </button>
}