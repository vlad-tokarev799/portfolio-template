const anchors = document.querySelectorAll('a.scroll-to')
let pageBlocks = []
let navHeight = document.querySelector('header').clientHeight

anchors.forEach((item, i) => {
    let itemHref = item.getAttribute('href')
    let block = document.querySelector(itemHref)

    pageBlocks.push(block)
})

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    )

    pageBlocks.forEach(item => {
        const top = getCoords(item).top - navHeight - 5
            bottom = getCoords(item).bottom

        if (scrollPos >= top && scrollPos <= bottom) {
            document.querySelectorAll('.top-nav__item').forEach(item => item.classList.remove('top-nav__item_active'))

            pageBlocks.forEach(item => item.classList.remove('active'))

            item.classList.add('active')
            let activeLink = document.querySelector(`a[href="#${item.getAttribute('id')}"]`)
            activeLink.closest('.top-nav__item').classList.add('top-nav__item_active')
        }
    })

    if (Math.round(scrollPos + document.documentElement.clientHeight) == scrollHeight) {

        pageBlocks.forEach(item => {
            const bottom = getCoords(item).bottom

            if (Math.round(bottom) >= scrollHeight) {
                document.querySelectorAll('.top-nav__item').forEach(item => item.classList.remove('top-nav__item_active'))

                pageBlocks.forEach(item => item.classList.remove('active'))

                item.classList.add('active')
                let activeLink = document.querySelector(`a[href="#${item.getAttribute('id')}"]`)

                activeLink.closest('.top-nav__item').classList.add('top-nav__item_active')
            }
        })
    }

    changeNavState(scrollPos)
})


for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href')

        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

document.querySelector('#menuIcon').onclick = function() {
    this.classList.toggle('active')
    document.querySelector('.top-nav__list').classList.toggle('active')

    document.querySelector('.overlay').classList.toggle('open')
}

document.querySelector('.overlay').onclick = function() {
    this.classList.remove('open', 'overlay_blur')
    document.querySelector('#menuIcon').classList.remove('active')
    document.querySelector('.top-nav__list').classList.remove('active')
    document.querySelectorAll('.form-popup').forEach(item => item.classList.remove('form-popup_open'))
    document.querySelector('body').classList.remove('off-scroll')
}

document.querySelectorAll('.form-popup').forEach(item => {
    const popupID = item.getAttribute('id')
    const linkToPopup = document.querySelector(`a[href="#${[popupID]}"]`)

    if (linkToPopup) {
        linkToPopup.onclick = function () {
            const hrefPopup = this.getAttribute('href')
            document.querySelector(hrefPopup).classList.add('form-popup_open')
            document.querySelector('#overlay').classList.add('open', 'overlay_blur')
            document.querySelector('body').classList.add('off-scroll')
            return false
        }
    }
})

function changeNavState(scrollPos) {
    if (scrollPos > 0) {
        document.querySelector('.header__bottom-line').classList.add('scrolled')
        document.querySelector('.top-nav').classList.add('scrolled')
    } else {
        document.querySelector('.header__bottom-line').classList.remove('scrolled')
        document.querySelector('.top-nav').classList.remove('scrolled')
    }
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}