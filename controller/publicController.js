// Home Route
export const homePage = async (req , res) => {
    try {
        res.json({
            message: "welcome Home",
            status: 200
        })
    } catch (error) {
         res.json({
            message: error.message,
            status: 400
        })
        console.log(error)
    }
}

