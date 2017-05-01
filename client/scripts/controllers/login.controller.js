import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.phone)) return;

    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Número de confirmação',
      template: '<div>' + this.phone + '</div><div>Seu número de telefone está correto?</div>',
      cssClass: 'text-center',
      okText: 'Sim',
      okType: 'button-positive button-clear',
      cancelText: 'editar',
      cancelType: 'button-dark button-clear'
    });

    confirmPopup.then((res) => {
      if (!res) return;

      this.$ionicLoading.show({
        template: 'Enviando código de verificação...'
      });

      Accounts.requestPhoneVerification(this.phone, (err) => {
        this.$ionicLoading.hide();
        if (err) return this.handleError(err);
        this.$state.go('confirmation', { phone: this.phone });
      });
    });
  }

  handleError(err) {
    this.$log.error('Erro de login ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Falha na autenticação',
      template: 'Por favor, tente novamente',
      okType: 'button-positive button-clear'
    });
  }
}

LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];