
export const getLocalStorage = (key:string) => {
    try{
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null
    }catch(error){
        throw new Error((error as Error)?.message || "error occured in getlocalstorage")
    }
}