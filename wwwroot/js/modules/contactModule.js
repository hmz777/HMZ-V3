export function HighlightFormField(fieldIndex) {
    let formFields = document.querySelectorAll(".form-input");

    formFields.forEach(function (ele, index) {
        if (index == fieldIndex) {
            ele.classList.add("active");
        } else {
            ele.classList.remove("active");
        }
    });
}