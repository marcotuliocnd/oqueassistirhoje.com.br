if (window.localStorage) {
  if (!localStorage.getItem('cookies')) {
    document.querySelector('.cookies-modal').classList.remove('hidden')
  }
}

const onAccept = () => {
  localStorage.setItem('cookies', 'true');
  document.querySelector('.cookies-modal').classList.add('hidden')
}