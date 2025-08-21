import Order from "../models/order-model.js";

export default {
    async getAll(){
        const data = await Order.find().sort( { createdAt: 1 } );
        return data;
    },
    async getOne(id: string){
        const data = await Order.findOne({ _id: id});
        return data;
    },
    async create(data: object){

        const creadtedData = await Order.create(data);
        return creadtedData;
    },
    async update(id: string, updateData: object){
        const update = await Order.findByIdAndUpdate(id, updateData, {new: true, runValidators: true });

        return update;
    },
    async delete(id: String){
        return await Order.findByIdAndDelete(id);
    },
    async getAllLimit(limit: number){
        return await Order.find()
                .sort({ createdAt: -1 })  
                .limit(limit);           
    }
}