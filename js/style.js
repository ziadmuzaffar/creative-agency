// Check If There's Local Storage Change Color
let primaryColor = localStorage.getItem('change-color')
if (primaryColor != null) {
  // Set Color On Root
  document.documentElement.style.setProperty('--primary', primaryColor)
  // Remove Active Class From All Colors List Item
  document.querySelectorAll('.settings .setting .change-colors li').forEach(element => {
    element.classList.remove('active')
    // Add Active Class On Element With Data Color Equal Local Storage Item
    if (element.dataset.color === primaryColor) {
      // Add Active Class
      element.classList.add('active')
    }
  });
}
// Switch Colors
const colors = document.querySelectorAll('.settings .setting .change-colors li')
// Loop On All List Items
colors.forEach(color => {
  // Click On Every List Items
  color.addEventListener('click', (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty('--primary', e.target.dataset.color)
    // Set Color On Local Storage
    localStorage.setItem('change-color', e.target.dataset.color)
    handleActiveClass(e)
  })
})

// Select Landing Page Element
let landing = document.querySelector('.landing')
// Get Array Of Images
let images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
// Switch Random Background
const randomBackgroundButtons = document.querySelectorAll('.settings .setting .random-background button')
// Random Background Control
let randomBackground = true
// Control The Interval 
let controlInterval;
// Check If There's Local Storage Random Background
let changeBackground = localStorage.getItem('change-background')
// Check If Random Background Local Storage Is Not Empty
if (changeBackground != null) {
  if (changeBackground === 'true') {
    randomBackground = true
  } else {
    randomBackground = false
  }
  // Remove Active Class From All Buttons
  document.querySelectorAll('.settings .setting .random-background button').forEach(element => {
    element.classList.remove('active')
  })
  if (changeBackground === 'true') {
    document.getElementById('yes-random-background').classList.add('active')
  } else {
    document.getElementById('no-random-background').classList.add('active')
  }
}
// Toggle Spin Class On Icon
document.querySelector('.settings .collapse').onclick = function () {
  // Toggle Class Fa Spin For Rotation On Self
  document.querySelector('.settings .collapse i').classList.toggle('fa-spin')
  // Toggle Class Mini Settings On Main Settings Container
  document.querySelector('.settings').classList.toggle('mini-settings')
}
// Function To Randomize Images
function randomizeImages() {
  if (randomBackground) {
    controlInterval = setInterval(() => {
      // Get Random Number
      let image = Math.floor(Math.random() * images.length)
      // Change Background Image Url
      landing.style.backgroundImage = `url('img/${images[image]}')`
    }, 10000);
  } else {
    clearInterval(controlInterval)
  }
}
// Trigger Randomize Images
randomizeImages()
// Loop On All List Items
randomBackgroundButtons.forEach(button => {
  // Click On Every List Items
  button.addEventListener('click', (e) => {
    handleActiveClass(e)
    if (e.target.dataset.randomBackground === 'yes') {
        randomBackground = true
        localStorage.setItem('change-background', 'true')
    } else {
        randomBackground = false
        localStorage.setItem('change-background', 'false')
    }
    // Trigger Randomize Images
    randomizeImages()
  })
})

// Select Skills Selector
let ourSkills = document.querySelector('.our-skills')
window.onscroll = function () {
  // Skills Offset Top
  let ourSkillsOffsetTop = ourSkills.offsetTop
  // Outer Height
  let ourSkillsOuterHeight = ourSkills.offsetHeight
  // Window Height
  let windowHeight = this.innerHeight
  // Window Scroll Top
  let windowScrollTop = this.pageYOffset
  if (windowScrollTop > (ourSkillsOffsetTop + ourSkillsOuterHeight - windowHeight - 3)) {
    document.querySelectorAll('.our-skills .skill .progress span').forEach(skill => {
      skill.style.width = skill.dataset.progress
    })
  }
}

// Create Popup With The Image
let ourGallery = document.querySelectorAll('.our-gallery img').forEach(img => {
  img.addEventListener('click', (e) => {
    // Create Overlay Element
    let overlay = document.createElement('div')
    // Add Class To Overlay
    overlay.className = ('popup-overlay')
    // Append Overlay To The Body
    document.body.appendChild(overlay)
    // Create The Popup Box
    let popupBox = document.createElement('div')
    // Add Class To The Popup Box
    popupBox.className = 'popup-box'

    if (img.alt !== null) {
      // Create Heading
      let heading = document.createElement('h3')
      // Create Text For Heading
      let text = document.createTextNode(img.alt)
      // Append The Text To The Heading
      heading.appendChild(text)
      // Append The Heading To The Popup Box
      popupBox.appendChild(heading)

    }
    // Create The Image
    let image = document.createElement('img')
    // Set Image Source
    image.src = img.src
    // Add Image To Popup Box
    popupBox.appendChild(image)
    // Append The Popup Box To Body
    document.body.appendChild(popupBox)
    // Create THe Close Span
    let close = document.createElement('span')
    // Create The Close Button Text
    let closeButtonText = document.createTextNode('x')
    // Append Text To Close Button
    close.appendChild(closeButtonText)
    // Add Class To Close Button
    close.className = 'close-popup'
    // Add Close Button To The Popup Box
    popupBox.appendChild(close)
    // Close Popup
    document.addEventListener('click', (e) => {
      if (e.target.className == 'close-popup') {
        // Remove The Current Popup
        e.target.parentNode.remove()
        // Remove Overlay
        document.querySelector('.popup-overlay').remove()
      }
    })
  })
})

function scrollView(select) {
  document.querySelectorAll(select).forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })
}

scrollView('.navbar .nav li a')
scrollView('.nav-bullets div')

// Handle Active State
function handleActiveClass(event) {
  // Remove Active Class From All Childrens
  event.target.parentElement.querySelectorAll('.active').forEach(element => {
    element.classList.remove('active')
  });
  // Add Active Class On Self
  event.target.classList.add('active')
}

if (localStorage.getItem('show-bullets') !== null) {
  document.querySelectorAll('.settings .show-bullets button').forEach(button => {
    button.classList.remove('active')
    if (localStorage.getItem('show-bullets') === 'block') {
      document.querySelector('.nav-bullets').style.display = 'block'
      document.getElementById('yes-show-bullets').classList.add('active')
    } else {
      document.querySelector('.nav-bullets').style.display = 'none'
      document.getElementById('no-show-bullets').classList.add('active')
    }
  })
}
document.querySelectorAll('.settings .show-bullets button').forEach(button => {
  button.addEventListener('click', (e) => {
    handleActiveClass(e)
    if (button.dataset.showBullets == 'yes') {
      document.querySelector('.nav-bullets').style.display = 'block'
      localStorage.setItem('show-bullets', 'block')
    } else {
      document.querySelector('.nav-bullets').style.display = 'none'
      localStorage.setItem('show-bullets', 'none')
    }
  })
})

document.querySelector('.settings .reset-settings button').onclick = function () {
  // localStorage.removeItem('show-bullets')
  localStorage.clear()
  window.location.reload()
}

// Toggle Menu
let collapse = document.querySelector('.navbar .fa-bars')
collapse.onclick = (e) => {
  // Stop Propagation
  e.stopPropagation()
  // Toggle Class "Open Memu" On Links
  document.querySelector('.navbar .menus').classList.toggle('open-memu')
}
// Click Anywhere Outside Menu And Collapse Button
document.addEventListener('click', (e) => {
  if (e.target !== collapse && e.target !== document.querySelector('.navbar .menus')) {
    // Check If Open Memu
    if (document.querySelector('.navbar .menus').classList.contains('open-memu')) {
      // Toggle Class "Open Memu" On Links
      document.querySelector('.navbar .menus').classList.toggle('open-memu')
    }
  }
})
// Stop Propagation On Menu
document.querySelector('.navbar .menus').onclick = (e) => {
  e.stopPropagation()
}
document.querySelectorAll('.navbar .menus ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (document.querySelector('.navbar .menus').classList.contains('open-memu')) {
      // Toggle Class "Open Memu" On Links
      document.querySelector('.navbar .menus').classList.toggle('open-memu')
    }
  })
})