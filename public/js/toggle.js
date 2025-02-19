function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("show");
  if (dropdown.classList.contains("show")) {
    dropdown.style.display = "block";
    setTimeout(() => {
      dropdown.style.opacity = 1;
      dropdown.style.transform = "translateY(0)";
    }, 10);
  } else {
    dropdown.style.opacity = 0;
    dropdown.style.transform = "translateY(-10px)";
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 300);
  }
}

window.onclick = function(event) {
  if (!event.target.matches('.menu-icon') && !event.target.matches('.nav-link')) {
    const dropdown = document.getElementById("dropdown");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
      dropdown.style.opacity = 0;
      dropdown.style.transform = "translateY(-10px)";
      setTimeout(() => {
        dropdown.style.display = "none";
      }, 300);
    }
  }
}