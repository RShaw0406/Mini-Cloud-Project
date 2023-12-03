$.ajaxSetup({ cache: false });
//ENDPOINTS
CIAUSERS = "https://prod-21.uksouth.logic.azure.com/workflows/2b4749de63fa400691fb94f6fa5afc0c/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3YtNnI-RLXENJBB_we2FdcO7GQ-ucvdL7ARgfzqn2t0";
RAAUSERS = "https://prod-09.uksouth.logic.azure.com/workflows/79e8bd81ee474ef0b4c187e1bdd8138f/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=u5TyRA6J5j_c3FSTzNeNDxaV1aOHQuAGzm0vUH4Lteo";
UIAUSERS = "https://prod-04.uksouth.logic.azure.com/workflows/4c2951d17ffa4ddd99410accfefab78e/triggers/manual/paths/invoke/rest/v1/users/";
UIAUSER2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=juZEKGVo4H5zpy8YVWCk8XStzExshhZG671KCQ3Qtd4";
DIAUSERS = "https://prod-18.uksouth.logic.azure.com/workflows/1160eb268ce74ebaaee274616c6c9a35/triggers/manual/paths/invoke/rest/v1/users/";
DIAUSERS2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AseFXjnALq1FDixapjaM2g4kDoh7Q56xXWHOSDthVzs";

IUPSIMAGES = "https://prod-15.uksouth.logic.azure.com:443/workflows/f9748bccdbf5414791d376c2060d5bc4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TvPOg6wRck-4Etk6mXPGJNKfZFxz5DnZt6FaLJN69bo";
RAIIMAGES = "https://prod-24.uksouth.logic.azure.com:443/workflows/b9656a14679c483dafa85d63f0a05cda/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p7K_ss7dUVkk9y_mNaVSiuTLpNKOuBxKMaoN7Zcu1r0";
IDAIIMAGES1 = "https://prod-01.uksouth.logic.azure.com/workflows/82c020f5be404fa1b241061aa5757483/triggers/manual/paths/invoke/rest/v1/blob/"
IDAIIMAGES2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y4_shO7LjfiAw5b_LmSDGOhsVk5TFVnDpcV6CKKPV18"
IUIAIMAGES1 = "https://prod-13.uksouth.logic.azure.com/workflows/cdc3ca26ccde484e845daf08f972f101/triggers/manual/paths/invoke/rest/v1/document/";
IUIAIMAGES2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YK3bNjjZebuoAt0MkgmkMy7ZWcqfYAlsqT6GGbVmRSc";

BLOB_ACCOUNT = "https://com682cw2cosmosdbblobs.blob.core.windows.net";

var userAuth = null;

var userObj = {};

var updatedPostID = "";

var deletedDoc = "";

var postsDiv = document.getElementById('postsDiv');
var loginDiv = document.getElementById('loginDiv');

$(document).ready(function () {

  $.ajaxSetup({ cache: false });

  $("#login").click(function () {
    Login();
  });

  $("#logoutBtn").click(function () {
    console.log(userAuth)
    console.log(userObj)
    var userAuth = null;
    var userObj = {};
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('loginDiv').style.display = "block";
    document.getElementById('logoutBtn').style.display = "none";
    document.getElementById('accountDiv').style.display = "none";
    document.getElementById('newPostDiv').style.display = "none";
    document.getElementById('loginErrorDiv').style.display = "none";
    document.getElementById('postButtonsDiv').style.display = "none";
  });

  $("#signup").click(function () {
    document.getElementById('loginDiv').style.display = "none";
    document.getElementById('signupDiv').style.display = "block";
  });

  $("#backSubmitUser").click(function () {
    document.getElementById('loginDiv').style.display = "block";
    document.getElementById('signupDiv').style.display = "none";
  });

  $("#submitUser").click(function () {
    CreateNewUser();
  });

  $("#updateUser").click(function () {
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('accountDiv').style.display = "none";
    document.getElementById('updateUserDiv').style.display = "block";
    document.getElementById('postButtonsDiv').style.display = "none";

    document.getElementById('updatefirstname').value = userObj.FirstName;
    document.getElementById('updatelastname').value = userObj.LastName;
    document.getElementById('updateemail').value = userObj.EmailAddress;
    document.getElementById('updateadd1').value = userObj.AddressLine1;
    document.getElementById('updateadd2').value = userObj.AddressLine2;
    document.getElementById('updatepostcode').value = userObj.PostCode;
    document.getElementById('updatecountry').value = userObj.Country;
    document.getElementById('updateusername').value = userObj.UserName;
    document.getElementById('updatenewpwd').value = userObj.Password;
  });

  $("#backUpdateUser").click(function () {
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('accountDiv').style.display = "block";
    document.getElementById('updateUserDiv').style.display = "none";
    document.getElementById('postButtonsDiv').style.display = "block";
  });

  $("#submitUpdatedUser").click(function () {
    UpdateUser(userObj.UserID);
  });

  $("#deleteUser").click(function () {
    DeleteUser(userObj.UserID);
  });

  $("#addPost").click(function () {
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('newPostDiv').style.display = "block";
  });

  $("#backNewPost").click(function () {
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('newPostDiv').style.display = "none";
  });

  $("#submitPost").click(function () {
    CreateNewPost();
  });

  $("#backEditPost").click(function () {
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('editPostDiv').style.display = "none";
  });

  $("#submitEditPost").click(function () {
    UpdateCurrentPost(updatedPostID);
  });

  $("#viewPosts").click(function () {
    document.getElementById('postsDiv').style.display = "block";
    document.getElementById('newPostDiv').style.display = "none";
    document.getElementById('updateUserDiv').style.display = "none";

    GetPosts();
  });
});

//CREATE USER
function CreateNewUser() {
  userObj = {
    FirstName: $('#firstname').val(),
    LastName: $('#lastname').val(),
    EmailAddress: $('#email').val(),
    AddressLine1: $('#add1').val(),
    AddressLine2: $('#add2').val(),
    PostCode: $('#postcode').val(),
    Country: $('#country').val(),
    UserName: $('#newusername').val(),
    Password: $('#newpwd').val()
  }

  userObj = JSON.stringify(userObj);

  $.post({
    url: CIAUSERS,
    data: userObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
    document.getElementById('loginDiv').style.display = "block";
    document.getElementById('signupDiv').style.display = "none";
    userObj = {};
  });
}

//RETRIEVE USERS AND LOGIN
function Login() {

  var userName = document.getElementById('username').value;
  var passWord = document.getElementById('pwd').value;

  $.getJSON(RAAUSERS, function (data) {
    $.each(data, function (key, val) {
      if (val["UserName"] == userName && val["Password"] == passWord) {
        userAuth = true;
        if (userAuth) {
          userObj = {
            UserID: val["UserID"],
            FirstName: val["FirstName"],
            LastName: val["LastName"],
            EmailAddress: val["EmailAddress"],
            AddressLine1: val["AddressLine1"],
            AddressLine2: val["AddressLine2"],
            PostCode: val["PostCode"],
            Country: val["Country"],
            UserName: val["UserName"],
            Password: val["Password"]
          };

          console.log(userAuth)
          console.log(userObj)

          document.getElementById('loginErrorDiv').style.display = "none";
          document.getElementById('postButtonsDiv').style.display = "block";
          document.getElementById('postsDiv').style.display = "none";
          document.getElementById('loginDiv').style.display = "none";
          document.getElementById('logoutBtn').style.display = "block";
          document.getElementById('accountDiv').style.display = "block";
          document.getElementById('currentUser').innerHTML = userObj.UserName;
          document.getElementById('username').value = "";
          document.getElementById('pwd').value = "";

          
        }
      }
      else {
        document.getElementById('loginErrorDiv').style.display = "block";
      }
    })
  });
}

//UPDATE USER
function UpdateUser(id) {
  updatedUserObj = {
    FirstName: $('#updatefirstname').val(),
    LastName: $('#updatelastname').val(),
    EmailAddress: $('#updateemail').val(),
    AddressLine1: $('#updateadd1').val(),
    AddressLine2: $('#updateadd2').val(),
    PostCode: $('#updatepostcode').val(),
    Country: $('#updatecountry').val(),
    UserName: $('#updateusername').val(),
    Password: $('#updatenewpwd').val()
  }

  userObj = {
    UserID: userObj.UserID,
    FirstName: updatedUserObj.FirstName,
    LastName: updatedUserObj.LastName,
    EmailAddress: updatedUserObj.EmailAddress,
    AddressLine1: updatedUserObj.AddressLine1,
    AddressLine2: updatedUserObj.AddressLine2,
    PostCode: updatedUserObj.PostCode,
    Country: updatedUserObj.Country,
    UserName: updatedUserObj.UserName,
    Password: updatedUserObj.Password
  };

  updatedUserObj = JSON.stringify(updatedUserObj);

  $.ajax({
    type: "PUT",
    url: UIAUSERS + id + UIAUSER2,
    data: updatedUserObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (msg) {
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('accountDiv').style.display = "block";
    document.getElementById('updateUserDiv').style.display = "none";
    document.getElementById('postButtonsDiv').style.display = "block";
    console.log(userAuth)
    console.log(userObj)
  });

  console.log(userAuth)
  console.log(userObj)
  document.getElementById('currentUser').innerHTML = userObj.UserName;
  $('#currentPosts').empty();

}

//DELETE USER
function DeleteUser(id) {
  $.ajax({
    type: "DELETE",
    url: DIAUSERS + id + DIAUSERS2,
  }).done(function (msg) {
    console.log(userAuth)
    console.log(userObj)
    var userAuth = null;
    var userObj = {};
    document.getElementById('postsDiv').style.display = "none";
    document.getElementById('loginDiv').style.display = "block";
    document.getElementById('logoutBtn').style.display = "none";
    document.getElementById('accountDiv').style.display = "none";
    document.getElementById('postButtonsDiv').style.display = "none";
  });
}

//CREATE POST
function CreateNewPost() {
  var params = {
    "autocorrect": "True",
    "PII": "True",
    "classify": "True",
  };

  var settings = {
    "url": "https://com682-cw2-contentmoderator.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessText/Screen?" + $.param(params),
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Ocp-Apim-Subscription-Key": "da3c61cb98b740018814ab8b42627929",
      "Ocp-Apim-Subscription-Region": "eastus",
      "Content-Type": "text/plain"
    },
    "data": $('#postFileName').val() + " " + $('#postText').val()
  };

  $.ajax(settings).done(function (response) {
    console.log(response.Terms);
    result = response.Terms
    if (result == null)
    {
      postData = new FormData();

      postData.append('FileName', $('#postFileName').val());
      postData.append('FileType', $("#postFile")[0].files[0].type);
      postData.append('userID', userObj.UserID);
      postData.append('userName', userObj.UserName);
      postData.append('userPost', $('#postText').val());
      postData.append('File', $("#postFile")[0].files[0]);

      $.ajax({
        url: IUPSIMAGES,
       data: postData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {
          document.getElementById('postsDiv').style.display = "none";
          document.getElementById('newPostDiv').style.display = "none";
          $('#currentPosts').empty();
        }
      });
    }
    else{
      alert("Terms used are not acceptable!")
    }
  }).fail(function() {
    alert("API Call FAILED");
  });
}

function GetPosts() {
  $('#currentPosts').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
  $.getJSON(RAIIMAGES, {_: new Date().getTime()}, function( data ) {
    $('#currentPosts').empty();
    var posts = [];
    var deleteBtnCount = 0;
    var updateBtnCount = 0;
    var translateBtnCount = 0;
    var descriptionBtnCount = 0;
    console.log(data);
   
    $.each( data, function( key, val ) {
      posts.push( "<hr />");
      let fileType = val["fileType"]
      if (userObj.UserID == val["userID"])
      {
        let filePath = val["filePath"];
        const filePathArray = filePath.split("/");
        let blob = filePathArray[2];
        var docID = val["id"];

        deleteBtnID = "deleteBtn"+blob

        posts.push( "<br/>");
        posts.push("<button type='button' id='"+ deleteBtnID.toString() +"' class=' btn btn-danger'>Delete Post</button>");
        posts.push( "<br/>");

        deleteBtnID = "#" +deleteBtnID       

        
        $('#currentPosts').on('click', deleteBtnID, function(){
          if (val["id"] == deletedDoc)
          {
            return;
          }
          else{
            console.log(filePathArray[2])
            console.log(docID);     
            DeletePost(blob, docID);  
            deletedDoc = docID;
          }          
        });

        updateBtnCount = updateBtnCount + 1;

        var updateBtnID = "updateBtn"+updateBtnCount

        posts.push( "<br/>");
        posts.push("<button type='button' id='"+ updateBtnID.toString() +"' class='btn btn-primary'>Edit Post</button>");
        posts.push( "<br/>");

        updateBtnID = "#"+updateBtnID
        $('#currentPosts').on('click', updateBtnID, function(){
          UpdatePost(docID, val["userPost"], val["fileName"]);
        });
      }

      translateBtnCount = translateBtnCount + 1;

      var translateBtnID = "translateBtn"+translateBtnCount

      posts.push( "<br/>");
      posts.push("<button type='button' id='"+ translateBtnID.toString() +"' class='btn btn-primary'>Translate</button>");
      posts.push( "<br/>");

      var postToTranslate = "";

      translateBtnID = "#"+translateBtnID
      $('#currentPosts').on('click', translateBtnID, function(event){
        event.stopImmediatePropagation();
        postToTranslate = val["userPost"]
        GetTranslation(postToTranslate);  
      });


    
      if (fileType.includes('mp4'))
      {
        posts.push("<video class='img-fluid' width='400' height='400' controls> <source src='"+ BLOB_ACCOUNT + val["filePath"] +"' type='"+ val["fileType"]+"'> </video> <br/>");
      }
      else if (fileType.includes('mpeg'))
      {
        posts.push("<audio controls> <source src='"+ BLOB_ACCOUNT + val["filePath"] +"' type='"+ val["fileType"]+"'> </audio> <br/>");
      }
      else
      {
        descriptionBtnCount = descriptionBtnCount + 1;

        var descriptionBtnID = "descriptionBtn"+descriptionBtnCount

        posts.push( "<br/>");
        posts.push("<button type='button' id='"+ descriptionBtnID.toString() +"' class='btn btn-primary'>Description</button>");
        posts.push( "<br/>");

        descriptionBtnID = "#"+descriptionBtnID
        $('#currentPosts').on('click', descriptionBtnID, function(event){
          event.stopImmediatePropagation();
          postToDescribe = BLOB_ACCOUNT + val["filePath"]
          GetDescription(postToDescribe);  
        });
        posts.push("<img src='"+ BLOB_ACCOUNT + val["filePath"] +"' class='img-fluid' width='400' height='400'/> <br/>")
      }

      
      posts.push( "<br/>");
      posts.push( "<strong>Post: </strong>" + val["userPost"] + "<br />");
      posts.push( "<br/>");
      posts.push( "<strong>Uploaded by: </strong>" + val["userName"] + "<br/>");
      posts.push( "<hr />");
    });

    posts.reverse();

    $('#currentPosts').empty();

    $( "<ul/>", {
    "class": "my-new-list",
    html: posts.join( "" )
    }).appendTo( "#currentPosts" );

  });
}

function DeletePost(name, id)
{
  $.ajax({
    url: IDAIIMAGES1 + name + "/document/" + id + IDAIIMAGES2,
    type: 'DELETE',
    cache: false,
    contentType: false,
    processData: false,
    success: function (response) {
      document.getElementById('postsDiv').style.display = "none";
    }
  });
}

function UpdatePost(id, post, fileName)
{
  updatedPostID = id;
  document.getElementById('postsDiv').style.display = "none";
  document.getElementById('editPostDiv').style.display = "block";
  document.getElementById('editFileName').value = fileName;
  document.getElementById('editPostText').value = post;
}

function UpdateCurrentPost(updatedPostID)
{

  console.log(updatedPostID);

  var params = {
    "autocorrect": "True",
    "PII": "True",
    "classify": "True",
  };

  var settings = {
    "url": "https://com682-cw2-contentmoderator.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessText/Screen?" + $.param(params),
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Ocp-Apim-Subscription-Key": "da3c61cb98b740018814ab8b42627929",
      "Ocp-Apim-Subscription-Region": "eastus",
      "Content-Type": "text/plain"
    },
    "data": $('#editFileName').val() + " " + $('#editPostText').val()
  };

  $.ajax(settings).done(function (response) {
    
    console.log(response.Terms);
    result = response.Terms
    if (result == null)
    {
      putData = new FormData();

      putData.append('FileName', $('#editFileName').val());
      putData.append('userPost', $('#editPostText').val());
      $.ajax({
        url: IUIAIMAGES1 + updatedPostID + IUIAIMAGES2,
        data: putData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'PUT',
        success: function (response) {
          document.getElementById('postsDiv').style.display = "none";
          document.getElementById('editPostDiv').style.display = "none";
          updatedPostID = "";
          document.getElementById('editFileName').value = "";
          document.getElementById('editPostText').value = "";
          GetPosts();
        
        }
      });
    }
    else{
      alert("Terms used are not acceptable!")
    }
  }).fail(function() {
    alert("API Call FAILED");
  });
}

function GetTranslation(userPost)
{
  var settings = {
    "url": "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=fr",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Ocp-Apim-Subscription-Key": "637d9cf3c7ac44af91ce0b44cde4190c",
      "Ocp-Apim-Subscription-Region": "uksouth",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify([
      {
        "text": userPost
      }
    ]),
    "cache": "False"
  };

  let result = "";
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    result = "";
    result = response[0].translations[0].text;
    console.log(result);
    alert(result);
  }).fail(function() {
    alert("API Call FAILED");
  });
}

function GetDescription(userPost)
{
  var myKey = "c12e726efda54871bd7810e296ac845c";
  var myBody = {url: userPost}
  $(function() {
      var params = {
          // Request parameters
          "features": "caption"
        };

        $.ajax({
            url: "https://com682-cw2-computervision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-04-01-preview&" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", myKey);
            },
            type: "POST",
            // Request body
            data: JSON.stringify(myBody),
        })
        .done(function(response) {
          console.log(response.captionResult.text);
          result = response.captionResult.text;
          if (result == null)
          {
            alert("No description available")
          }
          else{           
            alert(result);
          }
        })
        .fail(function() {
          alert("API Call FAILED");
        });
    });
}