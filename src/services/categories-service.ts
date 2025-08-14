import Category from "../models/category-model.js";

export default {
    async getAll(){
        const data = await Category.find().sort( { createdAt: 1 } );
        return data;
    },
    async getOne(id: string){
        const data = await Category.findOne({ _id: id});
        return data;
    },
    async create(data: object){

        const creadtedData = await Category.create(data);
        return creadtedData;
    },
    async update(id: string, updateData: object){
        const updateContact = await Category.findByIdAndUpdate(id, updateData, {new: true, runValidators: true });
        
        return this.getOne(updateContact?.id);
    },
    async delete(id: String){
        return await Category.findByIdAndDelete(id);
    },
    async getAllLimit(limit: number){
        return await Category.find()
                .sort({ createdAt: -1 })  
                .limit(limit);           
    }
}