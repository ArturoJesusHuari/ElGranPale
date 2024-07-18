
(function () {
  const closeOnClick = false;

  ["DOMContentLoaded", "astro:after-swap"].forEach((event) => {
    document.addEventListener(event, addListeners);
  });

  // Function to clone and replace elements
  function cloneAndReplace(element) {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
  }

  function addListeners() {
    // Clean up existing listeners
    const oldMenuButton = document.getElementById("astronav-menu");
    if (oldMenuButton) {
      cloneAndReplace(oldMenuButton);
    }

    const oldDropdownMenus = document.querySelectorAll(".astronav-dropdown");
    oldDropdownMenus.forEach((menu) => {
      cloneAndReplace(menu);
    });

    // Mobile nav toggle
    const menuButton = document.getElementById("astronav-menu");
    menuButton && menuButton.addEventListener("click", toggleMobileNav);

    // Dropdown menus
    const dropdownMenus = document.querySelectorAll(".astronav-dropdown");
    dropdownMenus.forEach((menu) => {
      const button = menu.querySelector("button");
      button &&
        button.addEventListener("click", (event) =>
          toggleDropdownMenu(event, menu, dropdownMenus)
        );

      // Handle Submenu Dropdowns
      const dropDownSubmenus = menu.querySelectorAll(
        ".astronav-dropdown-submenu"
      );

      dropDownSubmenus.forEach((submenu) => {
        const submenuButton = submenu.querySelector("button");
        submenuButton &&
          submenuButton.addEventListener("click", (event) => {
            event.stopImmediatePropagation();
            toggleSubmenuDropdown(event, submenu);
          });
      });
    });

    // Clicking away from dropdown will remove the dropdown class
    document.addEventListener("click", closeAllDropdowns);

    if (closeOnClick) {
      handleCloseOnClick();
    }
  }

  function toggleMobileNav() {
    [...document.querySelectorAll(".astronav-toggle")].forEach((el) => {
      el.classList.toggle("hidden");
    });
  }

  function toggleDropdownMenu(event, menu, dropdownMenus) {
    toggleMenu(menu);

    // Close one dropdown when selecting another
    Array.from(dropdownMenus)
      .filter((el) => el !== menu && !menu.contains(el))
      .forEach(closeMenu);

    event.stopPropagation();
  }

  function toggleSubmenuDropdown(event, submenu) {
    event.stopPropagation();
    toggleMenu(submenu);

    // Close sibling submenus at the same nesting level
    const siblingSubmenus = submenu
      .closest(".astronav-dropdown")
      .querySelectorAll(".astronav-dropdown-submenu");
    Array.from(siblingSubmenus)
      .filter((el) => el !== submenu && !submenu.contains(el))
      .forEach(closeMenu);
  }

  function closeAllDropdowns(event) {
    const dropdownMenus = document.querySelectorAll(".dropdown-toggle");
    const dropdownParent = document.querySelectorAll(
      ".astronav-dropdown, .astronav-dropdown-submenu"
    );
    const isButtonInsideDropdown = [
      ...document.querySelectorAll(
        ".astronav-dropdown button, .astronav-dropdown-submenu button, #astronav-menu"
      ),
    ].some((button) => button.contains(event.target));
    if (!isButtonInsideDropdown) {
      dropdownMenus.forEach((d) => {
        // console.log("I ran", d);
        // if (!d.contains(event.target)) {
        d.classList.remove("open");
        d.removeAttribute("open");
        d.classList.add("hidden");
        // }
      });
      dropdownParent.forEach((d) => {
        d.classList.remove("open");
        d.removeAttribute("open");
        d.setAttribute("aria-expanded", "false");
      });
    }
  }

  function toggleMenu(menu) {
    menu.classList.toggle("open");
    const expanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", expanded ? "false" : "true");
    menu.hasAttribute("open")
      ? menu.removeAttribute("open")
      : menu.setAttribute("open", "");

    const dropdownToggle = menu.querySelector(".dropdown-toggle");
    const dropdownExpanded = dropdownToggle.getAttribute("aria-expanded");
    dropdownToggle.classList.toggle("hidden");
    dropdownToggle.setAttribute(
      "aria-expanded",
      dropdownExpanded === "true" ? "false" : "true"
    );
  }

  function closeMenu(menu) {
    // console.log("closing", menu);
    menu.classList.remove("open");
    menu.removeAttribute("open");
    menu.setAttribute("aria-expanded", "false");
    const dropdownToggles = menu.querySelectorAll(".dropdown-toggle");
    dropdownToggles.forEach((toggle) => {
      toggle.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  function handleCloseOnClick() {
    const navMenuItems = document.querySelector(".astronav-items");
    const navToggle = document.getElementById("astronav-menu");
    const navLink = navMenuItems && navMenuItems.querySelectorAll("a");

    const MenuIcons = navToggle.querySelectorAll(".astronav-toggle");

    navLink &&
      navLink.forEach((item) => {
        item.addEventListener("click", () => {
          navMenuItems?.classList.add("hidden");
          MenuIcons.forEach((el) => {
            el.classList.toggle("hidden");
          });
        });
      });
  }
})();
// Función para inicializar los carruseles
function initCarousel(carouselId, prevBtnClass, nextBtnClass) {
  const carouselItems = document.getElementById(carouselId);
  const prevButton = document.querySelector(prevBtnClass);
  const nextButton = document.querySelector(nextBtnClass);
  let currentIndex = 0;

  function updateCarousel() {
    const width = carouselItems.offsetWidth;
    carouselItems.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % 3;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + 3) % 3;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
}

// Inicializar los carruseles
initCarousel('carousel-items-1', '.prev-btn-1', '.next-btn-1');
initCarousel('carousel-items-2', '.prev-btn-2', '.next-btn-2');


document.addEventListener('DOMContentLoaded', () => {
  const descriptions = document.querySelectorAll('[id^="c_description"]');
  const toggleBtns = document.querySelectorAll('[id^="toggle-btn"]');
  
  // Iterar sobre cada bloque de texto y botón
  toggleBtns.forEach((btn, index) => {
    const description = descriptions[index];
    
    // Verificar si el contenido es desbordante
    if (description.scrollHeight > description.clientHeight) {
      btn.classList.remove('hidden');
    }
    
    let isExpanded = false;
    
    btn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      if (!isExpanded) {
        description.scrollIntoView({ behavior: 'smooth' });
      }
      description.classList.toggle('line-clamp-2');
      btn.textContent = isExpanded ? 'Ver menos' : 'Más';
    });
  });
});