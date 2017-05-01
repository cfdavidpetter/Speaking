import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, Messages } from '../lib/collections';
 
Meteor.methods({
  newMessage(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
        chatId: String
      },
      {
        picture: String,
        type: String,
        chatId: String
      }
    ));
    
    message.timestamp = new Date();
    message.userId = this.userId;
 
    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });
 
    return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Você deve estar logado para atualizar seu nome.');
    }
 
    check(name, String);
 
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Preencha o nome de usuário');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Registre-se para criar um chat.');
    }
 
    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);
 
    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'O usuário do Chat não existe');
    }
 
    const chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };
 
    const chatId = Chats.insert(chat);
 
    return chatId;
  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Registre-se para remover o chat.');
    }
 
    check(chatId, String);
 
    const chat = Chats.findOne(chatId);
 
    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat não existe');
    }
 
    Messages.remove({ chatId: chatId });
 
    return Chats.remove({ _id: chatId });
  },
  updatePicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Você deve estar logado para atualizar sua imagem.');
    }
 
    check(data, String);
 
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
});