 var app = angular.module("DocWriter", ['ngAnimate', 'ui.bootstrap']);

 app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);

 app.controller("MainCtrl", function ($scope, $modal, $log, $location, $http) {
	
	// Create the XHR object.
	function createCORSRequest(method, url) {
	  var xhr = new XMLHttpRequest();
	  if ("withCredentials" in xhr) {
	    // XHR for Chrome/Firefox/Opera/Safari.
	    xhr.open(method, url, true);
	  } else if (typeof XDomainRequest != "undefined") {
	    // XDomainRequest for IE.
	    xhr = new XDomainRequest();
	    xhr.open(method, url);
	  } else {
	    // CORS not supported.
	    xhr = null;
	  }
	  return xhr;
	}

	// Helper method to parse the title tag from the response.
	function getTitle(text) {
	  return text.match('<title>(.*)?</title>')[1];
	}

	// Make the actual CORS request.
	function makeCorsRequest() {
	  // This is a sample server that supports CORS.
	  var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

	  var xhr = createCORSRequest('GET', url);
	  if (!xhr) {
	    alert('CORS not supported');
	    return;
	  }

	  // Response handlers.
	  xhr.onload = function() {
	    var text = xhr.responseText;
	    var title = getTitle(text);
	    alert('Response from CORS request to ' + url + ': ' + title);
	  };

	  xhr.onerror = function() {
	    alert('Woops, there was an error making the request.');
	  };

	  xhr.send();
	}

	$scope.name = "Friend";
	$scope.language1 = "English";
	$scope.language2 = "Bosnian";
	$scope.text = "";

	$scope.publish = function(stuff) {
		$scope.text = stuff;
	};

	$scope.goQualtrics = function() {
        window.location = 'https://qtrial2017q1az1.qualtrics.com/SE/?SID=SV_eR6SaoxZePpfWwB';
    };

    console.log("Success recieving Access Token");

    $scope.authInput = {
    	client_id : "TranslatorHCI",
    	client_secret : "ZOd2z4KgIS/xeLx9AF+4o+MxO//HgTQeOF0mg4yDKvs=",
    	scope : "http://api.microsofttranslator.com",
    	grant_type : "client_credentials"
    };

    $scope.authInput = 'Ocp-Apim-Subscription-Key: 30da81fe-15e7-4dd0-ad04-f226f26856e2';

    //Get Access Token
    $http({
        method : "POST",
        url : "https://api.cognitive.microsoft.com/sts/v1.0/issueToken"
    }).then(function mySucces(response) {
    	console.log("Success recieving Access Token");
        $scope.authToken = response.data;
    }, function myError(response) {
   		console.log("Error recieving Access Token");
        $scope.myWelcome = response.statusText;
    });

}); 