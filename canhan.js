document.addEventListener("DOMContentLoaded", () => {
  // Hiệu ứng cuộn mượt mà khi nhấp vào liên kết điều hướng
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Hiệu ứng fade-in khi các phần xuất hiện trên màn hình
  const sections = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã xuất hiện
        }
      });
    },
    {
      threshold: 0.2, // Kích hoạt khi 20% của phần tử xuất hiện
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Ví dụ về một chức năng JavaScript khác (có thể thêm sau này)
  // Bạn có thể thêm các chức năng như:
  // - Hiển thị/ẩn menu di động
  // - Validate form liên hệ (nếu có)
  // - Carousel ảnh cho phần dự án
});

document.getElementById("langSelect").addEventListener("change", function () {
  const lang = this.value;
  document.querySelectorAll("[data-en]").forEach((el) => {
    // Preserve <br /> for the about section paragraph
    if (
      el.tagName === "P" &&
      el.parentElement &&
      el.parentElement.classList.contains("about-content")
    ) {
      let text = el.getAttribute(`data-${lang}`);
      if (lang === "en") {
        text = text.replace(/\. /g, ".<br /><br />").replace(/\n/g, " ");
      } else {
        // Insert <br /><br /> after periods for Vietnamese too
        text = text.replace(/\. /g, ".<br /><br />").replace(/\n/g, " ");
      }
      el.innerHTML = text;
    } else {
      el.textContent = el.getAttribute(`data-${lang}`);
    }
  });
});

