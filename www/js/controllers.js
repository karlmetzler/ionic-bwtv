angular.module('bwtv.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$cordovaSplashscreen) {
	
  // Form data for the login modal
  
  //$cordovaSplashscreen.show();
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope,$rootScope,$http,$q,$ionicPopup,$ionicSlideBoxDelegate){
	$scope.init = function(){
		
		$scope.getVideos().then(function(res){
			console.log(res);
			$scope.videos = res;
		},function(status){
			$scope.pageError = status;
			console.log(status);
		});
		
		$scope.getChannels()
		.then(function(res){
			console.log(res);
			$scope.channels = res; 
		},function(status){
			$scope.pageError = status;
			console.log(status);
		});
		
	};
	
	$scope.getVideos = function(){
		var defer = $q.defer();
		var endpoint = 'http://www.backwoodstv.com/bwtvapi/api/videos/features/yes/sort/indexer/direction/desc/limit/5/format/json?callback=JSON_CALLBACK';
		$http.jsonp(endpoint).success(function(res){
			defer.resolve(res);
		}).error(function(status,err){
			defer.reject(status);
		});
		return defer.promise;
	};
	
	$scope.getChannels = function(){
		var defer = $q.defer();
		$http.jsonp('http://backwoodstv.com/bwtvapi/api/channels/limit/4/format/json?callback=JSON_CALLBACK')
		.success(function(res){
			
			defer.resolve(res);
		}).error(function(status,err){
			defer.reject(status);
		});
		
		return defer.promise;
	};
	
	$scope.navSlide = function(index){
		$ionicSlideBoxDelegate.slide(index, 500);
	};
	
	$scope.init();
	
})

.controller('PlaylistsCtrl', function($scope,$http,$q) {
  $scope.init = function(){
  	$scope.getVideos()
  	.then(function(res){
  		console.log(res);
  		$scope.videos = res;
  	},function(status){
  		$scope.pageError = status;
  		console.log(status);
  	});
  };
  
  $scope.getVideos = function(){
  	var defer = $q.defer();
  	$http.jsonp('http://backwoodstv.com/bwtvapi/api/videos/featured/yes/sort/indexer/direction/desc/limit/10/format/json?callback=JSON_CALLBACK')
  	.success(function(res){
  		defer.resolve(res);
  	}).error(function(status,err){
  		defer.reject(status);
  	});
  	return defer.promise;
  };
  
  $scope.init();
  
})

.controller('AboutCtrl',function($scope){
	
})

.controller('ChannelsCtrl',function($scope,$http,$q){
	$scope.init = function(){
		$scope.getChannels()
		.then(function(res){
			console.log(res);
			$scope.channels = res; 
		},function(status){
			$scope.pageError = status;
			console.log(status);
		});
	};
	
	$scope.getChannels = function(){
		var defer = $q.defer();
		$http.jsonp('http://backwoodstv.com/bwtvapi/api/channels/format/json?callback=JSON_CALLBACK')
		.success(function(res){
			console.log(res);
			defer.resolve(res);
		}).error(function(status,err){
			defer.reject(status);
		});
		
		return defer.promise;
	};
	
	$scope.init();
})

.controller('ChannelCtrl',function($scope,$stateParams,$http,$q){
	var cid = $stateParams.channel;
	 
	console.log(cid);
	$scope.init = function(){
		console.log('ChannelCtrl Called.');
		$scope.getChannel()
		.then(function(res){
			console.log(res[0].channel);
			
			$scope.channel = res;
			$scope.title = res[0].channel;
			
		},function(status){
			$scope.pageError = status;
		});
		
	};
	
	$scope.getChannel = function(){
		var defer = $q.defer();
		var base_url = 'http://backwoodstv.com/bwtvapi/api/videos/channel/'+cid+'/limit/20/sort/indexer/direction/desc/format/json?callback=JSON_CALLBACK';
		$http.jsonp(base_url)
		.success(function(res){
			defer.resolve(res);
			
		})
		.error(function(status,err){
			defer.reject(status);
		});
		return defer.promise;
		
	};
	
	$scope.init();
})

.controller('VideoCtrl', function($scope, $stateParams,$http,$q,$sce,$cordovaNetwork) {
	var vid = $stateParams.id;
	
	 document.addEventListener('deviceready',function(){
	 	var network = $cordovaNetwork.getNetwork();
	 	console.log(network);
	 });
	
	$scope.init = function(){
		$scope.getVideo()
		.then(function(res){
			console.log(res);
			$scope.video_url = $sce.trustAsResourceUrl(res.video_file);
			$scope.video = res;
			
		},function(status){
			$scope.pageError = status;
			console.log(status);
		});
		$scope.device_width = (window.innerWidth);
	};
	
	$scope.getVideo = function(id){
		var defer = $q.defer();	
		$http.jsonp('http://backwoodstv.com/bwtvapi/api/video/id/'+vid+'/format/json?callback=JSON_CALLBACK')
		.success(function(res){
			defer.resolve(res);
		}).error(function(status,err){
			defer.reject(status);
		});
		
		return defer.promise;
	};
	
	$scope.init();
})

.controller('VideosCtrl',function($scope,$stateParams,$http,$q){
	var tag=$stateParams.tag,
		url = 'http://backwoodstv.com/bwtvapi/api/videos/',
		params,
		endpoint;
	
	switch(tag){
		case 'Popular':
			params = 'sort/number_of_views/direction/desc/limit/20/';
			break;
		case 'Recent':
			params = 'sort/indexer/direction/desc/limit/20/';
			break;
		default:
			params = 'featured/yes/sort/indexer/direction/desc/limit/20/';
	}
	
	endpoint = url+params+'format/json';	
	console.log(endpoint);
	$scope.init=function(){
		$scope.tag = tag;
		$scope.getVideos()
		.then(function(res){
			$scope.videos = res;
			console.log(res);
		},function(status){
			$scope.pageError = status;
			console.log(status);
		});
		
		
	};
	
	$scope.getVideos = function(tag){
		var defer = $q.defer();
		$http.jsonp(endpoint+'?callback=JSON_CALLBACK')
		.success(function(res){
			defer.resolve(res);
		}).error(function(status,err){
			defer.reject(status);
		});
		
		return defer.promise;
	};
	
	$scope.init();
	
	
});
