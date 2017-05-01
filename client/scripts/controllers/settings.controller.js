import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class SettingsCtrl extends Controller {
  logout() {
    Meteor.logout((err) => {
      if (err) return this.handleError(err);
      this.$state.go('login');
    })
  }

  handleError (err) {
    this.$log.error('Erro na modificação das configurações', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Falha na modificação de configurações',
      template: 'Por favor, tente novamente',
      okType: 'button-positive button-clear'
    });
  }
}

SettingsCtrl.$inject = ['$state', '$ionicPopup', '$log'];