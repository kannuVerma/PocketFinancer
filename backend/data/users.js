/* eslint-disable no-throw-literal */
const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const users = mongoCollections.users;

const bcrypt = require("bcrypt"); //Importing the NPM bcrypt package.
const salt = 10; //We are setting salt rounds, higher is safer.

module.exports = {
  async getUserById(id) {
    
    if (!id) throw Object.assign(
      new Error("Id not found"),
      { code: 404 }
   );
    
    if (typeof id !== "string" && typeof id != "object") throw `Id Invalid`;
    if (typeof id == "string") {
      id = ObjectId.createFromHexString(id);
    }
    const userCollection = await users();

    let user = await userCollection.findOne({ _id: id });
    
    if (user === null) throw `No User with that id`;
    return user;
  },
  async getUserByEmail(email) {
    if (!email) throw `Provide email id`;
    if (typeof email !== "string") throw `Id Invalid`;

    const userCollection = await users();
    let user = await userCollection.findOne({ email: email });

    return user;
  },
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
  async addExpenseToUser(
    userId, expenseId
  ){
    const userCollection = await users();
    const updateExpense = {expenseIds:  expenseId}  
    if (typeof userId == "string") {
      userId = ObjectId.createFromHexString(userId);
    }
    
    const updatedInfo = await userCollection.updateOne(
      { _id: userId },
      { $addToSet: updateExpense }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw `could not update`;
    }
    return updatedInfo;
  },
  async addBudgetToUser(
    userId, budgetId
  ){
    const userCollection = await users();
    const updateBudget = {budgetIds:  budgetId}  
    if (typeof userId == "string") {
      userId = ObjectId.createFromHexString(userId);
    }
    
    const updatedInfo = await userCollection.updateOne(
      { _id: userId },
      { $addToSet: updateBudget }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw `could not update`;
    }
    return updatedInfo;
  },
  
    async addUser(
        firstName,
        lastName,
        email,
        password, 
      ) {
        if (!firstName) throw `You must provide first name`;
        if (!lastName) throw `You must provide last name`;
        if (!email) throw `You must provide email`;
        if (!password) throw `You must provide valid password`;
        if (firstName) {
          if (typeof firstName != "string") throw `400 - Name is not a string`;
        }
        if (lastName) {
          if (typeof lastName != "string")
            throw { errocode: 400, field: "lastName" };
        }
        if (email) {
          if (typeof email != "string") throw { errocode: 400, field: "email" };
        }
        if (password) {
          if (typeof password != "string")
            throw { errocode: 400, field: "password" };
        }
        password = await bcrypt.hash(password, salt);
        const userCollection = await users();   
        let newUSer = {
          firstName: firstName,
          lastName: lastName,  
          email: email,
          password: password       
        };    
        const existingUser = await this.getUserByEmail(email.toLowerCase());
        if (existingUser != null) {
            throw `User with this Email already Exists`;
        }
        const insertInfo = await userCollection.insertOne(newUSer);
        if (insertInfo.insertedCount === 0) throw `Could not add User`;    
        const newId = insertInfo.insertedId;
        const user = await this.getUserById(newId);
        return user;
      }
};