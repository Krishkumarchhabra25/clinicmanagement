/**
 * The app uses HashRouter, so a plain `href="#about"` replaces the route
 * instead of scrolling. Landing page anchors scroll the section into view.
 */
const scrollToSection = (event, sectionId) => {
  event.preventDefault();
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default scrollToSection;
