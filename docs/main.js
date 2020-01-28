(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    function addBtn(title, func, parentNode){
        return $("<button>",{text: title}).appendTo(parentNode||h).click(func);
    }
    $("<h1>",{text:"絵文字の肌の色差分を取得"}).appendTo(h);
    var colorName = [
        "標準",
        "明るい肌色",
        "やや明るい肌色",
        "肌色",
        "やや濃い肌色",
        "濃い肌色"
    ];
    var emojiList = {};
    [
        '👶',
        '🧒',
        '👦',
        '👧',
        '🧑',
        '👴',
        '👵',
        '🤚',
        '🖐',
        '✋',
        '👌',
        '👈',
        '👉',
        '👆',
        '🖕',
        '👇',
        '👍',
        '👎',
        '✊',
        '👊',
        '🤛',
        '🤜',
    ].forEach(function(v){
        emojiList[v] = v;
    });
    yaju1919.addSelect(h,{
        title: "絵文字簡単入力",
        placeholder: "ここから選択",
        change: function(str){
            if(!setup_flag) return;
            $("#i").val(str);
            main(str);
        },
        list: emojiList,
    });
    h.append("<br>");
    var h_input = $("<div>").appendTo(h);
    h.append("<br>");
    var h_emoji = $("<div>").appendTo(h);
    h.append("<br>");
    var input = yaju1919.addInputText(h_input,{
        id: "i",
        title: "絵文字入力欄",
        save: "emoji",
        placeholder: "絵文字を入力してください",
        change: main,
    });
    function main(str){
        if(!setup_flag) return;
        if(input() === '') return;
        h_emoji.empty();
        getEmojiColors(str).forEach(function(v,i){
            var line = $("<div>").appendTo(h_emoji);
            addBtn("copy",function(){
                yaju1919.copy(v);
            },line);
            yaju1919.addInputText(line,{
                title: colorName[i],
                value: v
            });
            line.find("div").css({display: "inline-block"});
        });
    }
    function getEmojiColors(str){
        var emoji = str.slice(0,2);
        var ar = []
        ar.push(emoji);
        for(var i = 0; i < 5; i++) {
            ar.push(emoji + [55356,57339 + i].map(function(v){
                return String.fromCharCode(v);
            }).join(''));
        }
        return ar;
    }
    h.append("<br>");
    yaju1919.addHideArea(h,{
        id2: "hide",
        title: "おんｊ動くAA作成ツール",
    });
    addBtn("copy",function(){
        if(result) yaju1919.copy(result);
    },$("#hide"));
    addBtn("簡単作成",function(){
        var width = 5, height = 5;
        var ar = getEmojiColors(input()).slice(1);
        result = "@aaa:0.1\n" + ar.concat(ar.slice(1,-1).reverse()).map(function(v){
            return new Array(height).fill().map(function(){
                return yaju1919.repeat(v, width);
            }).join('\n');
        }).join('\n@@@\n');
        showResult(result);
    },$("#hide"));
    $("#hide").append("<br>");
    $("#hide").append("<br>");
    var advance = yaju1919.addInputText($("#hide"),{
        title: "高度な操作",
        placeholder: colorName.map(function(v,i){
            return i + '...' + v;
        }).join('\n'),
        save: "nop",
        hankaku: false,
        textarea: true,
    });
    var result;
    addBtn("高度な動きを作成",function(){
        alert("未完成");
        var ar = getEmojiColors(input()).slice(1);
        var str = advance();
        result = "@aaa:0.1\n" + ar.concat(ar.slice(1,-1).reverse()).map(function(v,i){
            var str2 = str;
            ar.forEach(function(val){
                str2 = str2.replace(/1/g, ar[0]);
            });
        }).join('\n@@@\n');
        showResult(result);
    },$("#hide"));
    $("#hide").append("<br>");
    $("#hide").append("<br>");
    var result_elm = $("<div>").appendTo($("#hide"));
    function showResult(str){
        result_elm.empty();
        str.split('\n').forEach(function(v){
            $("<div>").text(v).appendTo(result_elm);
        });
    }
    var setup_flag = true;
})();
