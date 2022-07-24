import { ObjectId } from "bson";

export class Task {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    status = Task.STATUS_OPEN,
    id = new ObjectId(),
    category,
    price,
    description,
    image,
    imageForm,
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.status = status;
    this.category = category;
    this.price = price;
    this.description = description;
    this.image = image;
    this.imageForm = imageForm;
  }

  static STATUS_OPEN = "Open";
  static STATUS_IN_PROGRESS = "InProgress";
  static STATUS_COMPLETE = "Complete";
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string",
      category: "string",
      price: "string",
      description: "string",
      image: "string",
      imageForm: "string",
    },
    primaryKey: "_id",
  };
}

export class Product {
  /**
   *
   * @param {string} name The name of the task
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({ name, partition, id = new ObjectId() }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
  }

  static schema = {
    name: "Product",
    properties: {
      _id: "objectId",
      name: "string",
    },
    primaryKey: "_id",
  };
}
