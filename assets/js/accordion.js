var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    if (this.classList.value == "accordion active") {
      this.setAttribute('aria-expanded', 'true');
    } else {
      this.setAttribute('aria-expanded', 'false');
    }
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.setAttribute('aria-hidden', 'true');
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.setAttribute('aria-hidden', 'false');
    }
  });
}
if (document.getElementById("accordions_expand")) {
  document.getElementById("accordions_expand").addEventListener("click", function() {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      if (acc[i].classList.value.includes('active') != true) {
        acc[i].classList.add("active");
        acc[i].setAttribute('aria-expanded', 'true');
        var panel = acc[i].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.setAttribute('aria-hidden', 'true');
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.setAttribute('aria-hidden', 'false');
        }
      }
    }
  });
}
if (document.getElementById("accordions_collapse")) {
  document.getElementById("accordions_collapse").addEventListener("click", function() {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      if (acc[i].classList.value.includes('active')) {
        acc[i].classList.remove("active");
        acc[i].setAttribute('aria-expanded', 'false');
        var panel = acc[i].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.setAttribute('aria-hidden', 'true');
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.setAttribute('aria-hidden', 'false');
        }
      }
    }
  });
}