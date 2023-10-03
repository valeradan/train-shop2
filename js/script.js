document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    };

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add('tabheader__item_active')
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })


    /// Timer

    const deadline = "2023-11-01";

    function getTimeRemain(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        // разница в миллисекундах
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeIntercal = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = getTimeRemain(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeIntercal);
            }
        }
    }
    setClock(".timer", deadline)


    /////// Modal

    let modalBtns = document.querySelectorAll("[data-modal]"),
        modalWindow = document.querySelector(".modal"),
        modalClose = document.querySelector(".modal__close")

    modalBtns.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    function openModal() {
        modalWindow.style.display = "block";
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId)
    }


    function closeModal() {
        modalWindow.style.display = "none";
        document.body.style.overflow = "";
        setModalTimer();
    };


    modalClose.addEventListener("click", closeModal);

    modalWindow.addEventListener("click", (e) => {
        if (e.target === modalWindow) {
            closeModal()
        };
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.style.display == "block") {
            closeModal()
        }
    });


    const modalTimerId = setTimeout(openModal, 5000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll)











});