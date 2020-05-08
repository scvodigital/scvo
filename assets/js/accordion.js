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
      setTimeout(function() { addClass(panel, 'hidden'); }, 333);
      panel.style.maxHeight = null;
    } else {
      removeClass(panel, 'hidden');
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
        acc[i].setAttribute('aria-expanded', 'true');
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

function hasClass(ele,cls) {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}
