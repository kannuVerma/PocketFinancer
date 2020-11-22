/* eslint-disable no-throw-literal */
const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const expenses = mongoCollections.expense;
const users = mongoCollections.users;

module.exports = {
    async getExpenseById(id) {
    
        if (!id) throw Object.assign(
          new Error("Id not found"),
          { code: 404 }
       );
        
        if (typeof id !== "string" && typeof id != "object") throw `Id Invalid`;
        if (typeof id == "string") {
          id = ObjectId.createFromHexString(id);
        }
        const expenseCollection = await expenses();
    
        let expense = await expenseCollection.findOne({ _id: id });
        
        if (expense === null) throw `No expense with that id`;
        return expense;
      },
      async getUserAllExpenses(userId){

        if (typeof userId == "string") {
          userId = ObjectId.createFromHexString(userId);
        }
        const userCollection = await users();
        let user = await userCollection.findOne({ _id: userId })
        let allExpenses = [] ;

        
        allExpenses = await Promise.all( user.expenseIds.map(async expense => {
          return await this.getExpenseById(expense);
        }))
        
        return allExpenses;
      },
    async addExpense(
        date,
        amount,
        desc,
        cateogry
      ) {
        if (!date) throw `You must provide date`;
        if (!amount) throw `You must provide amount`;
        if (!desc) throw `You must provide desc`;
        if (!cateogry) throw `You must provide cateogory`;
        if (amount) {
          if (typeof amount != "number") throw `Please give a valid number`;
        }
        if (desc) {
          if (typeof desc != "string")
            throw { errocode: 400, field: "Please add description" };
        }
        const expenseCollection = await expenses();  
        // console.log(req.session.user) 
        let newExpense = {
            date: date,
            amount: amount,  
            desc: desc,
            cateogry: cateogry       
          }; 
        const insertInfo = await expenseCollection.insertOne(newExpense);
        // const expense = await this.getExpenseById(newId);
        // const userExpenseInfo = await userCollection.insertOne(newExpense.id);
        if (insertInfo.insertedCount === 0) throw `Could not add User`;    
        const newId = insertInfo.insertedId;
        const expense = await this.getExpenseById(newId);
        return expense;
      },
      async deleteExpense(
        userId, expenseId
      ) {
        if(!expenseId) throw `No expense id given to be deleted`;
        console.log(userId , expenseId , "jay")
        // const expense = await this.getExpenseById(expenseId);
        const expenseIdString = expenseId;
        if (typeof expenseId == "string") {
          expenseId = ObjectId.createFromHexString(expenseId);
        }
        
        const expenseCollection = await expenses();
        const removedExpense = await expenseCollection.deleteOne({"_id": expenseId });

        const userCollection = await users();
        const updateExpense = {expenseIds:  expenseIdString};
        console.log("Expense id to be deleted", expenseId);
        const updatedInfo = await userCollection.updateOne(
          { _id: ObjectId.createFromHexString(userId) },
          { $pull: updateExpense }
        )
        if (updatedInfo.modifiedCount === 0) {
          throw `could not delete the expense from users table`;
        }
        return expenseIdString;
      }
};