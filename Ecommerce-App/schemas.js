import { ObjectId } from "bson";

export class User {
  static User_detailsSchema = {
    name: "User_details",
    embedded: true,
    properties: {
      address: "string?",
      altPhoneNumber: "string?",
      city: "string?",
      country: "string?",
      image: "string?",
      imageForm: "string?",
      name: "string?",
      phoneNumber: "string?",
      postalCode: "string?",
      province: "string?",
    },
  };
  static User_cartSchema = {
    name: "User_cart",
    embedded: true,
    properties: {
      productId: "string?",
      qty: "int?",
    },
  };
  static UserSchema = {
    name: "User",
    properties: {
      _id: "string",
      _partition: "string",
      cart: "User_cart[]",
      details: "User_details",
      email: "string",
      name: "string",
      userType: "string?",
    },
    primaryKey: "_id",
  };
}

export class Task {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"}
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    status = Task.STATUS_OPEN,
    id,
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
      _partition: "string",
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

export class Order {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"}
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({ partition, id }) {
    this._partition = partition;
    this._id = id;
  }

  static schema = {
    name: "Order",
    properties: {
      _id: "objectId",
      _partition: "string",
    },

    primaryKey: "_id",
  };
}
