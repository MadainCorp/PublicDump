if (!jQuery) alert('Please load JQuery first');

jQuery.fn.triggerValidationUI = function () {    
    if (!this || this.length == 0) return;
    var form = this[0];
    if (typeof (form) != "form" && typeof (form) != "object") return;

    var SUBMIT_VALUE = "triggerValidationUI";

    $submitButton = $(form).find('button[type=submit][value=' + SUBMIT_VALUE + ']');
    var submitButton;
    if ($submitButton.length == 0) {
        ///create one
        submitButton = document.createElement('button');
        submitButton.type = "submit";
        submitButton.value = SUBMIT_VALUE;
        submitButton.style.display = 'none';
        submitButton.onclick = function () { return false;};
        $(form).append(submitButton);
    }
    else
        submitButton = $submitButton[0];
    if (submitButton.click) submitButton.click();
    return form.checkValidity();
};