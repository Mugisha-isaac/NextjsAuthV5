"use server"

export const register = async(values: any) =>{
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(values);
}