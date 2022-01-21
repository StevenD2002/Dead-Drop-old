import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const themeLight = {
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: palette.transparent,
  /**
   * The screen background.
   */
  background: palette.gradientPurple,
  gradientBg: [
    palette.gradientPink,
    palette.gradientRed,
    palette.gradientYellow,
    palette.gradientPurple,
  ],
  gradientBg2: [
    palette.gradientFuchsia,
    palette.gradientLightPurple,
    palette.gradientBlue,
    palette.gradientTeal,
  ],
  gradientGold: [
    palette.gradientGold,
    palette.gradientdarkGold,
    palette.gradientTanGold,
    // palette.gradientLightGold,
    palette.gradientGold,
    palette.gradientdarkGold,
    palette.gradientTanGold,
  ],
  settingsBg: palette.purple,
  glassBg: palette.glass,
  thickGlassBg: palette.thickGlass,
  /**
   * The main tinting color.
   */
  primary: palette.actionGreen500,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.white,
  /**
   * The default color of text in many components.
   */
  text: palette.white,
  /**
   * Secondary information.
   */
  dim: palette.gray700,
  /**
   * Error messages and icons.
   */
  error: palette.warningRed500,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,

  /** buttons **/
  buttonPrimaryText: palette.white,
  buttonPrimaryBg: palette.black,

  buttonSecondaryBg: palette.actionGreen300,
  buttonOutlineBorder: palette.black,
  buttonOutlineText: palette.black,

  buttonLinkText: palette.white,
  buttonTextText: palette.black,
  buttonDarkText: palette.black,
  /** inputs **/
  textFieldBorder: palette.gray500,
  textFieldPlaceholder: palette.gray500,
  inputText: palette.black,
  checkboxBg: palette.white,
  checkboxSelectedBg: palette.black,

  /** switch **/
  switchOffBg: palette.gray100,

  /**  envelope */
  envelopeBg: palette.glass,
  envelopeCompleteBg: palette.white,
  envelopeText: palette.white,
  envelopeCompleteText: palette.black,
  gameEnvelopeSelectedGoldieBg: palette.gradientTanGold,

  /**  game */
  gameEnvelopeSelectedBg: palette.white,
  gameEnvelopeSelectedText: palette.black,

  /**  pagination */
  paginationDot: palette.white,
  paginationDotActive: palette.black,

  /** success modal */
  celebrationModalText: palette.black,
}

export const themeDark = {
  ...themeLight,
  background: palette.black,
  text: palette.white,
}
