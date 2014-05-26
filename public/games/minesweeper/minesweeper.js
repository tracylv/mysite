(function ($) {
    var defaults =
            {
              width: 400
            };
    var minenum;
    var level;
    var itemWidth;
    var timeoutid;
    var time = 0;
    var total;
    var bombArray = new Array();
    var flagArray = new Array();
    var otherArray = new Array();

   $.init = function (options)
   {
      $(".foot .startbtn").attr("disabled",true);
      $(".foot .level").attr("disabled",true);
      
      var settings = $.extend(true, {}, defaults, options);
      level = parseInt($(".foot .level").val());
      minenum = parseInt([10, 25, 50][level]);
      itemWidth = parseInt(settings.width/ ([10, 16, 20][level]));
      total = [10, 16, 20][level] * [10, 16, 20][level];

      $(".head .mine").text(minenum);
      timeoutid = setInterval(function(){ 
                                $(".head .time").text((parseInt(time/60) < 10 ? "0":"")+ parseInt(time/60) +" : " + ((time%60) < 10 ? "0":"") + time++%60);
                             }, 1000); 

      var canvas = $("#canvas")[0];
      var context = canvas.getContext('2d');
      context.strokeStyle= "gray";
      context.beginPath();
            
      for(var x = itemWidth; x <= settings.width - itemWidth; x = x + itemWidth)
      {
          context.moveTo(x, 0);
          context.lineTo(x, settings.width);
      } 

      for(var y = itemWidth; y <= settings.width - itemWidth; y = y + itemWidth)
      {
          context.moveTo(0, y);
          context.lineTo(settings.width, y);
      }      

      context.closePath();
      context.clearRect(0, 0, settings.width, settings.width);
      context.stroke();
      
      setBomb(settings);

      $(".canvas").bind("mousedown",function(event)
                        {                  
                           var keycode = event.which || event.keyCode;

                           var x = event.layerX;
                           var y = event.layerY;
                           x =  parseInt((x >= 1? x-1: x)/itemWidth) * itemWidth;
                           y =  parseInt((y >= 1? y-1: y)/itemWidth) * itemWidth;                       

                           if(keycode == 1)
                           { 
                              leftClick(context, x, y, settings);
                           }
                           if(keycode == 3)
                           { 
                              rightClick(context, x, y);
                           }
                        });
   }

   function drawImage(context, x, y, type)
   {
     var img = new Image();

     img.src = type + '.png';  
  
     img.onload = function(){
                     context.drawImage(img, x+1, y+1, itemWidth-2, itemWidth-2);
                  }
   }
   
   function drawText(context, x, y, text)
   {
      context.textBaseline = "top";
      context.font = [18, 13, 10][level] + "pt Arial";
      context.fillStyle = "black";
      context.fillText(text, x + parseInt(itemWidth/3), y + parseInt(itemWidth/4));
   }

   function setBomb(options)
   {
      while(bombArray.length < minenum)
      {
          var x = parseInt(Math.random() * options.width/itemWidth) * itemWidth;
          var y = parseInt(Math.random() * options.width/itemWidth) * itemWidth;
          var flag = false;
          for( var j=0; j < bombArray.length; j++)
          {
             if(x == bombArray[j].x && y == bombArray[j].y)
             { 
               flag = true;
               break;
             } 
          }
          if(!flag)
          {
             bombArray.push({"x": x, "y": y});
          }
      }
   }

   function showBomb(context, flagNum)
   {     
      for( var i=0; i<bombArray.length; i++)
      {
         context.clearRect(bombArray[i].x+1, bombArray[i].y+1, itemWidth-2, itemWidth-2);
         drawImage(context, bombArray[i].x, bombArray[i].y, "bomb");      
 
         if(otherArray.length + bombArray.length == total && bombArray.length == flagNum)
         {
            context.fillStyle="#bceda2";
            context.fillRect(bombArray[i].x+1, bombArray[i].y+1, itemWidth-2, itemWidth-2);
         }
      }
   }
   
   function rightClick(context, x, y)
   { 
      for( var k =0, kmax = otherArray.length; k < kmax; k++)
      {
         if( x == otherArray[k].x && y == otherArray[k].y )
         {
            return;
         }
      }      

      var marked = false;
      
      for (var i=0, max = flagArray.length; i< max; i++)
      {
         if( x == flagArray[i].x && y == flagArray[i].y)
         {
            marked = true;

            if( flagArray[i].flag == 1)
            {
               flagArray[i].flag = 2;
               context.clearRect(x+1, y+1, itemWidth-2, itemWidth-2);
               drawImage(context, x, y, "qs");
               $(".head .mine").text(++minenum);
              // total++;             
            }
            else
            {
               flagArray[i].flag = 0;
               context.clearRect(x+1, y+1, itemWidth-2, itemWidth-2);
            }
            break;
         }
      }
      
      flagArray = $.grep(flagArray, function(item, key)
                  {
                      return  item.flag == 0 ? false: true;                     
                  });

      if (!marked)
      {
         flagArray.push({"x": x, "y": y, "flag": 1});

         var markNum =0;
         for (var j = 0, max = flagArray.length; j<max;j++)
         {
            if(flagArray[j].flag == 1)
            {
               markNum++;
            }
         }

         if(!(otherArray.length + bombArray.length == total && bombArray.length == markNum))
         {
            drawImage(context, x, y, "mark");
         }

         $(".head .mine").text(--minenum); 
         //total--;
      }
      
      isWin(context);       
   }

   function leftClick(context, x, y, options)
   { 
       for ( var j=0, maxf = flagArray.length; j < maxf; j++)
       {
           if( x == flagArray[j].x && y == flagArray[j].y)
           {  
              if(flagArray[j].flag == 1) 
              {
                  return;
              }
              else
              {
                  flagArray[j].flag = 0;
                  break;  
              }
           } 
       }

      for( var k =0, kmax = otherArray.length; k < kmax; k++)
      {
         if( x == otherArray[k].x && y == otherArray[k].y )
         {
            return;
         }
      } 

       for (var i=0, max = bombArray.length; i < max ; i++)
       {
          if (x == bombArray[i].x && y == bombArray[i].y )
          {
              context.clearRect(x+1, y+1, itemWidth-2, itemWidth-2);
              context.fillStyle="red";
              showBomb(context, 0);
              context.fillRect(x+1, y+1, itemWidth-2, itemWidth-2);
              clearTimeout(timeoutid);
              $(".canvas").unbind("mousedown");
              alert("YOU LOSE!");
              return;
          }
       }

       showText(context, x, y, options);
       
       isWin(context); 
   }
    
   function showText(context, x, y, options)
   {
       context.clearRect(x+1, y+1, itemWidth-2, itemWidth-2);     
       context.fillStyle="#bceda2";
       context.fillRect(x+1, y+1, itemWidth-2, itemWidth-2);
       otherArray.push({"x": x, "y": y});
      // total--;
       
       var count = 0;
       var pointsArray = new Array();
       if (x-itemWidth >= 0)
       {
          pointsArray.push({"x":x-itemWidth, "y":y});
          if( y-itemWidth >=0 )
          {
            pointsArray.push({"x":x-itemWidth, "y":y-itemWidth});
          }
          if( y+2*itemWidth <= options.width)
          {
            pointsArray.push({"x":x-itemWidth, "y": y+itemWidth});
          }
       }
       if (x+2*itemWidth <= options.width)
       {
          pointsArray.push({"x": x+itemWidth, "y": y});
          if( y-itemWidth >=0 )
          {
            pointsArray.push({"x":x+itemWidth, "y":y-itemWidth});
          }
          if( y+2*itemWidth <= options.width)
          {
            pointsArray.push({"x":x+itemWidth, "y": y+itemWidth});
          }
       }
       if( y-itemWidth >=0 )
       {
          pointsArray.push({"x":x, "y":y-itemWidth});
       }
       if( y+2*itemWidth <= options.width)
       {
          pointsArray.push({"x":x, "y": y+itemWidth});
       }
         
       for ( var k=0, max=pointsArray.length; k<max; k++ )
       {
           for( var h=0, maxh=bombArray.length; h<maxh; h++)
           {
              if(pointsArray[k].x == bombArray[h].x && pointsArray[k].y == bombArray[h].y)
              {
                 count++;
              }
           }
       }
       if (count > 0)
       {
          drawText(context, x, y, count); 
       }
       else
       {
          for( var i=0, maxi=pointsArray.length; i<maxi; i++)
          { 
             var hasShow = false;
             for( var j=0, maxj=otherArray.length; j<maxj; j++)
             {
                if( pointsArray[i].x == otherArray[j].x && pointsArray[i].y == otherArray[j].y )
                {
                    hasShow = true;
                    break; 
                }
             }
             
             if (!hasShow)
             {
                 showText(context, pointsArray[i].x, pointsArray[i].y, options);
             } 
          }    

       }
   }
   
   function isWin(context)
   {
       var flagNum =0;
       for (var i = 0, max = flagArray.length; i<max;i++)
       {
          if(flagArray[i].flag == 1)
          {
             flagNum++;
          }
       }
       
       if(otherArray.length + bombArray.length == total && bombArray.length == flagNum)
       {
          showBomb(context, flagNum);
          clearTimeout(timeoutid);
          $(".canvas").unbind("mousedown");
          alert("YOU WIN!");
       }
   } 
})(jQuery);
