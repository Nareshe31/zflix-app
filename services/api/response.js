
const responseHandler=(res)=>res.data
const errorHandler=(error)=>{
    console.log(error);
    let err=new Error(error?.response?error.response.data.message:"Something went wrong! Try again later")
    throw err
}

export {responseHandler,errorHandler}