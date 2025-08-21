import Size from "../models/size-model.js";

export default {
    async getAll(){
        const data = await Size.find().sort( { createdAt: 1 } );
        return data;
    },
    async getOne(id: string){
        const data = await Size.findOne({ _id: id});
        return data;
    },
    async create(data: object){

        const creadtedData = await Size.create(data);
        return creadtedData;
    },
    async update(id: string, updateData: object){
        const update = await Size.findByIdAndUpdate(id, updateData, {new: true, runValidators: true });
        
        return update;
    },
    async delete(id: String){
        return await Size.findByIdAndDelete(id);
    },
    async getAllLimit(limit: number){
        return await Size.find()
                .sort({ createdAt: -1 })  
                .limit(limit);           
    }
}