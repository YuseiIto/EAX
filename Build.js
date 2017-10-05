function OnfileSelect(files) {
    var reader = new FileReader();
    reader.onload = function(event) {

        var Img = new Image();
        Img.onload = function() {

            var canvas = document.getElementById('InfCvs');
            canvas.width = Img.naturalWidth;
            canvas.height = Img.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.globalAlpha = 1.0;
            ctx.drawImage(Img, 0, 0);

        }
        Img.src = event.target.result;

    }
    reader.readAsDataURL(files[0]);
    document.getElementById('filename').innerHTML = "選択済み:" + files[0].name;
}

//Encode process
function Go() {

    var num = String(editAreaLoader.getValue("editor_js")).length;
    var retext = "";
    if (num > 0) {
        for (var i = 0; i < num; i++) {
            //Get a character and to be code
            var code = String(editAreaLoader.getValue("editor_js")).charCodeAt(i);
            //connect each character's code
            if (code > -1) {
                retext += "&#" + code + ";";
            }
        }

    }


    var obj = new InfinityData(); //Class defined at InfinityData.js
    obj.Text = "[#]" + retext + "[;]";

    var str = obj.Encode();

    //canvas initialize process
    document.getElementById('Cvs_Ara').innerHTML = '<canvas id="InfCvs" style="display:none;"></canvas>';

    //image visible process
    document.getElementById('img').style = "border:solid 3px #000000;padding:4px;";
    document.getElementById('img').src = str;
    document.getElementById('img').style.width = '50%';

    alert("お待たせしました。　エンコードが完了しました。");

}

//プレビューについての処理
function Preview() {
    console.log("Reload called");

    var str = editAreaLoader.getValue("editor_js");
    console.log('PRM=' + str);
    var iframe = document.getElementById('preview');
    if (iframe.contentDocument) {
        iframe.contentDocument.open();
        iframe.contentDocument.write(str);
        iframe.contentDocument.close();
    }
    document.getElementById("LoadFile").innerHTML = "";
    document.getElementById("LoadFile").innerHTML = '<input type="file"  OnChange="Go(this.files)">';
}

function Read_Img(file) {
    var reader = new FileReader();


    //ファイルの読込が終了した時の処理
    reader.onload = function() {
            var obj = new InfinityData();
            obj.DataUrl = reader.result;
            console.log(obj.DataUrl);
            console.log("Decode Start");
            obj.Decode(false);

        }
        //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file[0]);
}


function Read_Html(file) {
    var reader = new FileReader();


    //ファイルの読込が終了した時の処理
    reader.onload = function() {
            var str = reader.result;
            editAreaLoader.setValue("editor_js", str);
            var iframe = document.getElementById('preview');
            if (iframe.contentDocument) {
                iframe.contentDocument.open();
                iframe.contentDocument.write(str);
                iframe.contentDocument.close();
            }
            document.getElementById("LoadFile").innerHTML = "";
            document.getElementById("LoadFile").innerHTML = '<input type="file"  OnChange="Go(this.files)">';
        }
        //dataURL形式でファイルを読み込む
    reader.readAsText(file[0]);
}


function Read(files) {


    var file = files[0].name;
    var f = file.split('.');
    var type = f[f.length - 1].toLowerCase();

    if (type == "html" || type == "txt" || type == "htm") {
        //When HTML
        Read_Html(files);
    } else if (type == "svg" || type == "png" || type == "jpeg" || type == "jpg" || type == "bmp" || type == "gif") {
        //WhenImg
        Read_Img(files);
    }

    document.getElementById('preview').style.height = "370px";
    document.getElementById('inputarea').innerHTML = '<div class="preview" ">\
	<div class="input-file-view">\
		<img src="pics/OpenFile.svg" style="height:80px;margin-right:auto; margin-left:auto;" id="ico" class="button" >\
	</div>\
	</div>\
	<input class="input-file-core" type="file" Onchange="OnfileSelect(this.files);"accept="Image/*,.htm,.html,.txt,HTML,HTM">';
}