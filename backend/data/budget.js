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
        if( user.budgetIds === undefined){
          user.budgetIds = [];
        }
        
        allBudgets = await Promise.all( user.budgetIds.map(async budget => {
          return await this.getBudgetById(budget);
        }))
        
        return allBudgets;
      },
    async addBudget(
        userId,
        amount,
        category
      ) {
        // if (!date) throw `You must provide date`;
        if (!amount) throw `You must provide amount`;
        if (!category) throw `You must provide cateogory`;
        if (amount) {
          if (typeof amount != "number") throw `Please give a valid number`;
        }  
        const userIdBudgets = await this.getUserAllBudgets(userId);


        const budgetInfo = userIdBudgets.filter (element => {
          return (element.category === category)
        })
        const budgetCollection = await budgets();   
        if(budgetInfo.length > 0){
          let newbudget = {
            amount: amount,  
            category: category,
            // _id: budgetInfo[0]._id     
          }; 
          const updatedInfo = await budgetCollection.updateOne({_id: budgetInfo[0]._id  }, {$set: newbudget});
          
          if (updatedInfo.modifiedCount === 0) throw `Could not update`;          
          const budget = await this.getBudgetById(budgetInfo[0]._id);
          return budget;
        }else{
          
          let newbudget = {
              amount: amount,  
              category: category       
            }; 
          const insertInfo = await budgetCollection.insertOne(newbudget);
          if (insertInfo.insertedCount === 0) throw `Could not update`;    
          const newId = insertInfo.insertedId;
          const budget = await this.getBudgetById(newId);
          return budget;
        }
        
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
      },
      async updatedBudget(
        budgetId, updatedBudget
      ) {
          const budgetCollection = await budgets();
          const updatedBudgetData = {};

          if(typeof(budgetId) != "string" && typeof(budgetId) != "object")
            throw 'Wrong input';

          if (typeof(budgetId) == "string") {
            budgetId = ObjectId.createFromHexString(budgetId);
          }
          const toEditBudget = await this.getBudgetById(budgetId);
          if(toEditBudget === null) throw 'No budget found';

          if(updatedBudget.category) {
            if(typeof(updatedBudget.category) != "string")
              throw 'Wrong input type';
            updatedBudgetData.category = updatedBudget.category;
          }

          if(updatedBudget.amount) {
            if(typeof(updatedBudget.amount) != "number")
              throw 'Wrong input type';
            updatedBudgetData.amount = updatedBudget.amount;
          }

          const updatedInfo = await budgetCollection.updateOne({_id: budgetId}, {$set: updatedBudgetData});
        if (updatedInfo.modifiedCount === 0) {
        throw 'could not update band successfully';
        }

        return await this.getBudgetById(budgetId);
          
      }
};