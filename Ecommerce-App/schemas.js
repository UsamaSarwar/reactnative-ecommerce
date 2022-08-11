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
      // price: "double",
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
  constructor({
    name,
    orderNumber,
    paymentMethod, // COD or card
    userId,
    partition,
    status = Order.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.orderNumber = orderNumber;
    this.name = name;
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.userId = userId;
  }

  static STATUS_OPEN = "Open";
  static STATUS_IN_PROGRESS = "InProgress";
  static STATUS_COMPLETE = "Complete";

  // static Task = {
  //   name: "Task",
  //   properties: {
  //     _id: "objectId",
  //     name: "string",
  //     status: "string",
  //     category: "string",
  //     price: "string",
  //     // price: "double",
  //     description: "string",
  //     image: "string",
  //     imageForm: "string",
  //   },
  //   primaryKey: "_id",
  // };

  static schema = {
    name: "Order",
    properties: {
      _id: "objectId",
      status: "string",
      orderNumber: "string",
      // orderItems: "Task[]",
      userId: "string",
      paymentMethod: "string",
    },

    primaryKey: "_id",
  };
}
