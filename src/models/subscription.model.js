import mongoose,{Schema, schema} from  "mongoose"

const subscriptionSchema= new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
       ref:"User"
    }
})  

export const Subscription=mongoose.model("Subscription",subscriptionSchema)