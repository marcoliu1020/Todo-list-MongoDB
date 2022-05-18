const router = require("express").Router();

//-- import todo medel
const todoItemsModel = require("../models/todoItems");

//-- back-end server, REST API
//-- 可以用 req.REST 手動操作
//-- Database
//-- 1. insert
//-- 2. get
//-- 3. update
//-- 4. delete

//-- 1. insert item
router.post("/api/item", async (req, res) => {
  try {
    //-- req.body
    // > { item: 'This is the 5 todo item' }
    const newItem = new todoItemsModel(req.body);
    //-- save item in database
    const saveItem = await newItem.save();
    res.status(200).json(saveItem); // 回傳儲存的物件
    // res.status(200).json("Item Added successfully"); // for check
  } catch (err) {
    res.json(err);
  }
});

//-- 2. get item
router.get("/api/items", async (req, res) => {
  try {
    // firn all items and return in json format
    const allItems = await todoItemsModel.find({});
    res.status(200).json(allItems);
  } catch (err) {
    res.json(err);
  }
});

//-- 3. update item
router.put("/api/item/:id", async (req, res) => {
  try {
    // find the item by id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item Updated");
  } catch (err) {
    res.json(err);
  }
});

//-- 4. delete item
router.delete("/api/item/:id", async (req, res) => {
  try {
    //-- find the item by id and delete it
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } catch (err) {
    res.json(err);
  }
});

//-- export router
module.exports = router;
