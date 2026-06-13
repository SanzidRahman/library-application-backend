// 404 Error handler
export const notFoundHandler = async ( req , res , next ) => {
        next("Requested Url not found ")
}

// Error handler
export const errorHandler = async (err , req , res , next ) => {
    if(err.message){
        res.json({
            message: err.message,
            status: 500
        })
    }else{
         res.json({
            message: "There was an server Error",
            status: 500
        })
    }
}

