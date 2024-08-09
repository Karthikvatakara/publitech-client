
export const removeLocalStorage = (key:string) => {
    try{
        localStorage.removeItem(key)
    }catch(error){
        throw new Error((error as Error) ?.message || "error ocuured in remove local storage")
    }
}