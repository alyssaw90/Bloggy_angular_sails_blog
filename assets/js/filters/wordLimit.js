//{{someVariable | wordLimit: 40}}

myBlogApp.filter('wordLimit', function(){

  return function(input, limit){
    //do something to input
    if(!input) return '';
    var words = input.split(' ');
    if(words.length <= limit){
      return input;
    }else{
      words.splice(limit);
      return words.join(' ')+'...';
    }
  };
});
