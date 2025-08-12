import Painting from "../models/painting-model.js";

export default {
    async getAll(){
        const data = await Painting.find().sort( { createdAt: 1 } );
        return data;
    },
    async getOne(id: string){
        const data = await Painting.findOne({ _id: id});
        return data;
    },
    async create(data: object){

        const creadtedData = await Painting.create(data);
        return creadtedData;
    },
    async update(id: string, updateData: object){
        const updateContact = await Painting.findByIdAndUpdate(id, updateData, {new: true, runValidators: true });
        
        return this.getOne(updateContact?.id);
    },
    async delete(id: String){
        return await Painting.findByIdAndDelete(id);
    },
    async getAllLimit(limit: number){
        return await Painting.find()
                .sort({ createdAt: -1 })  
                .limit(limit);           
    }
}