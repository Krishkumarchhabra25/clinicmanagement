/**
 * The app uses HashRouter, so a plain `href="#about"` replaces the route
 * instead of scrolling. Landing page anchors scroll the section into view.
 * The scroll is deferred to the next frames so it is not cancelled by a
 * layout change in the same tick, such as the mobile menu collapsing.
 */
const scrollToSection = (sectionId) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

export default scrollToSection;
