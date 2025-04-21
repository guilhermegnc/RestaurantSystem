//configuração do SweetAlert2
const swalPadrao = Swal.mixin({
  background: '#202425',
  color: '#b2b8b9',
  confirmButtonColor: '#0d6efd',
  cancelButtonColor: '#dc3545',
  didOpen: (popup) => {
    const icon = popup.querySelector('.swal2-icon');
    if (!icon) return;

    if (icon.classList.contains('swal2-error')) {
      icon.style.color = '#ff4d4f';
      icon.style.borderColor = '#ff4d4f';
    } else if (icon.classList.contains('swal2-success')) {
      icon.style.color = '#52c41a';
      icon.style.borderColor = '#52c41a';
    } else if (icon.classList.contains('swal2-warning')) {
      icon.style.color = '#faad14';
      icon.style.borderColor = '#faad14';
    }
  }
});