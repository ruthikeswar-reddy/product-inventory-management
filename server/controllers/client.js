import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import getCountryIso3 from 'country-iso-2-to-3';

export const getProducts = async(req,res) => {
    try{

        const products = await Product.find();
        // the below function is very slow as it iterates through each and every product and add stats to it and returns it.
        // we wil change it later
        const productsWithStats = await Promise.all(
            products.map(async (product)=>{
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return{
                    ...product._doc,
                    stat,
                }
            })
            
        )
        res.status(200).json(productsWithStats);

    }catch(error){
        res.status(404).json({message:error.message})
    }
}


export const getCustomers = async (req, res) => {
    try{
        const customers = await User.find({role:"user"}).select("-password");

        res.status(200).json(customers);
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const getTransactions = async(req, res)=>{
    try{

        // sort looks like this:{"field":"userId", "sort":"desc"}
        // the above format comes from frontend request
        const {page = 1, pageSize = 20, sort=null, search=""} = req.query
        console.log(search);

        // formattes sort should look like {userId: -1(desc)}
        const generateSort = ()=>{
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort="asc"?1:-1
            };
            return sortFormatted;
        }
        const sortFormatted = Boolean(sort)? generateSort():{};

        const transactions = await Transaction.find({
            $or:[
                { cost: { $regex: new RegExp(search, "i")} },
                { userId: { $regex: new RegExp(search, "i")} }
            ]
        })
        .sort(sortFormatted)
        .skip(page * pageSize) // if the pageNo is 3 and pageSize is 20 it skips the first 60 records and gives the next 20 records.
        .limit(pageSize);


        const total = await Transaction.countDocuments({
            userId : { $regex: search, $options : "i"}
        });


        res.status(200).json({
            transactions,
            total
        })



    }catch(error){
        res.status(404).json({message:error.message});
    }
}

export const getGeography = async(req, res)=>{
    try{

        const users = await User.find();

        // the country id present in the user data is of two letter code 
        // the nivo global chart requires three letter code for country to plot
        // we are changing user country code to three letter as a key and value as count of the country
        // the format accepted by nivo chart is {{id:country_id, value:count}}
        const mappedLocations = users.reduce((acc, {country})=>{
            const countryISO3 = getCountryIso3(country);
            if (!acc[countryISO3]){
                acc[countryISO3]=0;
            }
            acc[countryISO3]++;
            return acc;
        },{})

        // looop through key value pair of above accumulator which contains

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) =>{
                return { id: country, value:count}
            }
        );
        res.status(200).json(formattedLocations);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}


