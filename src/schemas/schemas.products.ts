const products = {
  schema: {
    description: "get all products from database",
    tags: ["products"],
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: ["integer", "null"],
            },
            brand: {
              type: "string",
            },
            category: {
              type: "string",
            },
            thumbnail: {
              type: "string",
            },
            images: {
              type: ["array", "null"],
            },
          },
          required: [
            "id",
            "title",
            "description",
            "price",
            "brand",
            "category",
            "thumbnail",
            "images",
          ],
        },
      },
    },
  },
};

const product = {
  schema: {
    description: "get one product from database by id",
    tags: ["products"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "integer",
            },
            brand: {
              type: "string",
            },
            category: {
              type: "string",
            },
            thumbnail: {
              type: "string",
            },
            images: {
              type: ["array", "null"],
            },
          },
          required: ["id", "title"],
        },
      },
    },
  },
};

const addProduct = {
  schema: {
    description: "add one product to the database",
    tags: ["products"],
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
        price: {
          type: "integer",
        },
        brand: {
          type: "string",
        },
        category: {
          type: "string",
        },
        thumbnail: {
          type: "string",
        },
        images: {
          type: "array",
        },
      },
      required: ["id"],
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          msg: {
            type: "string",
          },
        },
      },
    },
  },
};

const updateProduct = {
  schema: {
    description: "update one product by id",
    tags: ["products"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
        price: {
          type: "integer",
        },
        brand: {
          type: "string",
        },
        category: {
          type: "string",
        },
        thumbnail: {
          type: "string",
        },
        images: {
          type: "array",
        },
      },
      required: ["title"],
    },
    response: {
      201: {
        description: "Successful response",
        type: "object",
        properties: {
          msg: {
            type: "string",
          },
        },
      },
    },
  },
};

const deleteProduct = {
  schema: {
    description: "delete one product by id",
    tags: ["products"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    response: {
      201: {
        description: "Successful response",
        type: "object",
        properties: {
          msg: {
            type: "string",
          },
        },
      },
    },
  },
};

export { addProduct, product, products, updateProduct, deleteProduct };
