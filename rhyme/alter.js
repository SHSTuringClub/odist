"use strict";
var soul = require('../soul');
var Prayer = soul.chronicle.Prayer;
var p_type = {
    '新闻': 0,
    '图片含描述': 1,
    '图片不含描述': 2,
    '待机': 9
};
var day = {
    '周一': 0,
    '周二': 1,
    '周三': 2,
    '周四': 3,
    '周五': 4,
    '周六': 5,
    '周日': 6
};
var glimpse = soul.memory.get_glimpse();
var glimpse_element = document.getElementById('glimpse');
var chronicle = soul.memory.get_chronicle();
//chronicle = [
//    new Prayer(0, 5, 50, 0, 'D:\\test1'),
//    new Prayer(1, 6, 12, 1, 'D:\\test2'),
//    new Prayer(3, 5, 33, 2, 'D:\\test3')];
function glimpse_genesis() {
    glimpse_element.value = glimpse.toString();
}
function submit_glimpse() {
    var g = glimpse_element.value;
    soul.memory.set_glimpse(parseInt(g));
}
function generate_tr(_no, _pr) {
    var tr = document.createElement('tr');
    var strArr = _pr.to_string_array(_no);
    var th_no = document.createElement('th');
    th_no.innerHTML = strArr[0];
    var th_ty = document.createElement('th');
    th_ty.innerHTML = strArr[1];
    var th_pa = document.createElement('th');
    th_pa.innerHTML = strArr[2];
    var th_tm = document.createElement('th');
    th_tm.innerHTML = strArr[3];
    var th_btn = document.createElement('th');
    var btn_del = document.createElement('button');
    btn_del.innerHTML = '删除';
    tr.appendChild(th_no);
    tr.appendChild(th_ty);
    tr.appendChild(th_pa);
    tr.appendChild(th_tm);
    tr.appendChild(th_btn);
    th_btn.appendChild(btn_del);
    tr.setAttribute('id', "tr-prayer-" + _no.toString());
    btn_del.setAttribute('onclick', "prayer_ignite(" + _no + ")");
    btn_del.setAttribute('name', 'delete-button');
    return tr;
}
function timeline_genesis() {
    var len = chronicle.length;
    for (var i = 0; i < len; i++) {
        var j = generate_tr(i, chronicle[i]);
        document.getElementById('timeline-table-body').appendChild(j);
    }
}
function prayer_ignite(_no) {
    chronicle.splice(_no, 1);
    soul.memory.set_chronicle(chronicle);
}
function rewrite_history() {
    var new_type = document.getElementById('new_type').value;
    var ty = p_type[new_type];
    var path = document.getElementById('new_directory').value;
    var new_weekday = document.getElementById('new_weekday').value;
    var weekday = day[new_weekday];
    var hh = parseInt(document.getElementById('HH').value);
    var mm = parseInt(document.getElementById('MM').value);
    var prayer = new Prayer(weekday, hh, mm, ty, path);
    for (var i = 0; i < chronicle.length; i++) {
        if (chronicle[i].p_time.toTimestamp() == prayer.p_time.toTimestamp()) {
            alert('不得有重复的起始时间!');
            return;
        }
    }
    chronicle = chronicle.concat(prayer);
    chronicle.sort(function (a, b) {
        return a.p_time.toTimestamp() - b.p_time.toTimestamp();
    });
    soul.memory.set_chronicle(chronicle);
}
glimpse_genesis();
timeline_genesis();
//# sourceMappingURL=alter.js.map