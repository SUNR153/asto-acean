const accessibilityBtn = document.getElementById("accessibilityToggle");
const isAccessible = localStorage.getItem("accessibleMode") === "true";

if (isAccessible) {
  document.body.classList.add("accessible");
  if (accessibilityBtn)
    accessibilityBtn.textContent = "🔙 Обычная версия";
}

if (accessibilityBtn) {
  accessibilityBtn.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("accessible");
    localStorage.setItem("accessibleMode", enabled);
    accessibilityBtn.textContent = enabled
      ? "🔙 Обычная версия"
      : "👁 Версия для слабовидящих";
  });
}
