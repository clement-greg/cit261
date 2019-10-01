export function showSnackBar(message) {
    let snackbarElement = document.getElementById('snack-bar');

    snackbarElement.innerHTML = message;

    snackbarElement.style.display = 'block';

    snackbarElement.classList.add('expand-snackbar');

    setTimeout(() => {
        snackbarElement.classList.remove('expand-snackbar');
        snackbarElement.style.display = 'none';
    }, 5000);
}