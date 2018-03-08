var operation = []
var appendArr = []

// 添加显示用的函数
var appendNum = function(v) {
    appendArr.push(v)
    var str = loadNum()
    return str
}

// 删除显示用的函数
var removeNum = function() {
    var len = appendArr.length - 1
    appendArr.splice(len, 1)
    var str = loadNum()
    return str
}

// 载入显示的数字
var loadNum = function() {
    var string = ''
    for(let i = 0; i < appendArr.length; i++) {
        var string = string + appendArr[i]
    }
    var str = string
    var string = ''
    console.log('str', str)
    return str
}

// 判断运算数组
var determineNum = function(){
    var sign = ['+', '-', '/', '*']
        if (operation.length == 0) {
            return 'none'
        } else if (!sign.includes(operation[1])){
            return 'none'
        }
}

// 运算函数
var count = function(n) {
    console.log('')
    if(operation[1] == '+') {
        return parseFloat(operation[0]) + parseFloat(n)
    } else if(operation[1] == '-') {
        return parseFloat(operation[0]) - parseFloat(n)
    } else if(operation[1] == '/') {
        return parseFloat(operation[0]) / parseFloat(n)
    } else if(operation[1] == '*') {
        return parseFloat(operation[0]) * parseFloat(n)
    }
}

// 解锁四则运算按键
var deBlock = function() {
    var arithmetic = document.querySelectorAll('.arithmetic')
    for(let i = 0; i < arithmetic.length; i++) {
        arithmetic[i].setAttribute('data-lock', 'deblock')
    }
}

// 上锁四则运算按键
var block = function() {
    var arithmetic = document.querySelectorAll('.arithmetic')
    for(let i = 0; i < arithmetic.length; i++) {
        arithmetic[i].setAttribute('data-lock', 'block')
    }
}

// 判断锁的状态
var inspectBlock = function() {
    var arithmetic = document.querySelectorAll('.arithmetic')
    for(let i = 0; i < arithmetic.length; i++) {
        var a = arithmetic[i].getAttribute('data-lock')
        if(a != 'deblock'){
            return console.log('error')
            break
        }
    }
    return 'deblock'
}

// 判断小数点是否可输入
var inspectDot = function() {
    for(let i = 0; i < appendArr.length; i++) {
        if(appendArr[i] == '.' || appendArr.length <= 0){
            return false
        }
    }
     return true
}

// 绑定按钮
var bindEvent = function() {
    var keys = document.querySelector('.calculator-key')
    var large = document.querySelector('.calculator-display-large')
    var small = document.querySelector('.calculator-display-small')
        keys.addEventListener('click', function(){
            var target = event.target
            if(target.classList.contains('key-number')){
                console.log('key-number')
                // 清空大显示区域
                large.innerHTML = ''
                var value = target.innerHTML
                large.innerHTML = appendNum(value)
                // 解锁四则运算按键
                deBlock()
            } else if (target.classList.contains('arithmetic')){
                console.log('arithmetic')
                if(inspectBlock() == 'deblock') {
                    if(determineNum() == 'none') {
                        // 小显示区域
                        small.innerHTML = large.innerHTML + target.dataset.id
                        // push 大显示区域的数字
                        var html = large.innerHTML
                        operation.push(html)
                        // 清空大显示区域
                        large.innerHTML = ''
                        // push 被点击的四则运算符号
                        var dataId = target.dataset.id
                        operation.push(dataId)
                        // 清空添加数组
                        appendArr.splice(0, appendArr.length)
                        // 上锁
                        block()
                    } else {
                        // 小显示区域
                        small.innerHTML = small.innerHTML + large.innerHTML + target.dataset.id
                        // 把 大显示区域 的数字 传进 运算函数
                        var num = large.innerHTML
                        var result = count(num)
                        // 大显示区域替换为 运算返回的结果
                        large.innerHTML = result
                        // 清空运算数组
                        operation.splice(0, operation.length)
                        // 把返回的结果和点击的符号添加到数组
                        operation.push(result)
                        var dataId = target.dataset.id
                        operation.push(dataId)
                        // 清空添加数组
                        appendArr.splice(0, appendArr.length)
                        // 上锁
                        block()
                    }
                }
            } else if (target.classList.contains('equal')){
                if(operation.length > 1 && inspectBlock() == 'deblock') {
                    // 把 大显示区域 的数字 传进 运算函数
                    var num = large.innerHTML
                    var result = count(num)
                    // 大显示区域替换为 运算返回的结果
                    large.innerHTML = result
                    // 清空运算数组
                    operation.splice(0, operation.length)
                    // 清空添加数组
                    appendArr.splice(0, appendArr.length)
                    // 清空小显示区域
                    small.innerHTML = ''
                }
            } else if (target.classList.contains('ce')){
                    // 清空大显示区域
                    large.innerHTML = ''
                    // 清空添加数组
                    appendArr.splice(0, appendArr.length)
                    // 上锁
                    block()
            } else if (target.classList.contains('c')){
                    // 清空所有显示区域
                    large.innerHTML = ''
                    small.innerHTML = ''
                    // 清空添加数组
                    appendArr.splice(0, appendArr.length)
                    // 清空运算数组
                    operation.splice(0, operation.length)
                    // 上锁
                    block()
            } else if (target.classList.contains('backspace')){
                    large.innerHTML = removeNum()
            } else if (target.classList.contains('minus')){
                    console.log('minus 点击')
                    if(!appendArr.includes('-')){
                        appendArr.splice(0, 0, '-')
                        large.innerHTML = loadNum()
                    }
            } else if (target.classList.contains('dot')) {
                console.log(appendArr)
                if(inspectDot() == true) {
                    // 清空大显示区域
                    large.innerHTML = ''
                    var value = target.innerHTML
                    large.innerHTML = appendNum(value)
                }
            }
        })
}

bindEvent()
