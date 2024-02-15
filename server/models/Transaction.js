import mongoose from 'mongoose';

const TransactionSchmea = new mongoose.Schema(
    {

        userId:String,
        cost:String,
        products:{
            type:[mongoose.Types.ObjectId],
            of:Number,
        },
    },
    {timestamps:true},

);

const Transaction = mongoose.model("Transaction", TransactionSchmea);
export default Transaction;