/// <reference path="../../typings/index.d.ts" />
var elp = angular.module("elp", ['ui.router']);


elp.config(function($stateProvider: angular.ui.IStateProvider, $urlRouterProvider : angular.ui.IUrlRouterProvider, $locationProvider : angular.ILocationProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('index', {
            url: "/",
            templateUrl: "/templates/index.html",
            controller: 'DashboardIndexController as dashboardIndexController'
        })
});

