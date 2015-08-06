angular.module('routes', ['ui.router'])
.config(function ($urlRouterProvider, $stateProvider) {
  	'use strict';

  	$urlRouterProvider.otherwise('/login');

  	$stateProvider
  	.state('body', {
  		abstract: true,
    	templateUrl: 'layout/body.html'
  	})
    .state('body.layout', {
      abstract: true,
      views: {
        'header@body': { templateUrl: 'layout/header.html', controller: 'headerCtrl', controllerAs:'header'},
        'footer@body': { templateUrl: 'layout/footer.html' }
      }
    })
    .state('login', {
      parent: 'body.layout',
      url: '/login',
      views: {
        'view@body': { templateUrl: 'views/login.html', controller: 'loginCtrl', controllerAs: 'vm' },
      }
    })
    .state('dashboard', {
      parent: 'body.layout',
      url: '/dashboard',
      views: {
        'view@body': { templateUrl: 'views/dashboard.html', controller: 'dashboardCtrl', controllerAs: 'vm' },
      }
    })
    .state('bodyIn', {
      abstract: true,
      templateUrl: 'layout/bodyIn.html'
    })
    .state('bodyIn.layout', {
      abstract: true,
      views: {
        'header@bodyIn': { templateUrl: 'layout/headerIn.html', controller: 'headerInCtrl', controllerAs:'vm'},
        'aside@bodyIn': { templateUrl: 'layout/aside.html', controller: 'asideCtrl', controllerAs:'vm'},
        'footer@bodyIn': { templateUrl: 'layout/footerIn.html', controller: 'footerInCtrl', controllerAs:'vm'}
      }
    })
    .state('checkIn', {
      parent: 'bodyIn.layout',
      url: '/checkIn',
      views: {
         'view@bodyIn': { templateUrl: 'views/voterSearch.html', controller: 'voterSearchCtrl', controllerAs: 'vm'},
      },
      params:{
        nationalId: null,
        trackCode: null,
        search: null
      }
    })
    .state('voterList', {
      parent: 'bodyIn.layout',
      url: '/voterList',
      params: {
        trackCode: null,
        nationalId: null,
        name: null,
        familyName: null,
        votingAttendance: null,
        search: null
      },
      views: {
        'view@bodyIn': { templateUrl: 'views/voterList.html', controller: 'voterListCtrl', controllerAs: 'vm'},
      }
    })
    .state('importVLFF', {
      parent: 'bodyIn.layout',
      url: '/importVLFF',
      views: {
        'view@bodyIn': { templateUrl: 'views/importVLFF.html', controller: 'importVLFFCtrl', controllerAs: 'vm'},
      }
    })
    .state('exportFinalVT', {
      parent: 'bodyIn.layout',
      url: '/exportFinalVT',
      views: {
        'view@bodyIn': { templateUrl: 'views/exportFinalVT.html', controller: 'exportFinalVTCtrl', controllerAs: 'vm'},
      }
    })
    .state('sendVoterTurnout', {
      parent: 'bodyIn.layout',
      url: '/sendVoterTurnout',
      views: {
        'view@bodyIn': { templateUrl: 'views/sendVoterTurnout.html', controller: 'sendVTCtrl', controllerAs: 'vm'},
      }
    })
    .state('importVLFS', {
      parent: 'bodyIn.layout',
      url: '/importVLFS',
      views: {
        'view@bodyIn': { templateUrl: 'views/importVLFS.html', controller: 'importVLFSCtrl', controllerAs: 'vm'},
      }
    })
    .state('sendFinalVT', {
      parent: 'bodyIn.layout',
      url: '/sendFinalVT',
      views: {
        'view@bodyIn': { templateUrl: 'views/sendFinalVT.html', controller: 'sendFinalVTCtrl', controllerAs: 'vm'},
      }
    });
});
