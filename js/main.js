window.onload = () => {
    const navigation = {
        init:function(){
            this.menu();
            this.fixed();
        },
        menu:function(){
            const btn = document.querySelector('.nav__button');
            const menu = document.querySelector('.nav__menu');
            
            btn.addEventListener('click', () => {
                menu.classList.toggle('active');
            })
        },
        fixed:function(){
            const logo = document.querySelector('.nav__logo img');
            const nav = document.querySelector('nav');

            window.addEventListener('scroll', () => {
                if (window.scrollY > nav.offsetHeight) {
                    nav.classList.add('active');
                    logo.src = './images/logo.png';
                }
                else {
                    nav.classList.remove('active');
                    logo.src = './images/logo-white.png';
                }
            })
            
        }
    }
    navigation.init();
    const gs = {
        init: function () {
            //Start Item
            const slider = {
                self: '.banner',
                wrap: '.banner__slider',
                items: '.slider__item',
                optionBtn: true,
                arrowBtn: false,
                auto: true,
                duration: 3000,
                reponsive: {
                    991: 1,
                    768: 1,
                    512: 1
                }
            }
            this.gs(slider.self, slider.wrap, slider.items, slider.optionBtn, slider.arrowBtn, slider.auto, slider.duration, slider.reponsive);
            //End Item

            const clients = {
                self: '.client',
                wrap: '.client__slider',
                items: '.slider__item',
                optionBtn: false,
                arrowBtn: true,
                auto: true,
                duration: 5000,
                reponsive: {
                    991: 1,
                    768: 1,
                    512: 1
                }
            }
            this.gs(clients.self, clients.wrap, clients.items, clients.optionBtn, clients.arrowBtn, clients.auto, clients.duration, clients.reponsive);

            const testimonials = {
                self: '.testimonials',
                wrap: '.testimonials__slider',
                items: '.slider__item',
                optionBtn: false,
                arrowBtn: false,
                auto: true,
                duration: 5000,
                reponsive: {
                    991: 4,
                    768: 3,
                    512: 2
                }
            }
            this.gs(testimonials.self, testimonials.wrap, testimonials.items, testimonials.optionBtn, testimonials.arrowBtn, testimonials.auto, testimonials.duration, testimonials.reponsive);

        },
        gs: function (Self, Slider, Item, optionBtn, arrowBtn, auto, duration, reponsive) {
            const self = document.querySelector(Self);
            const slider = document.querySelector(Slider);
            const items = slider.querySelectorAll(Item);
            

            //------------------------------------------------ REPONSIVE SLIDER -----------------------------------------//
            const rps = reponsive;
            let qty;
            let windowWidth = window.innerWidth;

            function checkWidth() {
                if (windowWidth <= Object.keys(rps)[0]) {
                    qty = Object.values(rps)[0];
                } else if (windowWidth <= Object.keys(rps)[1] && windowWidth > Object.keys(rps)[0]) {
                    qty = Object.values(rps)[1];
                } else if (windowWidth >= Object.keys(rps)[1]) {
                    qty = Object.values(rps)[2];
                }
            }
            checkWidth(windowWidth);

            window.addEventListener('resize', () => {
                windowWidth = window.innerWidth;
                checkWidth(windowWidth);

                items.forEach(item => {
                    item.style.maxWidth = 100 / qty + '%';
                    item.style.flex = '0 0' + ' ' + 100 / qty + '%';
                })
            })



            //------------------------------------------------ CUSTOM SLIDER -----------------------------------------//
            function customSlider() {
                // ------------------ SLIDER -------------------//

                //Style Cursor
                self.style.cssText = 'position: relative';
                slider.style.cssText = 'display: flex; align-items: center; overflow-y: hidden; cursor: grab;'

                slider.addEventListener('mousedown', () => {
                    slider.style.cursor = 'grabbing';
                })

                slider.addEventListener('mouseup', () => {
                    slider.style.cursor = 'grab';
                })

                // ------------------ ARROW BUTTON ------------------ //

                //Create Arrow Elements
                function createArrow(e) {
                    const item = document.createElement('div');
                    item.id = e;
                    item.className = 'gs-arrowBtn'
                    self.appendChild(item);
                }

                createArrow('left');
                createArrow('right');

                //Style Arrow Elements
                const arrows = document.querySelectorAll('.gs-arrowBtn');
                arrows.forEach(arrow => {
                    arrow.style.cssText = 'position: absolute; top: 50%; transform: translateY(-50%); width: 5rem; height: 5rem; text-align:center; line-height: 5rem; font-size: 3rem; background: rgba(255, 255,255, 0.3); cursor: pointer; z-index: 10;';
                    if (arrow.id === 'left') {
                        arrow.innerHTML = '<i class="fas fa-angle-left"></i>';
                        arrow.style.left = 0;
                    }
                    if (arrow.id === 'right') {
                        arrow.innerHTML = '<i class="fas fa-angle-right"></i>';
                        arrow.style.right = 0;
                    }
                    arrow.addEventListener('mousemove', () => {
                        arrow.style.background = '#fff';
                    })
                    arrow.addEventListener('mouseleave', () => {
                        arrow.style.background = 'rgba(255, 255,255, 0.3)';
                    })
                })
                if (!arrowBtn) {
                    arrows.forEach(btn => btn.style.display = 'none');
                }

                // ------------------ OPTIONS BUTTON -------------------//

                //Create Options Button Group
                const optionsBtnGroup = document.createElement('div');
                optionsBtnGroup.className = 'gs-options';

                //Style Options Button Groupt
                optionsBtnGroup.style.cssText = 'position: absolute; left: 50%; transform: translate(-50%, -50%); bottom: 0; z-index: 10;';

                self.appendChild(optionsBtnGroup);

                //Create Single Options Button
                function createOptions() {
                    const item = document.createElement('span');
                    document.querySelector('.gs-options').appendChild(item);
                }
                for (i = 0; i < items.length; i++) {
                    createOptions();
                }

                //Style Single Options Button
                const singleOptionBtn = document.querySelectorAll('.gs-options span');

                singleOptionBtn.forEach(btn => {
                    btn.style.cssText = 'width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 1px solid #fff; display: inline-block; margin: 0 .5rem; cursor: pointer; transition: 0.3s;'

                    btn.addEventListener('mousemove', () => {
                        btn.style.background = '#fff';
                    })
                    btn.addEventListener('mouseleave', () => {
                        btn.style.background = '';
                    })
                })
                if (!optionBtn) {
                    document.querySelector('.gs-options').style.display = 'none';
                }

                // // ------------------ ITEMS -------------------//

                items.forEach(item => {
                    item.style.padding = '0 1rem';
                    item.style.maxWidth = 100 / qty + '%';
                    item.style.flex = '0 0' + ' ' + 100 / qty + '%';
                })
            }
            customSlider();

            //------------------------------------------------ FUNCTION SLIDER -----------------------------------------//
            function functionSlider() {
                // Variables Slider
                let size = items[0].clientWidth;
                let arrowIndex = 0;
                let optionIndex = 0;

                // Delay Click
                function delayBtn(item) {
                    item.style.pointerEvents = 'none';

                    setTimeout(() => {
                        item.style.pointerEvents = 'unset';
                    }, 300)
                }

                // Update Slider
                function updateSlider(index) {
                    optionBtns.forEach(button => button.classList.remove('active'));
                    optionBtns[index].classList.add('active');

                    slider.style.scrollBehavior = `smooth`;
                    slider.scrollLeft = size * index;
                }

                // --------------- OPTION BUTTONS --------------- //
                const optionBtns = document.querySelectorAll('.gs-options span');

                optionBtns[0].classList.add('active');

                if (qty == 1) qty = 0;

                optionBtns.forEach((btn, index) => btn.addEventListener('click', () => {
                    optionIndex = index;
                    arrowIndex = index;
                    
                    if (optionIndex >= items.length - qty) optionIndex = 0;
                    if (optionIndex < 0) optionIndex = items.length - qty;

                    updateSlider(optionIndex);
                }))

                // --------------- ARROW BUTTONS --------------- //
                const arrowBtn = document.querySelectorAll('.gs-arrowBtn');
                arrowBtn.forEach(btn => btn.addEventListener('click', () => {
                    delayBtn(btn);

                    if (btn.id === 'left') {
                        arrowIndex--;
                        optionIndex--;
                    } else if (btn.id === 'right') {
                        arrowIndex++;
                        optionIndex++;
                    }

                    if (arrowIndex >= items.length - qty) arrowIndex = 0;
                    if (arrowIndex < 0) arrowIndex = items.length - qty;


                    updateSlider(arrowIndex);
                }))

                // --------------- GRABBING SLIDER --------------- //
                let isDown;

                function slideItem() {
                    index = Math.round(slider.scrollLeft / size);
                    slider.style.scrollBehavior = 'smooth';
                    slider.scrollLeft = size * index;

                    optionBtns.forEach(button => button.classList.remove('active'));
                    optionBtns[index].classList.add('active');
                }

                slider.addEventListener('mousedown', (e) => {
                    isDown = true;
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                    slider.style.scrollBehavior = 'unset';
                })

                slider.addEventListener('mouseleave', () => {
                    isDown = false;
                    slideItem();
                    // infiniteSlider();
                })

                slider.addEventListener('mouseup', () => {
                    isDown = false;
                    slideItem();
                    // infiniteSlider();
                })

                slider.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    const x = e.pageX - slider.offsetLeft;
                    const walk = x - startX;
                    slider.scrollLeft = scrollLeft - walk;
                })

                //------------------------------------------------ AUTO SLIDER -----------------------------------------//
                const drt = duration;
                if (auto) {
                    setInterval(autoSlider, drt);
                }
                function autoSlider() {
                    arrowIndex++;
                    optionIndex++;
                    if (optionIndex >= items.length - qty) optionIndex = 0;
                    if (optionIndex < 0) optionIndex = items.length - qty;

                    updateSlider(optionIndex);
                }
            }
            functionSlider();
        }
    }
    gs.init();

    const isotope = {
        init: function () {
            this.iso();
        },
        iso: function () {
            //Isotope
            let grid = document.querySelector('.grid');
            if (grid === null) return;

            var iso = new Isotope('.grid', {
                itemSelector: '.element-item',
                layoutMode: 'fitRows',
                transitionDuration: 500,
            });

            // filter functions
            var filterFns = {
                // show if number is greater than 50
                numberGreaterThan50: function (itemElem) {
                    var number = itemElem.querySelector('.number').textContent;
                    return parseInt(number, 10) > 50;
                },
                // show if name ends with -ium
                ium: function (itemElem) {
                    var name = itemElem.querySelector('.name').textContent;
                    return name.match(/ium$/);
                }
            };

            // bind filter button click
            var filtersElem = document.querySelector('.filters-button-group');
            filtersElem.addEventListener('click', function (event) {
                // only work with buttons
                if (!matchesSelector(event.target, 'button')) {
                    return;
                }
                var filterValue = event.target.getAttribute('data-filter');
                // use matching filter function
                filterValue = filterFns[filterValue] || filterValue;
                iso.arrange({
                    filter: filterValue
                });
            });

            // change is-checked class on buttons
            var buttonGroups = document.querySelectorAll('.button-group');
            for (var i = 0, len = buttonGroups.length; i < len; i++) {
                var buttonGroup = buttonGroups[i];
                radioButtonGroup(buttonGroup);
            }

            function radioButtonGroup(buttonGroup) {
                buttonGroup.addEventListener('click', function (event) {
                    // only work with buttons
                    if (!matchesSelector(event.target, 'button')) {
                        return;
                    }
                    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
                    event.target.classList.add('is-checked');
                });
            }
        }
    }
    isotope.init();

    const countUp = {
        init: function () {
            this.countUp('.count', '.countNumber');
        },
        countUp: function (selfItem, itemNumber) {
            const self = document.querySelectorAll(selfItem);

            self.forEach(i => {
                const items = i.querySelectorAll(itemNumber);
                
                let counter = 0;

                function countUp(item) {
                    item.innerHTML = counter;
                    counter++;
                    if (counter < item.dataset.count) {
                        setTimeout(function () {
                            countUp(item);
                        }, 10)
                    }
                }

                const options = {
                    threshold: 0.5,
                    rootMargin: "0px",
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) {
                            return;
                        } else {
                            countUp(entry.target);
                            observer.unobserve(entry.target);
                        }
                    })
                }, options);

                items.forEach(item => {
                    observer.observe(item);
                })
            })

        }
    }
    countUp.init();
}