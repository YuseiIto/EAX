
function SplitSVG(src){

var txt=String(src).split('.');

return txt[0];
}


if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {

//スマートフォン時に実行したいjs

document.getElementById('Builder').src=SplitSVG(document.getElementById('Builder').src )+"_M.svg";
document.getElementById('Player').src=SplitSVG(document.getElementById('Player').src )+"_M.svg";
document.getElementById('About').src=SplitSVG(document.getElementById('About').src )+"_M.svg";

}






//*************("InfinityData" class constractor)********




var InfinityData = function() {

    this.Width = 1000; //ImageWidth
    this.Height = 500; //ImageHeight
  this.ColorPalet = [
        ['0', 0, 0, 0, 100],
        ['1', 255, 255, 255, 110],
        ['2', 128, 128, 128, 120],
        ['3', 255, 255, 0, 130],
        ['4', 255, 0, 255, 140],
        ['5', 0, 255, 255, 150],
        ['6', 0, 255, 0, 160],
        ['7', 255, 0, 0, 170],
        ['8', 128, 128, 0, 180],
        ['9', 128, 0, 128, 190],
        ['&', 0, 128, 128, 255],
        ['#', 0, 0, 128, 230],
        [';', 128, 0, 0, 220],
        ['[', 0, 128, 0, 40],
        [']', 192, 192, 192, 10],
        ["", 64, 0, 255, 0]
    ];
    //It's color palet. Methods refer this.
    //ColorPalet[0 - 15][0]:Char
    // ColorPalet[0-15][1]:Red
    //ColorPalet[0-15][2]:Green
    //ColorPalet[0-15]:Blue
    this.Text = "";
    this.DataUrl = "";
}

//****************("InfinityData" class methods)*******

InfinityData.prototype = {

    //****(convert image to text method ".Decode")****

    Decode: function(flg) {

        //*****************(Include functions what ".Decode" method uses)**********************

        function Str_Dec(text) {

            var retext = "";


            do {
                var n = String(text).indexOf("&#");
                var m = String(text).indexOf(";");
                if ((n > -1) && (m > n)) {
                    //１文字分のコードを取得
                    var code = parseInt(text.substring(n + 2, m));
                    //コードを変換して接続
                    retext += String.fromCharCode(code);
                    //テキスト削除
                    text = text.substring(m + 1, text.length);
                } else {
                    text = "";
                }
            } while (text != "")
            //平文表示
            return retext;
        }



        function OpenHTML(txt) {
var str_arr1 = String(txt).split('[\*]');
                    var str = str_arr1[0];
                    str = Str_Dec(str);

document.getElementById('main-logo').style.width='10%';
 var iframe = document.getElementById('target');
iframe.style.display='inline-block';
if(iframe.contentDocument) {
 iframe.contentDocument.open();
 iframe.contentDocument.write(str);
iframe.contentDocument.close();
        }

document.getElementById("inputarea").innerHTML="";
document.getElementById("inputarea").innerHTML='<div id="inputarea" class="input-file"  >\
<div class="preview" style="height:100px;">\
	<div class="input-file-view">\
		<img src="pics/OpenFile.svg" style="height:85px;" id="ico" class="button">\
	</div>\
	</div>\
	<input class="input-file-core" type="file" Onchange="Go(this.files);" accept="Image/*,.htm,.html">\
</div>';
        }

       function OpenHTML2(txt) {
var str_arr1 = String(txt).split('[\*]');
                    var str = str_arr1[0];
                    str = Str_Dec(str);
editAreaLoader.setValue("editor_js", str);
            var iframe = document.getElementById('preview');
if(iframe.contentDocument) {
 iframe.contentDocument.open();
 iframe.contentDocument.write(str);
iframe.contentDocument.close();
        }


}


        var AlphaToChr = function(a, ColorPalet) {
var i =0;
while (ColorPalet[i][4]!=a){
i=i+1;

if(i==16){
i=15;
break;
}
}
             return ColorPalet[i][0];
        }

        var GetText = function(Width, Height, ColorPalet, ctx) {
            //This function decodes image.
            //*********Arguments*****************
            //Width : Image width
            //Height: Image height
            //ColorPalet:ColorPaletArray
            //ctx:canvas context
            //*********************************

            var imageData = ctx.getImageData(0, 0, Width, Height);
            var txt = ""; //Text after decode

            var i = 0; //counter
            while (i < (Width * Height)) {
                var x = i%Width; //Decode here(x).
                var y = ((i - x) / Width); //Decode here (y).
                var m = ((y * (4 * Width)) + (x * 4)) | 0; //Index to access "image data" array

                txt = txt + AlphaToChr( imageData.data[(m + 3)], ColorPalet);

                i = i + 1;
            }
            return txt;
        }



        var FuncBody = function(img, ColorPalet) {
            var Infinity_Canvas = document.createElement("CANVAS");
            var context = Infinity_Canvas.getContext('2d');　
            Infinity_Canvas.width = imgobj.width;
            Infinity_Canvas.height = imgobj.height;
            context.drawImage(img, 0, 0);
            var txt = GetText(imgobj.width, imgobj.height, ColorPalet, context);

            console.log('#InfinityDataLog# Text Got');
            var text_arr = String(txt).split('[;]');
if (flg){
          OpenHTML(text_arr[0] + "[;]");
} else{
      OpenHTML2(text_arr[0] + "[;]");

}

        }

 



        //*********************(".Decode" method's body)*****************************

        var ColorPalet = this.ColorPalet;


        var imgobj = new Image();

        imgobj.onload = function() {


            FuncBody(imgobj, ColorPalet);


        }
        imgobj.src = this.DataUrl;
    },


    //****(convert text to image method ".Encode")**********************************************************
    Encode: function() {



//**************(A funtion for Super Sizing Technology)******************

function SuperSizing(length){

var sqrt=Math.sqrt(length)

var long=Math.ceil(sqrt);

return long;
}

        //*************(A function what ".Encode" method uses.)******************
        var Str_Enc = function(text) {
            //Converting String to HTML Encode function.
            var num = text.length;
            var retext = "";
            if (num > 0) {
var i=0;
                for ( i = 0; i < num; i++) {
                    //Get a character and to be code
                    var code = text.charCodeAt(i);
                    //connect each character's code
                    if (code > -1) {
                        retext += "&#" + code + ";";
                    }
                }
            }
            return retext;
        }


    var Infinity_Canvas = document.getElementById("InfCvs");

            var Text = this.Text;
this.Width=Infinity_Canvas.width;
this.Height=Infinity_Canvas.height;

if(this.Text.length>Infinity_Canvas.width*Infinity_Canvas.height){

alert('画像サイズが小さすぎます。\n 画像の縦[px]×横[px]の値が' + Text.length + '以上になるようにしてください。' );
exit;

}
      
        //Define variable to make image
        var context = Infinity_Canvas.getContext("2d"); //2d is instance like canvas style define. 2d is the most popular .

        var beforeTextArr = String(Text).split('');
        var char = "";
        var imageData = context.getImageData(0, 0, this.Width, this.Height); // Get data of pixel all over the campus.
var ImgDeta=imageData.data;
        var length = beforeTextArr.length;
        var x = 0;
        var y = 0;
        var m = 0;
        var i = 0;
            var Width = this.Width;




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@

i=0;



//@@@@@@@@@@@@@@@@@@
        while (i < length) {
            char = beforeTextArr[i];
            var j = 0;
            while (char != this.ColorPalet[j][0]) {
                j = j + 1;
                if (j == 16) {
                    j = 0;
                    break;
                }
            }

            var x = i%Width;
            var y = ((i - x) / Width);
            var m = ((y * (4 * Width)) + (x * 4)) | 0;

if(ImgDeta[m+3]==0){
ImgDeta[m]=255;
ImgDeta[m+1]=255;
ImgDeta[m+2]=255;
}
            ImgDeta[(m + 3) | 0] = this.ColorPalet[j][4]; //Alpha


            i = (i + 1) | 0;
        }
imageData.data=ImgDeta;
        context.putImageData(imageData, 0, 0); //Apply changes to the canvas.

        var png = Infinity_Canvas.toDataURL("image/png");
        this.DataUrl = png;

        return (png);
    }

}
