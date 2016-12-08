import angular from 'angular';

import 'angular-ui-bootstrap';
import 'angular-cookies';

import 'bootstrap/dist/css/bootstrap.css';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'ElokenzTwoteCtrl',
    controllerAs: 'ctrl'
  };
};

class ElokenzTwoteCtrl {
  constructor($http, $cookies) {
    this.results = undefined;
    this.$http = $http;
    this.$cookies = $cookies;
    var self = this;

    $http.get("http://localhost:8000/api/get_tweetable_sentences/");
  }

  get_sentences(url) {
    this.$http.post(
      'http://localhost:8000/api/get_tweetable_sentences/',
      {'url': url},
      {headers: {
        "Content-Type": "application/json",
        "X-CSRFToken":this.$cookies.getAll().csrftoken
      }}
    ).then(
      response => {
        this.results = JSON.parse(response.data);
      }
    )
    return false;
  };
}

const MODULE_NAME = 'elokenz_twote';

angular.module(MODULE_NAME, ['ngCookies'])
  .config(($httpProvider) => {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  })
  .directive('app', app)
  .controller('ElokenzTwoteCtrl', ElokenzTwoteCtrl);

export default MODULE_NAME;