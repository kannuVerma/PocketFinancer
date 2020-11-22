/* eslint-disable no-throw-literal */
const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const budgets = mongoCollections.budget;
const users = mongoCollections.users;

module.exports = {
    async getBudgetById(id) {
    
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
      async getUserAllBudgets(userId){

        if (typeof userId == "string") {
          userId = ObjectId.createFromHexString(userId);
        }
        const userCollection = await users();
        let user = await userCollection.findOne({ _id: userId })
        let allBudgets = [] ;

        
        allBudgets = await Promise.all( user.budgetIds.map(async budget => {
          return await this.getBudgetById(budget);
        }))
        
        return allBudgets;
      },
    async addBudget(
        amount,
        cateogry
      ) {
        // if (!date) throw `You must provide date`;
        if (!amount) throw `You must provide amount`;
        if (!cateogry) throw `You must provide cateogory`;
        if (amount) {
          if (typeof amount != "number") throw `Please give a valid number`;
        }       
        const budgetCollection = await budgets();   
        let newbudget = {
            amount: amount,  
            cateogry: cateogry       
          }; 
        const insertInfo = await budgetCollection.insertOne(newbudget);
        if (insertInfo.insertedCount === 0) throw `Could not add User`;    
        const newId = insertInfo.insertedId;
        const budget = await this.getBudgetById(newId);
        return budget;
      },
      async deleteBudget(
        userId, budgetId
      ) {
        if(!budgetId) throw `No Budget id given to be deleted`;
        
        
        const budgeIdString = budgetId;
        if (typeof budgetId == "string") {
          budgetId = ObjectId.createFromHexString(budgetId);
        }
        
        const budgetCollection = await budgets();
        const removedBudget = await budgetCollection.deleteOne({"_id": budgetId });

        const userCollection = await users();
        const updateBudget = {budgetIds:  budgeIdString};
        const updatedInfo = await userCollection.updateOne(
          { _id: ObjectId.createFromHexString(userId) },
          { $pull: updateBudget }
        )
        if (updatedInfo.modifiedCount === 0) {
          throw `could not delete the budget from users table`;
        }
        return budgeIdString;
      }
};