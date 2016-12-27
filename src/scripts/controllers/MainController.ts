/// <reference path="../app.ts" />
module controllers {

    export class DashboardMainController {

        private $scope:ng.IScope;
        private $state:ng.ui.IStateService;

        public static $inject = [
            '$scope',
            '$state'
        ];

        constructor($scope:ng.IScope, $state:ng.ui.IStateService) {
            this.$scope = $scope;
            this.$state = $state;
        }
    }
}

elp.controller("DashboardMainController", controllers.DashboardMainController);
