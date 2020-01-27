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
    yaju1919.addInputText(h,{
        placeholder: "絵文字アート作成用\n自動セーブ機能あり",
        save: "nop",
        textarea: true,
    });
    h.append("<br>");
    h.append("<br>");
    var width = yaju1919.addInputNumber(h,{
        title: "幅",
        value: 5,
        min: 1,
        max: 9,
        int: true,
        save: "width",
    });
    var height = yaju1919.addInputNumber(h,{
        title: "高さ",
        value: 5,
        min: 1,
        max: 9,
        int: true,
        save: "height",
    });
    var result;
    addBtn("おんｊ用動くAA作成ボタン",function(){
        result = "@aaa:0.1\n" + getEmojiColors(input()).map(function(v){
            return new Array(height()).fill().map(function(){
                return yaju1919.repeat(v, width());
            }).join('\n');
        }).join('@@@');
        showResult(result);
    });
    addBtn("copy",function(){
        if(result) yaju1919.copy(result);
    });
    var result_elm = $("<div>").appendTo(h);
    function showResult(str){
        result_elm.empty();
        str.split('\n').forEach(function(v){
            $("<div>").text(v).appendTo(result_elm);
        });
    }
    var setup_flag = true;
})();
