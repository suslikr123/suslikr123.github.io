document.addEventListener("DOMContentLoaded", function (event) {

    const tabs = document.querySelectorAll('.m_btn img'),
        tabs1 = document.querySelectorAll('.o_btn button'),
        tabsContent = document.querySelectorAll('.screens_main'),
        tabsParent = document.querySelector('.main_buttons'),
        tabsParent1 = document.querySelector('.other_buttons');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('active');
        });
        tabs1.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showTabContent(i = 4) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //tabs[i].classList.add('active');
        //tabs1[i - 3].classList.add('active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName == "IMG") {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    tabsParent1.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('other_btn')) {
            tabs1.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i + 3);
                }
            });
        }
    });

    let bottles = 0;
    let uan = 0;
    let usd = 0;

    let lvl = 0;
    let width = 0;

    let widthFood = 100;
    let widthHP = 100;


    let bott_money = document.querySelector('.bottles');
    let uann_money = document.querySelector('.uan'),
        usdd_money = document.querySelector('.usd');

    let lvl_elem = document.querySelector('#myBar');
    let elem = document.querySelector('#myBar1');
    let elem1 = document.querySelector('#myBar2');

    let lvlInfo = document.querySelector('.lvl_info'),
        property = document.querySelectorAll('.property .food_block button'),
        study = document.querySelectorAll('.study button'),
        accessories = document.querySelectorAll('.accessories .food_block button'),
        business = document.querySelectorAll('.business .food_block button');

    let error_money = document.querySelector('.error');

    /* -------- LS --------- */

    let save = document.querySelector('.save_btn .other_btn');
    save.addEventListener('click', () => {
        lvlNeeds = [];
        localStorage.clear();

        let currhp = parseFloat(elem1.style.width);
        let currfd = parseFloat(elem.style.width);
        /* lvl */
        const LsObject = {
            lvl: lvl,
            width: width
        }
        lvlNeeds.push(LsObject);
        /* needs */
        const LsObject1 = {
            widthFood: currfd,
            widthHP: currhp
        }
        lvlNeeds.push(LsObject1);
        /* недвижемость */
        property.forEach((item, i) => {
            if (item.classList.contains('active')) {
                const LsObject2 = {
                    classIndex: i
                }
                lvlNeeds.push(LsObject2);
            }
        })
        /* образование */
        study.forEach((item, i) => {
            if (item.classList.contains('active')) {
                const LsObject3 = {
                    studyIndex: i
                }
                lvlNeeds.push(LsObject3);
            }
        })
        /* аксессуары */
        accessories.forEach((item, i) => {
            if (item.classList.contains('active')) {
                const LsObject4 = {
                    accIndex: i
                }
                lvlNeeds.push(LsObject4);
            }
        })
        /* бизнесс */
        business.forEach((item, i) => {
            if (item.classList.contains('active')) {
                const LsObject5 = {
                    busIndex: i
                }
                lvlNeeds.push(LsObject5);
            }
        })

        const LsObject6 = {
            bottles: bottles,
            uan: uan,
            usd: usd
        }
        lvlNeeds.push(LsObject6);

        localStorage.setItem(lvlNeeds_LS, JSON.stringify(lvlNeeds));
    });

    const lvlNeeds_LS = 'lvlNeeds';
    let lvlNeeds = [];

    function LoadLvlNeeds() {
        const load_lvlnd = localStorage.getItem(lvlNeeds_LS);
        if (load_lvlnd !== null) {
            const parsedToDos = JSON.parse(load_lvlnd);
            parsedToDos.forEach((item) => {
                if (item.width) {
                    lvl = item.lvl;
                    width = item.width;
                } else if (item.widthFood) {
                    widthHP = item.widthHP;
                    widthFood = item.widthFood;
                }
                tempProp = item.classIndex;
                if (tempProp != undefined) {
                    property.forEach((item, i) => {
                        if (tempProp == i) {
                            item.classList.add('active');
                        }
                    })
                }
                tempSt = item.studyIndex;
                if (tempSt != undefined) {
                    study.forEach((item, i) => {
                        if (tempSt == i) {
                            item.classList.add('active');
                        }
                    })
                }
                tempAcc = item.accIndex;
                if (tempAcc != undefined) {
                    accessories.forEach((item, i) => {
                        if (tempAcc == i) {
                            item.classList.add('active');
                        }
                    })
                }
                tempBus = item.busIndex;
                if (tempBus != undefined) {
                    business.forEach((item, i) => {
                        if (tempBus == i) {
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    })
                }
                if (item.bottles) {
                    bottles = item.bottles;
                    uan = item.uan;
                    usd = item.usd;
                }
                bott_money.innerHTML = bottles;
                uan = Math.round(uan * 100) / 100;
                usd = Math.round(usd * 100) / 100;
                usdd_money.innerHTML = `&#36; ${usd}`;
                uann_money.innerHTML = `&#8372; ${uan}`;

                lvlInfo.innerHTML = `${lvl} уровень`;
                lvl_elem.style.width = width + '%';

                elem.style.width = widthFood + '%';
                elem1.style.width = widthHP + '%';
            });
        }
    }

    LoadLvlNeeds();
    /* --------------------- */

    /* УРОВЕНЬ И ПОТРЕБНОСТИ */
    let timer = setInterval(() => {
        let food_int = parseFloat(elem.style.width);
        let hp_int = parseFloat(elem1.style.width);
        if (food_int >= 5 && hp_int >= 5) {
            widthFood = food_int;
            widthHP = hp_int;
            elem.style.width = food_int + 0.5 + '%';
            elem1.style.width = hp_int + 0.5 + '%';

            if (food_int > 100) {
                elem.style.width = 100 + '%';
            }
            else if (hp_int > 100) {
                elem1.style.width = 100 + '%';
            }
            else if (food_int < 0) {
                elem.style.width = 1 + '%';
            }
            else if (hp_int < 0) {
                elem1.style.width = 1 + '%';
            }
        }
    }, 1000);

    function checkLvl() {
        let a = 0;
        if (lvl < 2) {
            a = 1;
        } else if (lvl >= 2 && lvl < 6) {
            a = 0.9;
        } else if (lvl >= 6 && lvl < 10) {
            a = 0.8;
        } else if (lvl >= 10 && lvl < 21) {
            a = 0.75;
        } else if (lvl >= 21 && lvl < 36) {
            a = 0.7;
        } else if (lvl >= 36 && lvl < 63) {
            a = 0.65;
        } else if (lvl >= 63 && lvl < 76) {
            a = 0.6;
        } else if (lvl >= 76) {
            a = 0.55;
        }

        let currWidth = a;

        width = width + currWidth;

        if (width >= 100) {
            lvl++;
            lvlInfo.innerHTML = `${lvl} уровень`;
            width = 0;
            lvl_elem.style.width = width + '%';
        }
        else {
            lvl_elem.style.width = width + '%';
        }
    };

    function checkNeed(a, b) {

        let currFood = a;
        let currHP = b;

        widthFood = widthFood - currFood;
        widthHP = widthHP - currHP;

        if (widthFood < -20 || widthHP < -20) {
            localStorage.clear();
            alert('К сожалению, вы умерли! Игра начнется заново.');
            location.reload();
        }
        else {
            elem.style.width = widthFood + '%';
            elem1.style.width = widthHP + '%';
        }
    }

    function addFood(a) {
        let currFood = a;
        widthFood = widthFood + currFood;
        elem.style.width = widthFood + '%';
        let currWidth = parseInt(elem.style.width);
        if (currWidth > 100) {
            widthFood = 100;
            elem.style.width = 100 + '%';
        }
    }

    function addHP(a) {
        let currHP = a;
        widthHP = widthHP + currHP;
        elem1.style.width = widthHP + '%';
        let currWidth = parseInt(elem1.style.width);
        if (currWidth > 100) {
            widthHP = 100;
            elem1.style.width = 100 + '%';
        }
    }

    /* БАНК */
    let convertToUan = document.querySelector('.bottles_uan button'),
        convertToUsd = document.querySelector('.uan_usd button'),
        convertFromUsd = document.querySelector('.usd_uan button');
    let uanMoney = document.querySelector('.uan_money'),
        usdMoney = document.querySelector('.usd_money'),
        fromUsd = document.querySelector('.from_usd');

    convertToUan.addEventListener('click', () => {
        let convUan = +uanMoney.value;
        if (convUan > bottles || convUan < 0) {
            error_money.textContent = "Возникла ошибка, попробуйте еще раз";
            setTimeout(() => error_money.textContent = "", 2000);
        } else {
            bottles = bottles - convUan;
            uan = uan + convUan;
            uann_money.innerHTML = `&#8372; ${uan}`;
            bott_money.innerHTML = bottles;
        }
        uanMoney.value = "";
    })

    convertToUsd.addEventListener('click', () => {
        let convUsd = +usdMoney.value;
        if (convUsd > uan || convUsd < 0) {
            error_money.textContent = "Возникла ошибка, попробуйте еще раз";
            setTimeout(() => error_money.textContent = "", 2000);
        } else {
            uan = uan - Math.round(convUsd * 100) / 100;
            let tempUsd = Math.round((convUsd * 0.035) * 100) / 100;
            usd = Math.round((usd + tempUsd) * 100) / 100;
            usdd_money.innerHTML = `&#36; ${usd}`;
            uann_money.innerHTML = `&#8372; ${uan}`;
        }
        usdMoney.value = "";
    })

    convertFromUsd.addEventListener('click', () => {
        let convFromUsd = +fromUsd.value;
        if (convFromUsd > usd || convFromUsd < 0) {
            error_money.textContent = "Возникла ошибка, попробуйте еще раз";
            setTimeout(() => error_money.textContent = "", 2000);
        } else {
            usd = Math.round((usd - convFromUsd) * 100) / 100;
            uan = uan + Math.round((convFromUsd * 28) * 100) / 100;
            uann_money.innerHTML = `&#8372; ${uan}`;
            usdd_money.innerHTML = `&#36; ${usd}`;
        }
        fromUsd.value = "";
    })

    /* ЕДА */

    let food = document.querySelectorAll('.second_screen .part button');
    food.forEach((item, i) => {
        if (i == 0) {
            item.addEventListener('click', () => {
                let btnCost = item.innerHTML;
                let x = 3;
                let af = Math.floor(Math.random() * x) + 1;
                addFood(af);
                checkNeed(0, 1);
            })
        }
        else if (i == 1) {
            item.addEventListener('click', () => {
                let btnCost = item.innerHTML;
                let x = 3;
                let af = Math.floor(Math.random() * x) + 1;
                addFood(af);
                checkNeed(0, 1);
            })
        }
        else if (i == 2) {
            item.addEventListener('click', () => {
                let btnCost = item.innerHTML;
                let x = 3;
                let af = Math.floor(Math.random() * x) + 1;
                addFood(af);
                checkNeed(0, 1);
            })
        }
        else if (i == 3) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(15);
                    checkNeed(0, 1);
                }
            })
        }
        else if (i == 4) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(25);
                    checkNeed(0, 2);
                }
            })
        }
        else if (i == 5) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(35);
                    checkNeed(0, 2);
                }
            })
        }
        else if (i == 6) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(40);
                    checkNeed(0, 3);
                }
            })
        }
        else if (i == 7) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(45);
                    checkNeed(0, 5);
                }
            })
        }
        else if (i == 8) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(55);
                    checkNeed(0, 5);
                }
            })
        }
        else if (i == 9) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(60);
                    checkNeed(0, 5);
                }
            })
        }
        else if (i == 10) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(70);
                    checkNeed(0, 5);
                }
            })
        }
        else if (i == 11) {
            item.addEventListener('click', () => {
                let btnCost = +item.innerHTML;
                if (uan >= btnCost) {
                    uan = uan - btnCost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addFood(100);
                    checkNeed(0, 8);
                }
            })
        }
    })

    /* ЛЕЧЕНИЕ */
    let hp = document.querySelectorAll('.health_screen .part button');
    hp.forEach((item, i) => {
        if (i == 0) {
            item.addEventListener('click', () => {
                let cost = +item.innerHTML;
                let x = 3;
                let af = Math.floor(Math.random() * x) + 1;
                addHP(af);
                checkNeed(1, 0);
            })
        }
        if (i == 1) {
            item.addEventListener('click', () => {
                let cost = +item.innerHTML;
                if (uan >= cost) {
                    uan = uan - cost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addHP(15);
                    checkNeed(1, 0);
                }
            })
        }
        if (i == 2) {
            item.addEventListener('click', () => {
                let cost = +item.innerHTML;
                if (uan >= cost) {
                    uan = uan - cost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addHP(25);
                    checkNeed(2, 0);
                }
            })
        }
        if (i == 3) {
            item.addEventListener('click', () => {
                let cost = +item.innerHTML;
                if (uan >= cost) {
                    uan = uan - cost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addHP(45);
                    checkNeed(3, 0);
                }
            })
        }
        if (i == 4) {
            item.addEventListener('click', () => {
                let cost = +item.innerHTML;
                if (uan >= cost) {
                    uan = uan - cost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addHP(65);
                    checkNeed(5, 0);
                }
            })
        }
        if (i == 5) {
            item.addEventListener('click', () => {
                let cost = +item.innerHTML;
                if (uan >= cost) {
                    uan = uan - cost;
                    uann_money.innerHTML = `&#8372; ${uan}`;
                    addHP(100);
                    checkNeed(8, 0);
                }
            })
        }
    })

    /* ОБРАЗОВАНИЕ */

    study.forEach((item, i) => {
        item.addEventListener('click', checkStudy, { once: true });
    });

    function checkStudy() {
        study.forEach((item, i) => {
            item.addEventListener('click', () => {
                if (i == 0) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 2000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 1) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 10000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 2) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 70000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 3) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 600000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 4) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 850000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 5) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 1500000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 6) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 3000000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 7) {
                    let cost = 5000000;
                    if (uan >= cost) {
                        uan = uan - cost;
                        uann_money.innerHTML = `&#8372; ${uan}`;
                        item.classList.add('active');
                    }
                }
            }, { once: true })
        })
    }


    /* РАБОТА */
    const job = document.querySelectorAll('.job .food_block button');
    job.forEach((btn, i) => {
        let er = document.querySelector('.error1');
        if (i == 0) {
            btn.addEventListener('click', () => {
                let x = 5;
                let bott = Math.floor(Math.random() * x) + 1;
                bottles = bottles + bott;
                bott_money.innerHTML = bottles;

                checkLvl();
                checkNeed(1, 1);
            });
        }
        if (i == 1) {
            btn.addEventListener('click', () => {
                if (lvl >= 2) {
                    let x = 5,
                        x1 = 3;
                    let bott = Math.floor(Math.random() * x) + 1;
                    let money = Math.floor(Math.random() * x1) + 1;
                    bottles = bottles + bott;
                    uan = uan + money;
                    bott_money.innerHTML = bottles;
                    uann_money.innerHTML = `&#8372; ${uan}`;

                    checkLvl();
                    checkNeed(1, 1);
                }
                /*else {
                    er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                    setTimeout(() => er.textContent = "", 2000);
                }*/
            });
        }
        if (i == 2) {
            btn.addEventListener('click', () => {
                if (lvl >= 5) {
                    let x = 7,
                        x1 = 5;
                    let bott = Math.floor(Math.random() * x) + 1;
                    let money = Math.floor(Math.random() * x1) + 1;
                    bottles = bottles + bott;
                    uan = uan + money;
                    bott_money.innerHTML = bottles;
                    uann_money.innerHTML = `&#8372; ${uan}`;

                    checkLvl();
                    checkNeed(1, 1);
                }
                /*else {
                    er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                    setTimeout(() => er.textContent = "", 2000);
                }*/
            });
        }
        if (i == 3) {
            btn.addEventListener('click', () => {
                if (lvl >= 6) {
                    let x1 = 10;
                    let money = Math.floor(Math.random() * x1) + 1;
                    uan = uan + money;
                    uann_money.innerHTML = `&#8372; ${uan}`;

                    checkLvl();
                    checkNeed(1, 1);
                }
                /*else {
                    er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                    setTimeout(() => er.textContent = "", 2000);
                }*/
            });
        }
        if (i == 4) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 0) {
                        if (item.classList.contains('active') && lvl >= 9) {
                            let x1 = 50;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(1, 1);
                        }
                    }
                    /*else {
                        er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                        setTimeout(() => er.textContent = "", 2000);
                    }*/
                })
            });
        }
        if (i == 5) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 1) {
                        if (item.classList.contains('active') && lvl >= 14) {
                            let x1 = 100;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(1, 1);
                        }
                    }
                    /*else {
                        er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                        setTimeout(() => er.textContent = "", 2000);
                    }*/
                })
            });
        }
        if (i == 6) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 1) {
                        if (item.classList.contains('active') && lvl >= 20) {
                            let x1 = 200;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(1, 1);
                        }
                    }
                    /*else {
                        er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                        setTimeout(() => er.textContent = "", 2000);
                    }*/
                })
            });
        }
        if (i == 7) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 2) {
                        if (item.classList.contains('active') && lvl >= 27) {
                            let x1 = 400;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(2, 2);
                        }
                        /*else {
                            er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                            setTimeout(() => er.textContent = "", 2000);
                        }*/
                    }
                })
            });
        }
        if (i == 8) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 3) {
                        if (item.classList.contains('active') && lvl >= 35) {
                            let x1 = 750;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(2, 2);
                        }
                        /*else {
                            er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                            setTimeout(() => er.textContent = "", 2000);
                        }*/
                    }
                })
            });
        }
        if (i == 9) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 4) {
                        if (item.classList.contains('active') && lvl >= 48) {
                            let x1 = 1400;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(2.5, 2.5);
                        }
                        /*else {
                            er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                            setTimeout(() => er.textContent = "", 2000);
                        }*/
                    }
                })
            });
        }
        if (i == 10) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 5) {
                        if (item.classList.contains('active') && lvl >= 62) {
                            let x1 = 3000;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(2.5, 2.5);
                        }
                        /*else {
                            er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                            setTimeout(() => er.textContent = "", 2000);
                        }*/
                    }
                })
            });
        }
        if (i == 11) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 5) {
                        if (item.classList.contains('active') && lvl >= 70) {
                            let x1 = 4500;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(3, 3);
                        }
                        /*else {
                            er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                            setTimeout(() => er.textContent = "", 2000);
                        }*/
                    }
                })
            });
        }
        if (i == 12) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 6) {
                        if (item.classList.contains('active') && lvl >= 75) {
                            let x1 = 6700;
                            uan = uan + x1;
                            uann_money.innerHTML = `&#8372; ${uan}`;

                            checkLvl();
                            checkNeed(3, 3);
                        }
                    }
                    /*else {
                        er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                        setTimeout(() => er.textContent = "", 2000);
                    }*/
                })
            });
        }
        if (i == 13) {
            btn.addEventListener('click', () => {
                let study = document.querySelectorAll('.study button');
                study.forEach((item, i) => {
                    if (i == 7) {
                        if (item.classList.contains('active') && lvl >= 80) {
                            let x1 = 2000,
                                x2 = 10000;
                            usd = usd + Math.floor(Math.random() * (x2 - x1)) + 1;;
                            usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;

                            checkLvl();
                            checkNeed(3, 3);
                        }
                    }
                    /*else {
                        er.textContent = "Возникла ошибка, прочитайте раздел 'Информация'";
                        setTimeout(() => er.textContent = "", 2000);
                    }*/
                })
            });
        }
    });

    /* БИЗНЕС */
    business.forEach((item, i) => {
        item.addEventListener('click', checkBuss, { once: true });
    })

    function checkBuss() {
        business.forEach((item, i) => {
            item.addEventListener('click', () => {
                if (i == 0) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 10000;
                        if (bottles >= cost) {
                            bottles = bottles - cost;
                            bott_money.innerHTML = bottles;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 1) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 50000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 2) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 500000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 3) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 1000000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 4) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 100000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 5) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 500000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 6) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 1000000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 7) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 3500000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 8) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 5000000; if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 9) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 15000000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 10) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 50000000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 11) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 100000000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 12) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 250000000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
                if (i == 13) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkStudy);
                    } else {
                        let cost = 1000000000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                            giveMoney(i);
                        }
                    }
                }
            }, { once: true });
        })
    }

    /* БИЗНЕС ИНТЕРВАЛ */
    function giveMoney(i) {
        if (i == 0) {
            let interval = setInterval(() => {
                bottles += 50;
                bott_money.innerHTML = bottles;
            }, 1000);
        }
        if (i == 1) {
            let interval = setInterval(() => {
                uan += 200;
                uann_money.innerHTML = `&#8372; ${uan}`;
            }, 1000);
        }
        if (i == 2) {
            let interval = setInterval(() => {
                uan += 1000;
                uann_money.innerHTML = `&#8372; ${uan}`;
            }, 1000);
        }
        if (i == 3) {
            let interval = setInterval(() => {
                uan += 3000;
                uann_money.innerHTML = `&#8372; ${uan}`;
            }, 1000);
        }
        if (i == 4) {
            let interval = setInterval(() => {
                usd += 400;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 5) {
            let interval = setInterval(() => {
                usd += 1000;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 6) {
            let interval = setInterval(() => {
                usd += 2500;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 7) {
            let interval = setInterval(() => {
                usd += 4000;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 8) {
            let interval = setInterval(() => {
                usd += 7500;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 9) {
            let interval = setInterval(() => {
                usd += 10000;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 10) {
            let interval = setInterval(() => {
                usd += 16000;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 11) {
            let interval = setInterval(() => {
                usd += 25000;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 12) {
            let interval = setInterval(() => {
                usd += 40000;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
        if (i == 13) {
            let interval = setInterval(() => {
                usd += 100000;
                usdd_money.innerHTML = `&#36; ${Math.round((usd) * 100) / 100}`;
            }, 1000);
        }
    }

    /* НЕДВИЖЕМОСТЬ */

    property.forEach((item) => {
        item.addEventListener('click', nedviz, { once: true });
    })

    function nedviz() {
        property.forEach((item, i) => {
            item.addEventListener('click', () => {
                if (i == 0) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 1000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 1) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 90000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 2) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 890000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 3) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 70000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 4) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 115000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 5) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 230000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 6) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 250000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 7) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 420000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 8) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 20000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 9) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 1500000;
                        if (uan >= cost) {
                            uan = uan - cost;
                            uann_money.innerHTML = `&#8372; ${uan}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 10) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 550000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 11) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 2500000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 12) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 1050000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 13) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 9500000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 14) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', nedviz);
                    } else {
                        let cost = 25000000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
            }, { once: true })
        })
    }

    /* АКСЕССУАРЫ */
    accessories.forEach((item) => {
        item.addEventListener('click', checkAcc, { once: true });
    });

    function checkAcc() {
        accessories.forEach((item, i) => {
            item.addEventListener('click', () => {
                if (i == 0) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkAcc);
                    } else {
                        let cost = 1000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 1) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkAcc);
                    } else {
                        let cost = 3000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
                if (i == 2) {
                    if (item.classList.contains('active')) {
                        removeEventListener('click', checkAcc);
                    } else {
                        let cost = 45000;
                        if (usd >= cost) {
                            usd = usd - cost;
                            usdd_money.innerHTML = `&#36; ${usd}`;
                            item.classList.add('active');
                        }
                    }
                }
            }, { once: true });
        })
    }

});