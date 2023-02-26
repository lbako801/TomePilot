const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }

      const userData = await User.findById(user._id).select('-__v -password');
      return userData;
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: input } },
        { new: true }
      );
      return updatedUser;
    },

    removeBook: async (parent, { bookId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updatedUser;
    }
  }
};

module.exports = resolvers;