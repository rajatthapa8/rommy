$(document).on("pagecreate", '#register', function() {
// Initialize form validation on the registration form.
    $("form[name='registration']").validate({
      // Specify validation rules
      rules: {
        uname: "required",
        pass: {
          required: true,
          minlength: 5
        },
        conf_pass: {
          required: true,
          minlength: 5
        },
        p_room:{
          required: true,
          range: [0, 10]
        }
      },
      messages: {
        uname: "Please enter your username",
        pass: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        conf_pass:{
          required: "Please retype your password",
          minlength: "Your password must be at least 5 characters long",
          equalTo: "Please enter the same password"
        },
        p_room:"Please specify the number of people in the house"

      },
    });

    

});


$(document).on("pagebeforecreate",'#register',function(event){
  
  $('body').on('input', "#p_room", function() {
    var people_size = ($(this).val());
    
    $('#show-here').empty();
    
    for(var i=0; i < people_size; i++){
      var data = '<div role="heading" class="ui-controlgroup-label">'+
    '  <legend>Member Details</legend>'+
    '</div>'+
    '<div class="ui-controlgroup-controls ">'+
    '  <fieldset data-role="controlgroup" class="ui-controlgroup ui-controlgroup-vertical ui-corner-all">'+
    '    <div role="heading" class="ui-controlgroup-label">'+
    '      <legend>Full Name</legend>'+
    '    </div>'+
    '    <div class="ui-controlgroup-controls ">'+
    '        <div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset ui-input-has-clear">'+
    '          <input type="text" name="f_name" id="f_name'+i+'"  data-clear-btn="true">'+
    '        </div>'+
    '    </div>'+
    '  </fieldset>'+
    '  <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all">'+
    '    <div role="heading" class="ui-controlgroup-label">'+
    '    <legend>Select Availability</legend>'+
    '  </div>'+
    '  <div class="ui-controlgroup-controls ">'+
    '    <div class="groupped-checkbox">'+
   '      <label>Sun</label>'+
    '         <input type="checkbox" name="avaDay'+i+'" id="avaDay'+i+'" value="sun_'+i+'"  />'+
    '    </div>'+
    '    <div class="groupped-checkbox">'+
    '      <label>Mon</label>'+
    '              <input type="checkbox" name="avaDay'+i+'" id="avaDay'+i+'" value="mon_'+i+'"/>'+
    '    </div>'+
    '    <div class="groupped-checkbox">'+
    '      <label>Tue</label>'+
    '           <input type="checkbox" name="avaDay'+i+'" id="avaDay'+i+'" value="tue_'+i+'"/>'+
    '    </div>'+
    '    <div class="groupped-checkbox">'+
    '      <label>Wed</label>'+
    '              <input type="checkbox" name="avaDay'+i+'" id="avaDay'+i+'" value="wed_'+i+'"/>'+
    '    </div>'+
    '    <div class="groupped-checkbox">'+
    '      <label>Thu</label>'+
    '              <input type="checkbox" name="avaDay'+i+'" id="avaDay'+i+'" value="thu_'+i+'"/>'+
    '    </div>'+
    '    <div class="groupped-checkbox">'+
    '      <label>Fri</label>'+
    '              <input type="checkbox" name="avaDay'+i+'" id="avaDay'+i+'" value="fri_'+i+'"/>'+
    '    </div>'+
    '    <div class="groupped-checkbox">'+
    '      <label>Sat</label>'+
    '              <input type="checkbox" name="avaDay'+i+'" id="avaDay'+i+'" value="sat_'+i+'" />'+
    '    </div>'+
    '    <div class="groupped-checkbox">'+
    '    </div>'+
    '  </div>'+
    '</fieldset>'+
    '</div>';
      $("#show-here").append(data);
    
}
  });

var dataArrayNames = [];
var dataArrayAvail = [];
//saves user's data name & avability in local storage
  $('#save_value').click(function(e){
    e.preventDefault()
    var val = [];
    var username = $("#uname").val();
    var password = $('#pass').val();
    var people_size = $('#p_room').val();
    var full_name = '';
    for(i=0;i<people_size;i++){
      let data_fname = $('#f_name'+i+'').val();
      
      $('#f_name'+i+'').each(function(value){
      full_name = $(this).val();
      var tmp = {
      id : i,
      full_name:full_name,
      };
      dataArrayNames.push(tmp);
      localStorage.names = JSON.stringify(dataArrayNames);
      
      })
    }
    
    
    var checkboxesChecked = [];
    $(':checkbox:checked').each(function(i){
      val[i] = $(this).val();
      var i;
      var checkboxes = document.getElementsByName('avaDay'+i+'');
      
    
    for (var i=0; i<checkboxes.length; i++) {
      if (checkboxes[i].checked) {
         checkboxesChecked.push(checkboxes[i].value);
         var str = checkboxes[i].value;
          var lastSlash = str.lastIndexOf("_");
          id =str.substring(lastSlash+1);
         var tmp = {
          id : id,
          member_avability:checkboxes[i].value,
          };
          dataArrayAvail.push(tmp);
          localStorage.names1 = JSON.stringify(dataArrayAvail);
        }    
      }
    });
    var dataArr = {
      username: username,
      password:password,
      noofPeople:people_size,
      fullname:localStorage.getItem('names'),
      member_avability: localStorage.getItem('names1')}
    $.ajax({ 
        url: '/signup',
        type: 'POST',
        cache: false, 
        data:dataArr,
        success: function(res) {
        $('#show-msg').html('<p>'+ res +'</p>');
         console.log(res);
       }, 
      });
    //  setTimeout(function() {
    //   window.location.href = "http://localhost:3000/#registration-sucessfull";
    //   }, 2000);
  });
  localStorage.removeItem('names');
  localStorage.removeItem('names1');
});


$(document).on("pagecreate", '#home', function() {
   //form validation for username and password
  $("form[name='login']").validate({
    rules: {
      unameLogin: "required",
      passLogin: "required"
      },
        messages: {
          uname: "Please enter your username",
          pass: "Please enter your password"
  
        },
      });


      $('#login').click(function(){
        var uname = $('#unameLogin').val();
        var pass = $('#passLogin').val();
        var data= {
          uname:uname,
          pass:pass
        }
        $.ajax({
          url:'/login',
          type:'POST',
          data: data,
          success: function(res) {
            $('#show-message').html('<p>'+ res +'</p>');
             console.log(res);
           }, 
        });
      });
  
  });