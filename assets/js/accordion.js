var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
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
        var panel = acc[i].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
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
        var panel = acc[i].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    }
  });
}