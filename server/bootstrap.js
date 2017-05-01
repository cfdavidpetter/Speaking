import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function() {
  if (Meteor.users.find().count() != 0) return;
 
  Accounts.createUserWithPhone({
    phone: '+972501234987',
    profile: {
      name: 'Meu amigo 1'
    }
  });
 
  Accounts.createUserWithPhone({
    phone: '+972501234345',
    profile: {
      name: 'Meu amigo 2'
    }
  });
 
  Accounts.createUserWithPhone({
    phone: '+972501212378',
    profile: {
      name: 'Meu amigo 3'
    }
  });

  Accounts.createUserWithPhone({
    phone: '+971231245678',
    profile: {
      name: 'Meu amigo 4'
    }
  });

  Accounts.createUserWithPhone({
    phone: '+972501678678',
    profile: {
      name: 'Meu amigo 5'
    }
  });

  Accounts.createUserWithPhone({
    phone: '+972556734678',
    profile: {
      name: 'Meu amigo 6'
    }
  });
});