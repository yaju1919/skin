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
    $("<div>",{text:"肌の色差分の絵文字は廃止されているのでスマホだと見れません..."}).appendTo(h);
    $("<div>",{text:"出力内容は、クリックしただけでコピーされます。"}).appendTo(h);
    h.append("<br>");
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
        placeholder: "絵文字を入力してください",
        change: main,
    });
    function main(str){
        if(!setup_flag) return;
        if(input() === '') return;
        h_emoji.empty();
        getEmojiColors(str).forEach(function(v,i){
            var line = $("<div>").appendTo(h_emoji);
            yaju1919.addInputText(line,{
                title: colorName[i],
                value: v,
                readonly: true,
            });
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
    h.append("<br>");
    h.append("<br>");
    var h_result = $("<div>").appendTo(h);
    function showResult(array,speed){
        var str = "@aaa:" + (speed||0.1) + "\n" + array.join('\n@@@\n');
        $("<div>").text("現在の文字数:"+str.length).appendTo(h_result.empty());
        yaju1919.addInputText(h_result,{
            title: "出力",
            value: str,
            readonly: true,
            textarea: true,
            hankaku: false,
        });
    }
    addBtn("簡単作成",function(){
        var width = 5, height = 5;
        var ar = getEmojiColors(input()).slice(1);
        showResult(ar.concat(ar.slice(1,-1).reverse()).map(function(v){
            return yaju1919.makeArray(height).map(function(){
                return yaju1919.repeat(v, width);
            }).join('\n');
        }));
    },$("#hide"));
    $("#hide").append("<br>");
    $("#hide").append("<br>");
    yaju1919.addHideArea($("#hide"),{
        id2: "adv",
        title: "高度な動き",
        value: "000000000\n011111110\n012222210\n012333210\n012343210\n012333210\n012222210\n011111110\n000000000",
        save: "adv",
    });
    var advance = yaju1919.addInputText($("#adv"),{
        placeholder: colorName.slice(1).map(function(v,i){
            return i + '...' + v;
        }).join('\n'),
        save: "nop",
        hankaku: false,
        textarea: true,
    });
    function calc(n){
        var a = n % 8;
        return a < 5 ? a : 8 - a;
    }
    addBtn("高度な動きを作成",function(){
        var ar = getEmojiColors(input()).slice(1);
        var str = advance();
        showResult(yaju1919.makeArray(8).map(function(v,i){
            return str.replace(/[0-4]/g, function(n){
                return ar[calc(Number(n) + i)];
            });
        }));
    },$("#adv"));
    $("#adv").append("<br>");
    $("#adv").append("<br>");
    var typing_area = yaju1919.addInputText($("#adv"),{
        id: "typing",
        title: "タイピングAAの作成",
        hankaku: false,
        textarea: true,
    });
    var typing_array = [];
    function typingWait(str){
        return yaju1919.makeArray(6).map(function(v){
            return str + (v % 2 ? '' : '＿');
        });
    }
    function typing(){
        var newValue = typing_area().replace(/＿/g,''),
            lastValue = (typing_array.slice(-1)[0] || '').replace(/＿/g,''),
            btm = newValue.slice(-1),
            lastBtm = lastValue.slice(-1);
        if(newValue === lastValue) return;
        //------------------------------------------------------------------------
        if(btm.trim()==='' && lastBtm.trim() !== ''){
            typing_array = typing_array.concat(typingWait(lastValue));
        }
        typing_array.push(newValue + '＿');
        //------------------------------------------------------------------------
        showResult(typingWait('').concat(typing_array,typingWait(newValue)),0.2);
    }
    $("#typing").keydown(typing).keypress(typing).keyup(typing);
    addBtn("タイピングAAをリセット",function(){
        typing_array = [];
        h_result.empty();
        $("#typing").val('');
    },$("#adv"));
    $("#adv").append("<br>");
    var setup_flag = true;
})();
