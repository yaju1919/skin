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
            if(!h_emoji) return;
            $("#i").val(str);
            main(str);
        },
        list: emojiList,
    });
    var h_input = $("<div>").appendTo(h);
    var h_emoji = $("<div>").appendTo(h);
    var input = yaju1919.addInputText(h_input,{
        id: "i",
        title: "絵文字入力欄",
        save: "emoji",
        placeholder: "絵文字を入力してください",
        change: main,
    });
    function main(str){
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
        });
    }
    function getEmojiColors(str){
        if(str.length < 2) return;
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
    var colorName = [
        "標準",
        "明るい肌色",
        "やや明るい肌色",
        "肌色",
        "やや濃い肌色",
        "濃い肌色"
    ];
    h.append("<br>");
    yaju1919.addInputText(h,{
        placeholder: "特に意味のない入力欄\n絵文字アート作成用\n自動セーブ機能あり",
        save: "nop",
    });
})();
