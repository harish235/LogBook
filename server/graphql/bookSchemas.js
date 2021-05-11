var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var BookModel = require('../models/Book');
var AdminModel = require('../models/Admin');

var UserModel = require('../models/User');
var bookType = new GraphQLObjectType({
    name: 'book',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        phno: {
          type: GraphQLString
        },
        desc: {
          type: GraphQLString
        }
      }
    }
  });

  var userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        mail: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      }
    }
  });

  var adminType = new GraphQLObjectType({
    name: 'admin',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        },
        mail: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      }
    }
  });

  
  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        books: {
          type: new GraphQLList(bookType),
          resolve: function () {
            const books = BookModel.find().exec()
            if (!books) {
              throw new Error('Error')
            }
            return books
          }
        },
        book: {
          type: bookType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const bookDetails = BookModel.findById(params.id).exec()
            if (!bookDetails) {
              throw new Error('Error')
            }
            return bookDetails
          }
        },
        users: {
          type: new GraphQLList(userType),
          resolve: function () {
            const users = UserModel.find().exec()
            if (!users) {
              throw new Error('Error')
            }
            return users
          }
        },
        user: {
          type: userType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const userDetails = UserModel.findById(params.id).exec()
            if (!userDetails) {
              throw new Error('Error')
            }
            return userDetails
          }
        }
      }
    }
  });

  

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addBook: {
          type: bookType,
          args: {
            phno: {
              type: new GraphQLNonNull(GraphQLString)
            },
            desc: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const bookModel = new BookModel(params);
            const newBook = bookModel.save();
            if (!newBook) {
              throw new Error('Error');
            }
            return newBook
          }
        },
        adduser12: {
          type: userType,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            mail: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const userModel = new UserModel(params);
            const newUser = userModel.save();
            if (!newUser) {
              throw new Error('Error');
            }
            return newUser
          }
        },
        addadmin: {
          type: userType,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            mail: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const adminModel = new AdminModel(params);
            const newAdmin = adminModel.save();
            if (!newAdmin) {
              throw new Error('Error');
            }
            return newAdmin
          }
        },
        updateBook: {
          type: bookType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            isbn: {
              type: new GraphQLNonNull(GraphQLString)
            },
            title: {
              type: new GraphQLNonNull(GraphQLString)
            },
            author: {
              type: new GraphQLNonNull(GraphQLString)
            },
            description: {
              type: new GraphQLNonNull(GraphQLString)
            },
            published_year: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            publisher: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return BookModel.findByIdAndUpdate(params.id, { isbn: params.isbn, title: params.title, author: params.author, description: params.description, published_year: params.published_year, publisher: params.publisher, updated_date: new Date() }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeBook: {
          type: bookType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remBook = BookModel.findByIdAndRemove(params.id).exec();
            if (!remBook) {
              throw new Error('Error')
            }
            return remBook;
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});