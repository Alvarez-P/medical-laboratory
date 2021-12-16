const Constants = {
  tabsId: [
    {
      btn: 'why-choose-us-btn',
      tab: 'why-choose-us-tab',
    },
    {
      btn: 'location-btn',
      tab: 'location-tab',
    },
  ],
  tabActiveClassName: 'active-tab',
  tabInactiveClassName: 'inactive-tab',
  carouselId: '#carousel',
  slideClass: '.rslides',
  modalCloseBtn: 'close-modal',
  modalOpenBtn: 'request-callback',
  modal: 'modal',
  forms: {
    'header-form': {
      errorBoxId: 'header-form-error-box',
      inputsId: ['header-form-name', 'header-form-email'],
    },
    'modal-form': {
      errorBoxId: 'modal-form-error-box',
      inputsId: ['modal-form-name', 'modal-form-email'],
    },
    'contact-form': {
      errorBoxId: 'contact-form-error-box',
      inputsId: [
        'contact-form-first-name',
        'contact-form-last-name',
        'contact-form-email',
        'contact-form-textarea',
      ],
    },
  },
  formErrors: {
    messages: {
      required: 'is required',
      email: 'must be valid email',
    },
    validation: {
      emailRegex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    inputErrorClass: 'invalid-input'
  },
}

function toggleTabs(e) {
  Constants.tabsId.map((tabId) => {
    const element = document.getElementById(tabId.btn)
    if (tabId.btn === e.target.id)
      document.getElementById(tabId.tab).style.display = 'flex'
    else document.getElementById(tabId.tab).style.display = 'none'
    element.classList.toggle(Constants.tabActiveClassName)
    element.classList.toggle(Constants.tabInactiveClassName)
  })
}

function validate(formName) {
  // Setup
  const errorBox = document.getElementById(Constants.forms[formName].errorBoxId)
  let isError = false
  for (const elementId of Constants.forms[formName].inputsId) {
    const element = document.getElementById(elementId)
    // Restar error messages
    element.classList.remove(Constants.formErrors.inputErrorClass)
    errorBox.innerText = ''
    // Get attributes
    const elementName = element.getAttribute('name')
    const elementType = element.getAttribute('type')
    const isRequired = element.getAttributeNames().includes('required')
    // string validation
    if (isRequired && element.value === '') {
      const errorMessage = `${elementName} ${Constants.formErrors.messages.required}`
      errorBox.innerText = errorMessage
      isError = true
    }
    // email validation
    if (
      elementType === 'email' &&
      !String(element.value)
        .toLowerCase()
        .match(Constants.formErrors.validation.emailRegex)
    ) {
      const errorMessage = `${elementName} ${Constants.formErrors.messages.email}`
      errorBox.innerText = errorMessage
      isError = true
    }
    if (isError) {
      element.classList.add(Constants.formErrors.inputErrorClass)
      break
    }
  }
}

window.onload = function () {
  $(Constants.carouselId).tinycarousel()
  $(Constants.slideClass).responsiveSlides({
    auto: true,
    speed: 1000,
    timeout: 5000,
    nav: true,
  })
  document
    .getElementById(Constants.tabsId[0].btn)
    .addEventListener('click', toggleTabs)
  document
    .getElementById(Constants.tabsId[1].btn)
    .addEventListener('click', toggleTabs)
  const modal = document.getElementById(Constants.modal)
  const request_callback = document.getElementById(Constants.modalOpenBtn)
  const close_modal = document.getElementById(Constants.modalCloseBtn)

  request_callback.onclick = () => {
    modal.style.display = 'flex'
  }
  close_modal.onclick = () => {
    modal.style.display = 'none'
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }

  new WOW({
    boxClass: 'wow',
    animateClass: 'animate',
    offset: 100,
    mobile: true,
    live: true,
  }).init()
}
