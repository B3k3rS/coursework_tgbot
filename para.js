const database = require("./database.js");


function timeInParaCounter(h,m) {
    const time = h * 60 + m; // Перетворюємо час у хвилини

    // Розклад часу початку та кінця кожної пари
    const schedule = [
        { start: 8 * 60 + 30, end: 9 * 60 + 50 }, // 8:30 - 9:50
        { start: 10 * 60 + 5, end: 11 * 60 + 25 }, // 10:05 - 11:25
        { start: 11 * 60 + 55, end: 13 * 60 + 15 }, // 11:55 - 13:15
        { start: 13 * 60 + 25, end: 14 * 60 + 45 }, // 13:25 - 14:45
        { start: 14 * 60 + 55, end: 16 * 60 + 15 }, // 14:55 - 16:15
        { start: 16 * 60 + 45, end: 18 * 60 + 5 }, // 16:45 - 18:05
        { start: 18 * 60 + 15, end: 19 * 60 + 35 }, // 18:15 - 19:35
        { start: 19 * 60 + 45, end: 21 * 60 + 5 } // 19:45 - 21:05
    ];

    if (time < schedule[0].start || time > schedule[7].end) {
        return `Пары в данное время не проводятся!`
    }

    for (i = 0; i < schedule.length;i++) {
        if (time >= schedule[i].start && time < schedule[i].end) {
            return i+1
        }
    }

    return `Сейчас перемена!`
}

class Para {
    today() {
        const now = new Date();
        const day = now.getDay();

        var startDate = new Date('2022-09-01');
        var timeDifference = now - startDate;
        var weeksPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

        let para_list = "Список пар на сегодня:\n"
        database.forEach(e => {            
            if (
                e.dayofweek == day && 
                e.para_info.name != `Null` &&
                e.toppara == weeksPassed%2==0 ? true : false 
            ) {
                para_list += `${e.countpara} - ${e.para_info.name} [${e.para_info.type}]\n`
                console.log(e.para_info.name)
            }
        })

        if (day > 5 || day < 1) {
            console.log('В этот день пары не проводятся')
        }
        else {
            console.log(para_list)
        }
    }

    tomorrow() {
        const now = new Date();
        const day = now.getDay() + 1;

        var startDate = new Date('2022-09-01');
        var timeDifference = now - startDate;
        var weeksPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

        let para_list = "Список пар на завтра:\n"
        database.forEach(e => {            
            if (e.dayofweek == day && e.para_info.name != `Null` && e.toppara == weeksPassed%2==0 ? true : false) {
                para_list += `${e.countpara} - ${e.para_info.name} [${e.para_info.type}]\n`
            }
        })

        if (day > 5 || day < 1) {
            console.log('В этот день пары не проводятся')
        }
        else {
            console.log(para_list)
        }
    }

    now() {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        var startDate = new Date('2022-09-01');
        var timeDifference = now - startDate;
        var weeksPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

        let result = timeInParaCounter(hours,minutes);

        if (typeof result === 'string') {
            console.log(result)
        }
        else if (typeof result === 'number') {
            let filter_para_counter = result;
            let outMessage = 0
            database.forEach(e => {
                if (
                    e.dayofweek == day && // день тижня
                    e.countpara == filter_para_counter &&  // номер пари
                    e.para_info.name != `Null` && // не пустая пара
                    e.toppara == weeksPassed%2==0 ? true : false // знаменник / числiвник
                ) {
                    let para_out = `Пара №${e.countpara} - ${e.para_info.name} [${e.para_info.type}]\nПреподаватель: ${e.para_info.teacher}\nСсылка: ${e.para_info.link}`

                    console.log(para_out)
                    outMessage+=1;
                }
            });

            if (outMessage == 0) {
                return console.log('Сейчас нет пары!')
            }
        }
        else {
            console.log(`Ошибка установления пары!`)
        }
    }
}

module.exports = Para;