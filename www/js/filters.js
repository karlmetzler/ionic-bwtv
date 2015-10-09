angular.module('bwtv.filters',[])

.filter('rating',function(){
	return function(input){
		var str = '';
		for( var i=0; i<5; i++ ) 
		{
			if(i<input){
				str = str+'<i class="icon ion-star energized"></i>';
			} else {
				str = str+'<i class="icon ion-star stable"></i>';
			}
		} 
		
		return str; 
	};
});
