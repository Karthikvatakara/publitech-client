

export const setLocalStorage = async(key:string,value:any) => {
    try{
        localStorage.setItem(key,JSON.stringify(value))
    }catch(error){
        throw new Error((error as Error)?.message || "error in setting data in localstorage")
    }
}