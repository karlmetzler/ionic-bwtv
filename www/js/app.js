// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bwtv', ['ionic','ionic.service.core', 'bwtv.controllers','bwtv.filters','ngCordova'])

.run(function($ionicPlatform,$ionicPopup,$cordovaNetwork) {
  $ionicPlatform.ready(function() {
  	console.log('Platform Ready...');
  	
  	var isOnline = $cordovaNetwork.isOnline();
  	if(isOnline){
  		// handle WiFi/mobile network alerts...
  		var type = $cordovaNetwork.getNetwork();
  		if(type != 'wifi'){
  			$ionicPopup.confirm({
  				title: 'Data Usage Warning',
  				template: 'You are connecting to BackwoodsTV over a ' + type + ' network. Mobile data usage may be high. For the best experience view over WiFi.',
  				okText: 'Continue',
  				okType: 'button-positive',
  				cancelType: 'button-assertive'
  			})
  			.then(function(result){
  				if(!result){
  					ionic.Platform.exitApp();
  				}
  			});
  		}
  	} else {
  		$ionicPopup.confirm({
  			title: 'No Internet Connection',
  			content: 'BackwoodsTV requires an Internet connection to continue. Please connect and try again.'
  		})
  		.then(function(result){
  			if(!result){
  				ionic.Platform.exitApp();
  			}
  		});
  	}
  	
  	
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  
  .state('app.home',{
  	url: "/home",
  	views: {
  		'menuContent' : {
  			templateUrl: "templates/home.html",
  			controller: 'HomeCtrl'
  		}
  	}
  })
  
  .state('app.channels',{
  	url: "/channels",
  	views: {
  		'menuContent' : {
  			templateUrl: "templates/channels.html",
  			controller: 'ChannelsCtrl'
  		}
  	}
  })
  
  .state('app.channels/:channel',{
  	url: "/channels/:channel",
  	views: {
  		'menuContent': {
  			templateUrl: "templates/channel.html",
  			controller : 'ChannelCtrl'
  		}
  	}
  })

	  .state('app.about', {
	url: "/about",
	views: {
	  'menuContent': {
	    templateUrl: "templates/about.html",
	    controller: 'AboutCtrl'
	      }
	    }
	  })
    
    .state('app.videos/:tag',{
    	url: "/videos/:tag",
    	views: {
    		'menuContent':{
    			templateUrl: 'templates/videos.html',
    			controller: 'VideosCtrl'
    		}
    	}
    })
    
    .state('app.video/:id',{
    	url: "/video/:id",
    	views: {
    		'menuContent': {
    			templateUrl: 'templates/video.html',
    			controller: 'VideoCtrl'
    		}
    	}
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
