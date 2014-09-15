
      window.addEventListener('load', function(e) {
        setTimeout(function() { window.scrollTo(0, 1); }, 1);
      }, false);



         window.player = document.getElementById('player');
         window.emisra = "";
         window.twitter = "OlimpicaStereo";

        var app = angular.module('olimpicapp',[]);

        // controller emisoras

            app.controller('emisoras', function($scope, $http){

              // pasaremos esto a un catalogo

              $scope.frec = "0.00";
       

       $http
       .get("http://gomosoft.com/olimpicapp/servicios/emisoras.json")
       // .get("servicios/emisoras.json")
       .success(function(rs){
           $scope.emisoras = rs.data;
           window.appurl = rs.appurl;
       })


$scope.play = function(){    

        if(!$scope.emisoraSel)
        {
            alert("Debes seleccionar una ciudad.");
            return;
        }

       player.src = $scope.emisoraSel.src;
       window.playing = $scope.emisoraSel.src;

       if($scope.emisoraSel.tel)
         document.getElementById("tel").href = "tel:" + $scope.emisoraSel.tel;
       else
        document.getElementById("tel").href = "tel:0315554433";

       $scope.frec = $scope.emisoraSel.frec || "0.00";
       $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                         $('.emis').addClass('icon-pause');
       player.load();
       player.play();
      $scope.reproduciendo = true;
       window.twitter = $scope.emisoraSel.twitter || "OlimpicaStereo";
}

           

            });


  // controller 20 Latinas


            app.controller('20Latinas', function($scope, $http){

                $scope.Lats20 = {};

                $http
                .get('http://gomosoft.com/olimpicapp/servicios/20Latinas.php')
                // .get('servicios/20Latinas.php')
                .success(function(rs){

                    $scope.Lats20 = rs.rs;

                });

                $scope.reproduciendo = false;
                $scope.share = function(nombre, artista, src){
                   console.log(nombre,artista,src);

                   var msg = 'Estoy escuchando '+nombre+' de '+artista+', en la aplicación móvil de Olimpica Stereo.';
                   var  link = 'http://olimpicastereo.com.co/20-latinas';
                   window.plugins.socialsharing.share(msg,null,src, link);

                }


                $scope.play = function(event,src){   

                    console.log(src); 

                      if(src === "emi")
                      {

                       console.log(window.playing); 


                        if(!window.playing && !src) return;

                         if(window.emisra === window.playing) // si la emisora se estaba reproduciendo solo la reanudamos
                         {
                          if ($scope.reproduciendo){
                            $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                         $('.emis').addClass('icon-play2');
                            $scope.reproduciendo = false;
                            player.pause();
                          }else{
                            $scope.reproduciendo = true;
                            $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                            $('.emis').addClass('icon-pause');
                            player.play();
                          }
                           return;
                         }

                         player.src = window.playing;
                         player.load();
                         player.play();
                         $scope.reproduciendo = true;
                         $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                         $('.emis').addClass('icon-pause');
                         window.emisra = window.playing;

                         return;

                      }  

                      if(window.playing === src) // si el track ya estaba en reprodución solo lo reproducimos nuevamente
                        {
                          if ($scope.reproduciendo){
                            $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                          $(event.target).addClass('icon-play2');
                            player.pause();
                            $scope.reproduciendo=false;
                          }else{
                            $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                         $(event.target).addClass('icon-pause');
                            player.play();
                            $scope.reproduciendo=true;
                          }
                          return;
                        }

                       player.src = src;
                       player.load();
                       player.play();
                       $scope.reproduciendo = true;
                       $('button.rep').removeClass('icon-pause').addClass('icon-play2');
                         $(event.target).addClass('icon-pause');
                       window.playing = src;

                }


                $scope.pause = function(){ player.pause(); }

            });
  

  //controller twitter


  app.controller("twitter", function($scope){

      $scope.tuit = "";

      $scope.doTuit = function(){
        if ($("#tuit").val().trim()==""){
          alert("El mensaje no puede estar vacio");
        }else{
         window.plugins.socialsharing.shareViaTwitter($scope.tuit + ' via @' + window.twitter + ' ' + window.appurl); 
         $("#tuit").css(height,window.initialHeight+"px");
         }
      }

  });


  //objeto app 


  var app = {
      run : function(){


     
     var lastScrollTop = 0;

    $(window).scroll(function() {
      
      $("header").css("transform", "translateY(0)");

    
     });


    $(".app-content").scroll(function(){
        var st = $(this).scrollTop();

     console.log(st,lastScrollTop);
   
      if (st > lastScrollTop){
         $("footer:not('footer.noauto')").css("bottom", "-" + ( $("footer").height() + 15 ) + "px");
        } else {
         $("footer:not('footer.noauto')").css({transform : "translate3d(0,0" + $(window).scrollTop() + "px,0)", bottom:0});        
      }

   lastScrollTop = st;

});


    $("#tuit").on("focus", function(){

           $("footer").toggleClass('noauto');

    });


    $("#tuit").on("blur", function(){

           $("footer").toggleClass('noauto');

     });

  }
  
}


  //miramos si corre con phonegap 

 if(!!window.cordova)
  
   // device ready phonegap
  
  document.addEventListener("deviceready", function(){

      app.run();
    window.plugin.backgroundMode.enable();
  
  });

else

  // Ready Jquery

   $(app.run);

    // esto hará que un textarea ajuste el alto al contenido 

function autoGrow (oField) {

  if(!window.initialHeight)
     window.initialHeight = oField.clientHeight;
      
  if(oField.value.split("").length === 0)
     oField.style.height = window.initialHeight + "px";

  if (oField.scrollHeight > oField.clientHeight) 
    oField.style.height = oField.scrollHeight + "px";
  
}