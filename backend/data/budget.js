const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const budgets = mongoCollections.budget;

module.exports = {
    async getbudgetById(id) {
    
        if (!id) throw Object.assign(
          new Error("Id not found"),
          { code: 404 }
       );
        
        if (typeof id !== "string" && typeof id != "object") throw `Id Invalid`;
        if (typeof id == "string") {
          id = ObjectId.createFromHexString(id);
        }
        const budgetCollection = await budgets();
    
        let budget = await budgetCollection.findOne({ _id: id });
        
        if (budget === null) throw `No budget with that id`;
        return budget;
      },
    async addbudget(
        date,
        amount,
        cateogry
      ) {
        if (!date) throw `You must provide date`;
        if (!amount) throw `You must provide amount`;
        if (!cateogry) throw `You must provide cateogory`;
        if (amount) {
          if (typeof amount != "number") throw `Please give a valid number`;
        }       
        const budgetCollection = await budgets();   
        let newbudget = {
            date: date,
            amount: amount,  
            cateogry: cateogry       
          }; 
        const insertInfo = await budgetCollection.insertOne(newbudget);
        if (insertInfo.insertedCount === 0) throw `Could not add User`;    
        const newId = insertInfo.insertedId;
        const budget = await this.getbudgetById(newId);
        return budget;
      }
};