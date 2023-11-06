/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import breakpoints from "assets/theme/base/breakpoints";
import typography from "assets/theme/base/typography";
import boxShadows from "assets/theme/base/boxShadows";
import borders from "assets/theme/base/borders";
import globals from "assets/theme/base/globals";

// Soft UI Dashboard React helper functions
import boxShadow from "assets/theme/functions/boxShadow";
import hexToRgb from "assets/theme/functions/hexToRgb";
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";
import rgba from "assets/theme/functions/rgba";

// Soft UI Dashboard React components base styles for @mui material components
import sidenav from "assets/theme/components/sidenav";
import list from "assets/theme/components/list";
import listItem from "assets/theme/components/list/listItem";
import listItemText from "assets/theme/components/list/listItemText";
import card from "assets/theme/components/card";
import cardMedia from "assets/theme/components/card/cardMedia";
import cardContent from "assets/theme/components/card/cardContent";
import button from "assets/theme/components/button";
import iconButton from "assets/theme/components/iconButton";
import inputBase from "assets/theme/components/form/inputBase";
import menu from "assets/theme/components/menu";
import menuItem from "assets/theme/components/menu/menuItem";
import switchButton from "assets/theme/components/form/switchButton";
import divider from "assets/theme/components/divider";
import tableContainer from "assets/theme/components/table/tableContainer";
import tableHead from "assets/theme/components/table/tableHead";
import tableCell from "assets/theme/components/table/tableCell";
import linearProgress from "assets/theme/components/linearProgress";
import breadcrumbs from "assets/theme/components/breadcrumbs";
import slider from "assets/theme/components/slider";
import avatar from "assets/theme/components/avatar";
import tooltip from "assets/theme/components/tooltip";
import appBar from "assets/theme/components/appBar";
import tabs from "assets/theme/components/tabs";
import tab from "assets/theme/components/tabs/tab";
import stepper from "assets/theme/components/stepper";
import step from "assets/theme/components/stepper/step";
import stepConnector from "assets/theme/components/stepper/stepConnector";
import stepLabel from "assets/theme/components/stepper/stepLabel";
import stepIcon from "assets/theme/components/stepper/stepIcon";
import select from "assets/theme/components/form/select";
import formControlLabel from "assets/theme/components/form/formControlLabel";
import formLabel from "assets/theme/components/form/formLabel";
import checkbox from "assets/theme/components/form/checkbox";
import radio from "assets/theme/components/form/radio";
import autocomplete from "assets/theme/components/form/autocomplete";
import input from "assets/theme/components/form/input";
import container from "assets/theme/components/container";
import popover from "assets/theme/components/popover";
import buttonBase from "assets/theme/components/buttonBase";
import icon from "assets/theme/components/icon";
import svgIcon from "assets/theme/components/svgIcon";
import link from "assets/theme/components/link";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav,direction: "rtl" },
    MuiList: { ...list ,direction: "rtl"},
    MuiListItem: { ...listItem,direction: "rtl" },
    MuiListItemText: { ...listItemText,direction: "rtl" },
    MuiCard: { ...card ,direction: "rtl"},
    MuiCardMedia: { ...cardMedia,direction: "rtl" },
    MuiCardContent: { ...cardContent,direction: "rtl" },
    MuiButton: { ...button,direction: "rtl" },
    MuiIconButton: { ...iconButton,direction: "rtl" },
    MuiInputBase: { ...inputBase,direction: "rtl" },
    MuiMenu: { ...menu,direction: "rtl" },
    MuiMenuItem: { ...menuItem,direction: "rtl"},
    MuiSwitch: { ...switchButton,direction: "rtl" },
    MuiDivider: { ...divider,direction: "rtl" },
    MuiTableContainer: { ...tableContainer,direction: "rtl" },
    MuiTableHead: { ...tableHead,direction: "rtl" },
    MuiTableCell: { ...tableCell,direction: "rtl" },
    MuiLinearProgress: { ...linearProgress,direction: "rtl" },
    MuiBreadcrumbs: { ...breadcrumbs,direction: "rtl" },
    MuiSlider: { ...slider,direction: "rtl" },
    MuiAvatar: { ...avatar ,direction: "rtl"},
    MuiTooltip: { ...tooltip,direction: "rtl" },
    MuiAppBar: { ...appBar,direction: "rtl" },
    MuiTabs: { ...tabs,direction: "rtl" },
    MuiTab: { ...tab,direction: "rtl" },
    MuiStepper: { ...stepper,direction: "rtl" },
    MuiStep: { ...step,direction: "rtl" },
    MuiStepConnector: { ...stepConnector,direction: "rtl" },
    MuiStepLabel: { ...stepLabel,direction: "rtl" },
    MuiStepIcon: { ...stepIcon,direction: "rtl" },
    MuiSelect: { ...select,direction: "rtl" },
    MuiFormControlLabel: { ...formControlLabel,direction: "rtl" },
    MuiFormLabel: { ...formLabel,direction: "rtl" },
    MuiCheckbox: { ...checkbox,direction: "rtl" },
    MuiRadio: { ...radio,direction: "rtl" },
    MuiAutocomplete: { ...autocomplete,direction: "rtl" },
    MuiInput: { ...input,direction: "rtl" },
    MuiOutlinedInput: { ...input,direction: "rtl" },
    MuiFilledInput: { ...input,direction: "rtl" },
    MuiPopover: { ...popover,direction: "rtl" },
    MuiButtonBase: { ...buttonBase,direction: "rtl" },
    MuiIcon: { ...icon,direction: "rtl" },
    MuiSvgIcon: { ...svgIcon,direction: "rtl" },
    MuiLink: { ...link,direction: "rtl" },
  },
});
