var chatRef = new Firebase('https://jam-sesh-b8afb.firebaseio.com');
   var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
   var simpleLogin = new FirebaseSimpleLogin(chatRef, function(err, user) {
     if (user) {
       chat.setUser(user.id, 'Anonymous' + user.id.substr(0, 8));
       setTimeout(function() {
         chat._chat.enterRoom('-Iy1N3xs4kN8iALHV0QA');
       }, 500);
     } else {
       simpleLogin.login('anonymous');
     }
   });
