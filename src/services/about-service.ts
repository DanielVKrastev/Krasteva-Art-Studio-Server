import About from "../models/about-model.js";


export default {
    async getAll(){
        const data = await About.find().sort( { createdAt: 1 } );
        return data;
    },
    async getOne(id: string){
        const data = await About.findOne({ _id: id});
        return data;
    },
    async create(data: object){

        const creadtedData = await About.create(data);
        return creadtedData;
    },
    async update(id: string, updateData: object){
        const updateContact = await About.findByIdAndUpdate(id, updateData, {new: true, runValidators: true });
        
        return this.getOne(updateContact?.id);
    },
    async delete(id: String){
        return await About.findByIdAndDelete(id);
    },
    async getAllLimit(limit: number){
        return await About.find()
                .sort({ createdAt: -1 })  
                .limit(limit);           
    }
}