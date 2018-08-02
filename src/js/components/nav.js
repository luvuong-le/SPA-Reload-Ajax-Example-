const dropdown = document.getElementById('dropdown');
const dropdownContent = document.getElementById('myDropdown')

dropdown.addEventListener('click', (e) => {
    dropdownContent.classList.add('extend');
});

document.addEventListener('click', (e) => {
    if (e.target !== dropdownContent && e.target !== dropdown && e.target !== dropdownSub) {
        dropDownTextColor('transparent');
        dropdownContent.classList.remove('extend');
        dropdownSubContent.classList.remove('extend');
        setTimeout(() => {
            dropDownTextColor('#000');
        }, 500);
    }
});

const dropdownSub = document.getElementById('dropdown-sub');
const dropdownSubContent = document.getElementById('myDropdownSub')

dropdownSub.addEventListener('click', (e) => {
    dropdownSubContent.classList.add('extend');
});

function dropDownTextColor(color) {
    document.querySelectorAll('#myDropdown > a').forEach((text) => {
        text.style.color = color;
    });
}