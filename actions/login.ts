 "use server"

 export const login = async(values: any) =>{
   await new Promise((resolve) => setTimeout(resolve, 1000));
   console.log(values);
 }